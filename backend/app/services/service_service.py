"""
Service Service (handles service catalog operations)
"""
from app.models.service import Service


class ServiceService:
    """Handle service catalog operations"""
    
    def get_all_services(self):
        """Get all available services"""
        services = Service.query.filter_by(is_active=True).all()
        return [self._serialize_service(s) for s in services]
    
    def get_service_by_id(self, service_id):
        """Get service by ID"""
        service = Service.query.get(service_id)
        if not service:
            raise ValueError('Service not found')
        return self._serialize_service(service)
    
    def get_categories(self):
        """Get all service categories"""
        categories = Service.query.with_entities(Service.category).distinct().all()
        return [cat[0] for cat in categories]
    
    def _serialize_service(self, service):
        """Serialize service object"""
        return {
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'category': service.category,
            'icon': service.icon,
            'base_price': service.base_price
        }
