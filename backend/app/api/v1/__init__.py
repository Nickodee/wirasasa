"""
API Version 1 Blueprint
"""
from flask import Blueprint

api_v1_bp = Blueprint('api_v1', __name__)

# Import routes to register them with the blueprint
from app.api.v1.routes import auth, users, services, jobs, providers, payments, notifications, chat
