"""
Location Routes - GPS tracking and proximity matching
"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api.v1 import api_v1_bp
from app.services.location_service import LocationService

location_service = LocationService()


@api_v1_bp.route('/providers/location/update', methods=['POST'])
@jwt_required()
def update_provider_location():
    """Update provider's real-time location"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        timestamp = data.get('timestamp')
        
        if not all([latitude, longitude]):
            return jsonify({'error': 'Missing coordinates'}), 400
        
        result = location_service.update_provider_location(
            provider_id=user_id,
            latitude=latitude,
            longitude=longitude,
            timestamp=timestamp
        )
        
        return jsonify({'message': 'Location updated'}), 200
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/providers/nearby', methods=['POST'])
@jwt_required()
def find_nearby_providers():
    """Find providers near a location"""
    try:
        data = request.get_json()
        
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        service_type = data.get('serviceType')
        radius = data.get('radius', 10)  # Default 10km radius
        
        if not all([latitude, longitude, service_type]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        providers = location_service.find_nearby_providers(
            latitude=latitude,
            longitude=longitude,
            service_type=service_type,
            radius=radius
        )
        
        return jsonify({'providers': providers}), 200
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/location/distance', methods=['POST'])
@jwt_required()
def calculate_distance():
    """Calculate distance and ETA between two points"""
    try:
        data = request.get_json()
        
        origin_lat = data.get('originLat')
        origin_lng = data.get('originLng')
        dest_lat = data.get('destLat')
        dest_lng = data.get('destLng')
        
        if not all([origin_lat, origin_lng, dest_lat, dest_lng]):
            return jsonify({'error': 'Missing coordinates'}), 400
        
        result = location_service.calculate_distance_and_eta(
            origin_lat=origin_lat,
            origin_lng=origin_lng,
            dest_lat=dest_lat,
            dest_lng=dest_lng
        )
        
        return jsonify(result), 200
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/location/geocode', methods=['POST'])
@jwt_required()
def geocode_address():
    """Convert address to coordinates"""
    try:
        data = request.get_json()
        address = data.get('address')
        
        if not address:
            return jsonify({'error': 'Address is required'}), 400
        
        coordinates = location_service.geocode_address(address)
        
        if coordinates:
            return jsonify(coordinates), 200
        else:
            return jsonify({'error': 'Address not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/location/reverse-geocode', methods=['POST'])
@jwt_required()
def reverse_geocode():
    """Convert coordinates to address"""
    try:
        data = request.get_json()
        
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        
        if not all([latitude, longitude]):
            return jsonify({'error': 'Missing coordinates'}), 400
        
        address = location_service.reverse_geocode(latitude, longitude)
        
        if address:
            return jsonify({'address': address}), 200
        else:
            return jsonify({'error': 'Address not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_v1_bp.route('/providers/location/<provider_id>', methods=['GET'])
@jwt_required()
def get_provider_location(provider_id):
    """Get provider's current location"""
    try:
        location = location_service.get_provider_location(provider_id)
        
        if location:
            return jsonify(location), 200
        else:
            return jsonify({'error': 'Location not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500
