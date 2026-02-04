"""
Jobs Routes
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.job_service import JobService

job_service = JobService()


@api_v1_bp.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    """Create a new job request"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        job = job_service.create_job(user_id, data)
        return jsonify(job), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/<int:job_id>', methods=['GET'])
@jwt_required()
def get_job(job_id):
    """Get job details"""
    try:
        user_id = get_jwt_identity()
        job = job_service.get_job_by_id(job_id, user_id)
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@api_v1_bp.route('/jobs/<int:job_id>', methods=['PUT'])
@jwt_required()
def update_job(job_id):
    """Update job details"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        job = job_service.update_job(job_id, user_id, data)
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/<int:job_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_job(job_id):
    """Cancel a job"""
    try:
        user_id = get_jwt_identity()
        job = job_service.cancel_job(job_id, user_id)
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/upcoming', methods=['GET'])
@jwt_required()
def get_upcoming_jobs():
    """Get upcoming jobs for current user"""
    try:
        user_id = get_jwt_identity()
        jobs = job_service.get_upcoming_jobs(user_id)
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/history', methods=['GET'])
@jwt_required()
def get_job_history():
    """Get job history for current user"""
    try:
        user_id = get_jwt_identity()
        jobs = job_service.get_job_history(user_id)
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/available', methods=['GET'])
@jwt_required()
def get_available_jobs():
    """Get available jobs for providers"""
    try:
        user_id = get_jwt_identity()
        jobs = job_service.get_available_jobs(user_id)
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/<int:job_id>/accept', methods=['POST'])
@jwt_required()
def accept_job(job_id):
    """Accept a job (for providers)"""
    try:
        user_id = get_jwt_identity()
        job = job_service.accept_job(job_id, user_id)
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/<int:job_id>/complete', methods=['POST'])
@jwt_required()
def complete_job(job_id):
    """Mark job as completed"""
    try:
        user_id = get_jwt_identity()
        job = job_service.complete_job(job_id, user_id)
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_v1_bp.route('/jobs/<int:job_id>/review', methods=['POST'])
@jwt_required()
def review_job(job_id):
    """Submit review for completed job"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        review = job_service.create_review(job_id, user_id, data)
        return jsonify(review), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
