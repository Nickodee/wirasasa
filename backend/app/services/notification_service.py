"""
Notification Service
"""
from app import db
from app.models.notification import Notification
from datetime import datetime


class NotificationService:
    """Handle notification-related business logic"""
    
    def get_notifications(self, user_id):
        """Get user notifications"""
        notifications = Notification.query.filter_by(user_id=user_id).order_by(
            Notification.created_at.desc()
        ).all()
        
        return [self._serialize_notification(n) for n in notifications]
    
    def create_notification(self, user_id, data):
        """Create a new notification"""
        notification = Notification(
            user_id=user_id,
            type=data['type'],
            title=data['title'],
            message=data.get('message'),
            data=data.get('data')
        )
        
        db.session.add(notification)
        db.session.commit()
        
        return self._serialize_notification(notification)
    
    def mark_as_read(self, user_id, notification_id):
        """Mark notification as read"""
        notification = Notification.query.filter_by(
            id=notification_id, 
            user_id=user_id
        ).first()
        
        if not notification:
            raise ValueError('Notification not found')
        
        notification.is_read = True
        notification.read_at = datetime.utcnow()
        db.session.commit()
        
        return self._serialize_notification(notification)
    
    def mark_all_as_read(self, user_id):
        """Mark all notifications as read"""
        Notification.query.filter_by(user_id=user_id, is_read=False).update({
            'is_read': True,
            'read_at': datetime.utcnow()
        })
        db.session.commit()
    
    def delete_notification(self, user_id, notification_id):
        """Delete notification"""
        notification = Notification.query.filter_by(
            id=notification_id, 
            user_id=user_id
        ).first()
        
        if not notification:
            raise ValueError('Notification not found')
        
        db.session.delete(notification)
        db.session.commit()
    
    def _serialize_notification(self, notification):
        """Serialize notification object"""
        return {
            'id': notification.id,
            'type': notification.type,
            'title': notification.title,
            'message': notification.message,
            'data': notification.data,
            'is_read': notification.is_read,
            'created_at': notification.created_at.isoformat(),
            'read_at': notification.read_at.isoformat() if notification.read_at else None
        }
