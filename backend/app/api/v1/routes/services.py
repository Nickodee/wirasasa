"""
Services Routes
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.service_service import ServiceService

service_service = ServiceService()


@api_v1_bp.route('/services', methods=['GET'])
def get_services():
    """Get all available services"""
    try:
        services = service_service.get_all_services()
        return jsonify(services), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    """Get service by ID"""
    try:
        service = service_service.get_service_by_id(service_id)
        return jsonify(service), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@api_v1_bp.route('/services/categories', methods=['GET'])
def get_service_categories():
    """Get all service categories"""
    try:
        categories = service_service.get_categories()
        return jsonify(categories), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
