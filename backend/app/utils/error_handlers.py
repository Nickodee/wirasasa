"""
Error Handlers
"""
from flask import jsonify
from werkzeug.exceptions import HTTPException


def register_error_handlers(app):
    """Register error handlers for the application"""
    
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        """Handle HTTP exceptions"""
        response = {
            'error': e.name,
            'message': e.description,
            'status_code': e.code
        }
        return jsonify(response), e.code
    
    @app.errorhandler(Exception)
    def handle_exception(e):
        """Handle general exceptions"""
        response = {
            'error': 'Internal Server Error',
            'message': str(e),
            'status_code': 500
        }
        return jsonify(response), 500
    
    @app.errorhandler(404)
    def not_found(e):
        """Handle 404 errors"""
        return jsonify({'error': 'Not Found', 'message': 'Resource not found'}), 404
    
    @app.errorhandler(400)
    def bad_request(e):
        """Handle 400 errors"""
        return jsonify({'error': 'Bad Request', 'message': str(e)}), 400
    
    @app.errorhandler(401)
    def unauthorized(e):
        """Handle 401 errors"""
        return jsonify({'error': 'Unauthorized', 'message': 'Authentication required'}), 401
    
    @app.errorhandler(403)
    def forbidden(e):
        """Handle 403 errors"""
        return jsonify({'error': 'Forbidden', 'message': 'Access denied'}), 403
