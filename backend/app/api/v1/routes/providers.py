"""
Providers Routes
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.provider_service import ProviderService

provider_service = ProviderService()


@api_v1_bp.route('/providers', methods=['GET'])
def get_providers():
    """Get all providers"""
    try:
        filters = request.args.to_dict()
        providers = provider_service.get_providers(filters)
        return jsonify(providers), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/providers/<int:provider_id>', methods=['GET'])
def get_provider(provider_id):
    """Get provider details"""
    try:
        provider = provider_service.get_provider_by_id(provider_id)
        return jsonify(provider), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@api_v1_bp.route('/providers/dashboard', methods=['GET'])
@jwt_required()
def get_provider_dashboard():
    """Get provider dashboard statistics"""
    try:
        user_id = get_jwt_identity()
        stats = provider_service.get_dashboard_stats(user_id)
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/providers/availability', methods=['GET'])
@jwt_required()
def get_availability():
    """Get provider availability"""
    try:
        user_id = get_jwt_identity()
        availability = provider_service.get_availability(user_id)
        return jsonify(availability), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/providers/availability', methods=['POST'])
@jwt_required()
def set_availability():
    """Set provider availability"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        availability = provider_service.set_availability(user_id, data)
        return jsonify(availability), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/providers/services', methods=['GET'])
@jwt_required()
def get_provider_services():
    """Get provider services"""
    try:
        user_id = get_jwt_identity()
        services = provider_service.get_provider_services(user_id)
        return jsonify(services), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/providers/services', methods=['POST'])
@jwt_required()
def add_provider_service():
    """Add service to provider"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        service = provider_service.add_service(user_id, data)
        return jsonify(service), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/providers/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def remove_provider_service(service_id):
    """Remove service from provider"""
    try:
        user_id = get_jwt_identity()
        provider_service.remove_service(user_id, service_id)
        return jsonify({'message': 'Service removed successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
