"""
Authentication Routes
"""
from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.auth_service import AuthService
from app.schemas.user_schema import UserSchema, LoginSchema

auth_service = AuthService()


@api_v1_bp.route('/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        user = auth_service.register_user(data)
        return jsonify({
            'message': 'User registered successfully',
            'user': UserSchema().dump(user)
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        result = auth_service.login_user(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401


@api_v1_bp.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify({'access_token': access_token}), 200


@api_v1_bp.route('/auth/forgot-password', methods=['POST'])
def forgot_password():
    """Send password reset email"""
    try:
        data = request.get_json()
        auth_service.forgot_password(data.get('email'))
        return jsonify({'message': 'Password reset email sent'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/auth/reset-password', methods=['POST'])
def reset_password():
    """Reset password with token"""
    try:
        data = request.get_json()
        auth_service.reset_password(data)
        return jsonify({'message': 'Password reset successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
