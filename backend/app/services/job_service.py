"""
Job Service
"""
from app import db
from app.models.job import Job, Review
from datetime import datetime


class JobService:
    """Handle job-related business logic"""
    
    def create_job(self, user_id, data):
        """Create a new job"""
        job = Job(
            client_id=user_id,
            service_id=data['service_id'],
            title=data['title'],
            description=data.get('description'),
            address=data.get('address'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            scheduled_date=data.get('scheduled_date'),
            estimated_duration=data.get('estimated_duration'),
            estimated_price=data.get('estimated_price'),
            status='pending'
        )
        
        db.session.add(job)
        db.session.commit()
        
        return self._serialize_job(job)
    
    def get_job_by_id(self, job_id, user_id):
        """Get job by ID"""
        job = Job.query.get(job_id)
        if not job:
            raise ValueError('Job not found')
        
        # Check if user is authorized to view this job
        if job.client_id != user_id and job.provider_id != user_id:
            raise ValueError('Unauthorized access')
        
        return self._serialize_job(job)
    
    def update_job(self, job_id, user_id, data):
        """Update job"""
        job = Job.query.get(job_id)
        if not job or job.client_id != user_id:
            raise ValueError('Job not found or unauthorized')
        
        # Update allowed fields
        allowed_fields = ['title', 'description', 'scheduled_date', 'estimated_duration']
        for field in allowed_fields:
            if field in data:
                setattr(job, field, data[field])
        
        db.session.commit()
        return self._serialize_job(job)
    
    def cancel_job(self, job_id, user_id):
        """Cancel a job"""
        job = Job.query.get(job_id)
        if not job or job.client_id != user_id:
            raise ValueError('Job not found or unauthorized')
        
        job.status = 'cancelled'
        job.cancelled_at = datetime.utcnow()
        db.session.commit()
        
        return self._serialize_job(job)
    
    def get_upcoming_jobs(self, user_id):
        """Get upcoming jobs for user"""
        jobs = Job.query.filter(
            db.or_(Job.client_id == user_id, Job.provider_id == user_id),
            Job.status.in_(['pending', 'accepted', 'in_progress'])
        ).all()
        
        return [self._serialize_job(job) for job in jobs]
    
    def get_job_history(self, user_id):
        """Get job history for user"""
        jobs = Job.query.filter(
            db.or_(Job.client_id == user_id, Job.provider_id == user_id),
            Job.status.in_(['completed', 'cancelled'])
        ).all()
        
        return [self._serialize_job(job) for job in jobs]
    
    def get_available_jobs(self, user_id):
        """Get available jobs for providers"""
        # TODO: Filter by provider's services and location
        jobs = Job.query.filter_by(status='pending', provider_id=None).all()
        return [self._serialize_job(job) for job in jobs]
    
    def accept_job(self, job_id, user_id):
        """Accept a job (for providers)"""
        job = Job.query.get(job_id)
        if not job or job.status != 'pending':
            raise ValueError('Job not available')
        
        job.provider_id = user_id
        job.status = 'accepted'
        job.accepted_at = datetime.utcnow()
        db.session.commit()
        
        return self._serialize_job(job)
    
    def complete_job(self, job_id, user_id):
        """Mark job as completed"""
        job = Job.query.get(job_id)
        if not job or job.provider_id != user_id:
            raise ValueError('Job not found or unauthorized')
        
        job.status = 'completed'
        job.completed_at = datetime.utcnow()
        db.session.commit()
        
        return self._serialize_job(job)
    
    def create_review(self, job_id, user_id, data):
        """Create a review for a job"""
        job = Job.query.get(job_id)
        if not job or job.status != 'completed':
            raise ValueError('Job not found or not completed')
        
        # Determine reviewee
        if job.client_id == user_id:
            reviewee_id = job.provider_id
        elif job.provider_id == user_id:
            reviewee_id = job.client_id
        else:
            raise ValueError('Unauthorized')
        
        review = Review(
            job_id=job_id,
            reviewer_id=user_id,
            reviewee_id=reviewee_id,
            rating=data['rating'],
            comment=data.get('comment')
        )
        
        db.session.add(review)
        db.session.commit()
        
        return self._serialize_review(review)
    
    def _serialize_job(self, job):
        """Serialize job object"""
        return {
            'id': job.id,
            'client_id': job.client_id,
            'provider_id': job.provider_id,
            'service_id': job.service_id,
            'title': job.title,
            'description': job.description,
            'status': job.status,
            'address': job.address,
            'latitude': job.latitude,
            'longitude': job.longitude,
            'scheduled_date': job.scheduled_date.isoformat() if job.scheduled_date else None,
            'estimated_duration': job.estimated_duration,
            'estimated_price': job.estimated_price,
            'final_price': job.final_price,
            'created_at': job.created_at.isoformat(),
            'updated_at': job.updated_at.isoformat()
        }
    
    def _serialize_review(self, review):
        """Serialize review object"""
        return {
            'id': review.id,
            'job_id': review.job_id,
            'reviewer_id': review.reviewer_id,
            'reviewee_id': review.reviewee_id,
            'rating': review.rating,
            'comment': review.comment,
            'created_at': review.created_at.isoformat()
        }
