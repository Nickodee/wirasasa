"""
User Service
"""
from app import db
from app.models.user import User


class UserService:
    """Handle user-related business logic"""
    
    def get_user_by_id(self, user_id):
        """Get user by ID"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError('User not found')
        return user
    
    def update_user(self, user_id, data):
        """Update user profile"""
        user = self.get_user_by_id(user_id)
        
        # Update allowed fields
        allowed_fields = ['first_name', 'last_name', 'phone', 'profile_picture']
        for field in allowed_fields:
            if field in data:
                setattr(user, field, data[field])
        
        db.session.commit()
        return user
    
    def delete_user(self, user_id):
        """Delete user account"""
        user = self.get_user_by_id(user_id)
        user.is_active = False
        db.session.commit()
