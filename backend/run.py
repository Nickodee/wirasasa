"""
Main Application Entry Point
"""
import os
from app import create_app, db

# Create Flask application
app = create_app(os.getenv('FLASK_ENV') or 'development')


@app.shell_context_processor
def make_shell_context():
    """Make database and models available in Flask shell"""
    from app.models.user import User, ProviderProfile
    from app.models.service import Service, ProviderService, Availability
    from app.models.job import Job, Review
    from app.models.payment import PaymentMethod, Payment
    from app.models.notification import Notification
    from app.models.chat import Conversation, ConversationParticipant, Message
    
    return {
        'db': db,
        'User': User,
        'ProviderProfile': ProviderProfile,
        'Service': Service,
        'ProviderService': ProviderService,
        'Availability': Availability,
        'Job': Job,
        'Review': Review,
        'PaymentMethod': PaymentMethod,
        'Payment': Payment,
        'Notification': Notification,
        'Conversation': Conversation,
        'ConversationParticipant': ConversationParticipant,
        'Message': Message
    }


@app.route('/')
def index():
    """Root endpoint"""
    return {
        'message': 'Welcome to WiraSasa API',
        'version': '1.0.0',
        'status': 'running'
    }


@app.route('/health')
def health():
    """Health check endpoint"""
    return {'status': 'healthy'}, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
