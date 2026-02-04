"""
Authentication Service
"""
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token


class AuthService:
    """Handle authentication logic"""
    
    def register_user(self, data):
        """Register a new user"""
        # Check if user exists
        if User.query.filter_by(email=data['email']).first():
            raise ValueError('Email already registered')
        
        # Create new user
        user = User(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone'),
            role=data['role']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        return user
    
    def login_user(self, data):
        """Login user and return tokens"""
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            raise ValueError('Invalid credentials')
        
        if not user.is_active:
            raise ValueError('Account is deactivated')
        
        # Create tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role
            }
        }
    
    def forgot_password(self, email):
        """Send password reset email"""
        user = User.query.filter_by(email=email).first()
        if not user:
            raise ValueError('Email not found')
        
        # TODO: Implement password reset token generation and email sending
        # For now, just placeholder
        pass
    
    def reset_password(self, data):
        """Reset password with token"""
        # TODO: Implement password reset logic
        pass
