"""
Payments Routes - M-Pesa, Card, and Cash payment processing
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.payment_service import PaymentService
from app.services.invoice_service import InvoiceService

payment_service = PaymentService()
invoice_service = InvoiceService()


@api_v1_bp.route('/payments/methods', methods=['GET'])
@jwt_required()
def get_payment_methods():
    """Get user's payment methods"""
    try:
        user_id = get_jwt_identity()
        methods = payment_service.get_payment_methods(user_id)
        return jsonify(methods), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/payments/methods', methods=['POST'])
@jwt_required()
def add_payment_method():
    """Add new payment method"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        method = payment_service.add_payment_method(user_id, data)
        return jsonify(method), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/payments/methods/<int:method_id>', methods=['DELETE'])
@jwt_required()
def delete_payment_method(method_id):
    """Delete payment method"""
    try:
        user_id = get_jwt_identity()
        payment_service.delete_payment_method(user_id, method_id)
        return jsonify({'message': 'Payment method deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# M-Pesa Payment Routes
@api_v1_bp.route('/payments/mpesa/initiate', methods=['POST'])
@jwt_required()
def initiate_mpesa_payment():
    """Initiate M-Pesa STK Push payment"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        phone_number = data.get('phoneNumber')
        amount = data.get('amount')
        job_id = data.get('jobId')
        description = data.get('description', 'WiraSasa Service Payment')
        
        if not all([phone_number, amount, job_id]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = payment_service.initiate_mpesa_payment(
            phone_number=phone_number,
            amount=amount,
            job_id=job_id,
            user_id=user_id,
            description=description
        )
        
        if result.get('success'):
            return jsonify({
                'transactionId': result['transaction_id'],
                'message': 'Payment initiated. Please enter M-Pesa PIN on your phone.'
            }), 200
        else:
            return jsonify({'error': result.get('error', 'Payment failed')}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/payments/mpesa/status/<transaction_id>', methods=['GET'])
@jwt_required()
def check_mpesa_status(transaction_id):
    """Check M-Pesa payment status"""
    try:
        status = payment_service.check_mpesa_payment_status(transaction_id)
        return jsonify(status), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/payments/mpesa/callback', methods=['POST'])
def mpesa_callback():
    """M-Pesa callback endpoint"""
    try:
        data = request.get_json()
        result = payment_service.handle_mpesa_callback(data)
        return jsonify({'ResultCode': 0, 'ResultDesc': 'Success'}), 200
    except Exception as e:
        return jsonify({'ResultCode': 1, 'ResultDesc': str(e)}), 500


# Card Payment Routes
@api_v1_bp.route('/payments/card/charge', methods=['POST'])
@jwt_required()
def charge_card():
    """Process card payment"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        amount = data.get('amount')
        job_id = data.get('jobId')
        card_token = data.get('cardToken')
        
        if not all([amount, job_id, card_token]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = payment_service.process_card_payment(
            amount=amount,
            job_id=job_id,
            user_id=user_id,
            card_token=card_token
        )
        
        if result.get('success'):
            return jsonify({
                'transactionId': result['transaction_id'],
                'message': 'Payment successful'
            }), 200
        else:
            return jsonify({'error': result.get('error', 'Payment failed')}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Cash Payment Routes
@api_v1_bp.route('/payments/cash/confirm', methods=['POST'])
@jwt_required()
def confirm_cash_payment():
    """Confirm cash payment"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        job_id = data.get('jobId')
        amount = data.get('amount')
        
        if not all([job_id, amount]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = payment_service.confirm_cash_payment(
            job_id=job_id,
            amount=amount,
            user_id=user_id
        )
        
        if result.get('success'):
            return jsonify({'message': 'Cash payment confirmed'}), 200
        else:
            return jsonify({'error': result.get('error', 'Confirmation failed')}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Invoice Routes  
@api_v1_bp.route('/payments/invoice/generate', methods=['POST'])
@jwt_required()
def generate_invoice():
    """Generate invoice for a job"""
    try:
        data = request.get_json()
        job_id = data.get('jobId')
        
        if not job_id:
            return jsonify({'error': 'Job ID is required'}), 400
        
        invoice = invoice_service.generate_invoice(job_id)
        
        if invoice:
            return jsonify({'invoice': invoice}), 200
        else:
            return jsonify({'error': 'Failed to generate invoice'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/payments/invoice/<invoice_id>', methods=['GET'])
@jwt_required()
def get_invoice(invoice_id):
    """Get invoice by ID"""
    try:
        invoice = invoice_service.get_invoice(invoice_id)
        
        if invoice:
            return jsonify({'invoice': invoice}), 200
        else:
            return jsonify({'error': 'Invoice not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Refund Routes
@api_v1_bp.route('/payments/refund', methods=['POST'])
@jwt_required()
def request_refund():
    """Request a refund"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        job_id = data.get('jobId')
        reason = data.get('reason')
        
        if not all([job_id, reason]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = payment_service.request_refund(
            job_id=job_id,
            user_id=user_id,
            reason=reason
        )
        
        if result.get('success'):
            return jsonify({'message': 'Refund request submitted'}), 200
        else:
            return jsonify({'error': result.get('error', 'Refund failed')}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/payments/process', methods=['POST'])
@jwt_required()
def process_payment():
    """Process a payment"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        payment = payment_service.process_payment(user_id, data)
        return jsonify(payment), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/payments/history', methods=['GET'])
@jwt_required()
def get_payment_history():
    """Get payment history"""
    try:
        user_id = get_jwt_identity()
        history = payment_service.get_payment_history(user_id)
        return jsonify(history), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
