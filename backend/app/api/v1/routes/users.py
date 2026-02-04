"""
User Routes
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.user_service import UserService
from app.schemas.user_schema import UserSchema

user_service = UserService()


@api_v1_bp.route('/users/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        user_id = get_jwt_identity()
        user = user_service.get_user_by_id(user_id)
        return jsonify(UserSchema().dump(user)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@api_v1_bp.route('/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update current user profile"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        user = user_service.update_user(user_id, data)
        return jsonify(UserSchema().dump(user)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    """Get user by ID"""
    try:
        user = user_service.get_user_by_id(user_id)
        return jsonify(UserSchema().dump(user)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
