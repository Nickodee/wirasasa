/**
 * Location Service
 * Handles real-time GPS location tracking, proximity matching, and ETA calculations
 */

import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/v1';
const GOOGLE_MAPS_API_KEY = 'AIzaSyB8_AZmm8tIDqFmJ5IVFulgs3_jt3UgqfM';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  coordinates: Coordinates;
  address?: string;
  timestamp: number;
}

export interface DistanceResult {
  distance: number; // in kilometers
  duration: number; // in minutes
  durationInTraffic?: number; // in minutes with current traffic
}

class LocationService {
  private watchId: Location.LocationSubscription | null = null;
  private currentLocation: LocationData | null = null;

  /**
   * Request location permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
        console.error('Foreground location permission denied');
        return false;
      }

      // Request background permission for providers
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (backgroundStatus !== 'granted') {
        console.warn('Background location permission denied');
        // Still return true as foreground is granted
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  /**
   * Check if location permissions are granted
   */
  async hasPermissions(): Promise<boolean> {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  }

  /**
   * Get current location once
   */
  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const hasPermission = await this.hasPermissions();
      if (!hasPermission) {
        const granted = await this.requestPermissions();
        if (!granted) return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const locationData: LocationData = {
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        timestamp: location.timestamp,
      };

      // Get address from coordinates
      const address = await this.reverseGeocode(locationData.coordinates);
      if (address) {
        locationData.address = address;
      }

      this.currentLocation = locationData;
      return locationData;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Start watching location changes (for providers)
   */
  async startLocationTracking(
    callback: (location: LocationData) => void,
    interval: number = 10000 // Update every 10 seconds
  ): Promise<boolean> {
    try {
      const hasPermission = await this.hasPermissions();
      if (!hasPermission) {
        const granted = await this.requestPermissions();
        if (!granted) return false;
      }

      // Stop existing watch if any
      await this.stopLocationTracking();

      this.watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: interval,
          distanceInterval: 50, // Update every 50 meters
        },
        (location) => {
          const locationData: LocationData = {
            coordinates: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            timestamp: location.timestamp,
          };

          this.currentLocation = locationData;
          callback(locationData);
        }
      );

      return true;
    } catch (error) {
      console.error('Error starting location tracking:', error);
      return false;
    }
  }

  /**
   * Stop watching location changes
   */
  async stopLocationTracking(): Promise<void> {
    if (this.watchId) {
      this.watchId.remove();
      this.watchId = null;
    }
  }

  /**
   * Broadcast provider location to backend
   */
  async broadcastProviderLocation(providerId: string, location: LocationData): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.post(
        `${API_URL}/providers/location/update`,
        {
          providerId,
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
          timestamp: location.timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error broadcasting location:', error);
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.latitude)) *
        Math.cos(this.toRadians(coord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Get distance and duration using Google Directions API
   */
  async getDistanceAndDuration(
    origin: Coordinates,
    destination: Coordinates,
    mode: 'driving' | 'walking' = 'driving'
  ): Promise<DistanceResult | null> {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: `${origin.latitude},${origin.longitude}`,
            destination: `${destination.latitude},${destination.longitude}`,
            mode,
            departure_time: 'now',
            traffic_model: 'best_guess',
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      if (response.data.status === 'OK' && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const leg = route.legs[0];

        return {
          distance: leg.distance.value / 1000, // Convert meters to kilometers
          duration: Math.ceil(leg.duration.value / 60), // Convert seconds to minutes
          durationInTraffic: leg.duration_in_traffic
            ? Math.ceil(leg.duration_in_traffic.value / 60)
            : undefined,
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting distance and duration:', error);
      // Fallback to Haversine distance calculation
      const distance = this.calculateDistance(origin, destination);
      const avgSpeed = mode === 'driving' ? 40 : 5; // km/h
      const duration = Math.ceil((distance / avgSpeed) * 60); // minutes

      return {
        distance,
        duration,
      };
    }
  }

  /**
   * Calculate ETA in minutes
   */
  async calculateETA(
    providerLocation: Coordinates,
    clientLocation: Coordinates
  ): Promise<number> {
    const result = await this.getDistanceAndDuration(providerLocation, clientLocation);
    return result?.durationInTraffic || result?.duration || 15;
  }

  /**
   * Find nearby providers based on proximity
   */
  async findNearbyProviders(
    clientLocation: Coordinates,
    serviceType: string,
    radius: number = 10 // in kilometers
  ): Promise<any[]> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post(
        `${API_URL}/providers/nearby`,
        {
          latitude: clientLocation.latitude,
          longitude: clientLocation.longitude,
          serviceType,
          radius,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Calculate distance and ETA for each provider
      const providersWithDistance = await Promise.all(
        response.data.providers.map(async (provider: any) => {
          const distance = this.calculateDistance(clientLocation, provider.location);
          const eta = await this.calculateETA(provider.location, clientLocation);

          return {
            ...provider,
            distance,
            eta,
          };
        })
      );

      // Sort by distance (closest first)
      return providersWithDistance.sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Error finding nearby providers:', error);
      return [];
    }
  }

  /**
   * Reverse geocode coordinates to address
   */
  async reverseGeocode(coordinates: Coordinates): Promise<string | null> {
    try {
      const result = await Location.reverseGeocodeAsync(coordinates);
      
      if (result.length > 0) {
        const address = result[0];
        const parts = [
          address.name,
          address.street,
          address.district,
          address.city,
          address.region,
        ].filter(Boolean);
        
        return parts.join(', ');
      }

      return null;
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return null;
    }
  }

  /**
   * Geocode address to coordinates
   */
  async geocodeAddress(address: string): Promise<Coordinates | null> {
    try {
      const result = await Location.geocodeAsync(address);
      
      if (result.length > 0) {
        return {
          latitude: result[0].latitude,
          longitude: result[0].longitude,
        };
      }

      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }

  /**
   * Get current location data
   */
  getCachedLocation(): LocationData | null {
    return this.currentLocation;
  }

  /**
   * Start background location tracking for providers
   */
  async startBackgroundTracking(providerId: string): Promise<boolean> {
    try {
      const { status } = await Location.getBackgroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Background location permission not granted');
        return false;
      }

      await Location.startLocationUpdatesAsync('background-location-task', {
        accuracy: Location.Accuracy.High,
        timeInterval: 15000, // Update every 15 seconds
        distanceInterval: 100, // Update every 100 meters
        foregroundService: {
          notificationTitle: 'WiraSasa',
          notificationBody: 'Tracking your location for job requests',
        },
      });

      return true;
    } catch (error) {
      console.error('Error starting background tracking:', error);
      return false;
    }
  }

  /**
   * Stop background location tracking
   */
  async stopBackgroundTracking(): Promise<void> {
    try {
      await Location.stopLocationUpdatesAsync('background-location-task');
    } catch (error) {
      console.error('Error stopping background tracking:', error);
    }
  }
}

export default new LocationService();
