"""
Notifications Routes
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.notification_service import NotificationService

notification_service = NotificationService()


@api_v1_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    """Get user notifications"""
    try:
        user_id = get_jwt_identity()
        notifications = notification_service.get_notifications(user_id)
        return jsonify(notifications), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/notifications/<int:notification_id>/read', methods=['POST'])
@jwt_required()
def mark_notification_read(notification_id):
    """Mark notification as read"""
    try:
        user_id = get_jwt_identity()
        notification = notification_service.mark_as_read(user_id, notification_id)
        return jsonify(notification), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/notifications/read-all', methods=['POST'])
@jwt_required()
def mark_all_notifications_read():
    """Mark all notifications as read"""
    try:
        user_id = get_jwt_identity()
        notification_service.mark_all_as_read(user_id)
        return jsonify({'message': 'All notifications marked as read'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/notifications/<int:notification_id>', methods=['DELETE'])
@jwt_required()
def delete_notification(notification_id):
    """Delete notification"""
    try:
        user_id = get_jwt_identity()
        notification_service.delete_notification(user_id, notification_id)
        return jsonify({'message': 'Notification deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
