"""
Chat Service
"""
from app import db
from app.models.chat import Conversation, ConversationParticipant, Message


class ChatService:
    """Handle chat-related business logic"""
    
    def get_conversations(self, user_id):
        """Get user's conversations"""
        participants = ConversationParticipant.query.filter_by(user_id=user_id).all()
        conversations = [p.conversation for p in participants]
        
        return [self._serialize_conversation(c) for c in conversations]
    
    def get_conversation(self, user_id, conversation_id):
        """Get conversation details"""
        conversation = Conversation.query.get(conversation_id)
        if not conversation:
            raise ValueError('Conversation not found')
        
        # Check if user is participant
        participant = ConversationParticipant.query.filter_by(
            conversation_id=conversation_id,
            user_id=user_id
        ).first()
        
        if not participant:
            raise ValueError('Unauthorized access')
        
        return self._serialize_conversation(conversation)
    
    def get_messages(self, user_id, conversation_id):
        """Get messages in a conversation"""
        # Check if user is participant
        participant = ConversationParticipant.query.filter_by(
            conversation_id=conversation_id,
            user_id=user_id
        ).first()
        
        if not participant:
            raise ValueError('Unauthorized access')
        
        messages = Message.query.filter_by(conversation_id=conversation_id).order_by(
            Message.created_at.asc()
        ).all()
        
        return [self._serialize_message(m) for m in messages]
    
    def send_message(self, user_id, conversation_id, data):
        """Send a message"""
        # Check if user is participant
        participant = ConversationParticipant.query.filter_by(
            conversation_id=conversation_id,
            user_id=user_id
        ).first()
        
        if not participant:
            raise ValueError('Unauthorized access')
        
        message = Message(
            conversation_id=conversation_id,
            sender_id=user_id,
            content=data['content'],
            message_type=data.get('message_type', 'text'),
            attachment_url=data.get('attachment_url')
        )
        
        db.session.add(message)
        db.session.commit()
        
        return self._serialize_message(message)
    
    def _serialize_conversation(self, conversation):
        """Serialize conversation object"""
        return {
            'id': conversation.id,
            'job_id': conversation.job_id,
            'created_at': conversation.created_at.isoformat(),
            'updated_at': conversation.updated_at.isoformat(),
            'participants': [p.user_id for p in conversation.participants]
        }
    
    def _serialize_message(self, message):
        """Serialize message object"""
        return {
            'id': message.id,
            'conversation_id': message.conversation_id,
            'sender_id': message.sender_id,
            'content': message.content,
            'message_type': message.message_type,
            'attachment_url': message.attachment_url,
            'is_read': message.is_read,
            'created_at': message.created_at.isoformat()
        }
