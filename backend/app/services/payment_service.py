"""
Payment Service
"""
from app import db
from app.models.payment import PaymentMethod, Payment


class PaymentService:
    """Handle payment-related business logic"""
    
    def get_payment_methods(self, user_id):
        """Get user's payment methods"""
        methods = PaymentMethod.query.filter_by(user_id=user_id, is_active=True).all()
        return [self._serialize_payment_method(m) for m in methods]
    
    def add_payment_method(self, user_id, data):
        """Add new payment method"""
        # TODO: Integrate with payment provider
        method = PaymentMethod(
            user_id=user_id,
            type=data['type'],
            card_last_four=data.get('card_last_four'),
            card_brand=data.get('card_brand'),
            phone_number=data.get('phone_number'),
            is_default=data.get('is_default', False)
        )
        
        db.session.add(method)
        db.session.commit()
        
        return self._serialize_payment_method(method)
    
    def delete_payment_method(self, user_id, method_id):
        """Delete payment method"""
        method = PaymentMethod.query.filter_by(id=method_id, user_id=user_id).first()
        if not method:
            raise ValueError('Payment method not found')
        
        method.is_active = False
        db.session.commit()
    
    def process_payment(self, user_id, data):
        """Process a payment"""
        # TODO: Integrate with payment provider (Stripe, M-Pesa, etc.)
        return {}
    
    def get_payment_history(self, user_id):
        """Get payment history"""
        payments = Payment.query.filter_by(payer_id=user_id).all()
        return [self._serialize_payment(p) for p in payments]
    
    def _serialize_payment_method(self, method):
        """Serialize payment method object"""
        return {
            'id': method.id,
            'type': method.type,
            'card_last_four': method.card_last_four,
            'card_brand': method.card_brand,
            'phone_number': method.phone_number,
            'is_default': method.is_default
        }
    
    def _serialize_payment(self, payment):
        """Serialize payment object"""
        return {
            'id': payment.id,
            'job_id': payment.job_id,
            'amount': payment.amount,
            'currency': payment.currency,
            'status': payment.status,
            'created_at': payment.created_at.isoformat()
        }
