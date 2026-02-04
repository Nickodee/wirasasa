"""
Chat Routes
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.chat_service import ChatService

chat_service = ChatService()


@api_v1_bp.route('/chat/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    """Get user's chat conversations"""
    try:
        user_id = get_jwt_identity()
        conversations = chat_service.get_conversations(user_id)
        return jsonify(conversations), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/chat/conversations/<int:conversation_id>', methods=['GET'])
@jwt_required()
def get_conversation(conversation_id):
    """Get conversation details"""
    try:
        user_id = get_jwt_identity()
        conversation = chat_service.get_conversation(user_id, conversation_id)
        return jsonify(conversation), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@api_v1_bp.route('/chat/conversations/<int:conversation_id>/messages', methods=['GET'])
@jwt_required()
def get_messages(conversation_id):
    """Get messages in a conversation"""
    try:
        user_id = get_jwt_identity()
        messages = chat_service.get_messages(user_id, conversation_id)
        return jsonify(messages), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/chat/conversations/<int:conversation_id>/messages', methods=['POST'])
@jwt_required()
def send_message(conversation_id):
    """Send a message"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        message = chat_service.send_message(user_id, conversation_id, data)
        return jsonify(message), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
