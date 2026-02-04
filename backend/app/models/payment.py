"""
Payment Models
"""
from datetime import datetime
from app import db


class PaymentMethod(db.Model):
    __tablename__ = 'payment_methods'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # card, mobile_money, etc.
    card_last_four = db.Column(db.String(4))
    card_brand = db.Column(db.String(20))
    phone_number = db.Column(db.String(20))
    is_default = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref='payment_methods')
    
    def __repr__(self):
        return f'<PaymentMethod {self.id} - {self.type}>'


class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    payer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_method_id = db.Column(db.Integer, db.ForeignKey('payment_methods.id'))
    
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(3), default='USD')
    status = db.Column(db.String(20), nullable=False, default='pending')  # pending, processing, completed, failed, refunded
    
    transaction_id = db.Column(db.String(100), unique=True)
    payment_provider = db.Column(db.String(50))  # stripe, mpesa, etc.
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    processed_at = db.Column(db.DateTime)
    
    job = db.relationship('Job', backref='payments')
    payer = db.relationship('User', foreign_keys=[payer_id])
    payee = db.relationship('User', foreign_keys=[payee_id])
    
    def __repr__(self):
        return f'<Payment {self.id} - {self.status}>'
