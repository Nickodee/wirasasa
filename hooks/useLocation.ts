/**
 * useLocation Hook
 * React hook for managing location tracking in components
 */

import { useState, useEffect, useCallback } from 'react';
import LocationService, { LocationData, Coordinates } from '../services/LocationService';

interface UseLocationResult {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<void>;
  startTracking: (providerId?: string) => Promise<void>;
  stopTracking: () => Promise<void>;
  calculateDistance: (destination: Coordinates) => number | null;
  getETA: (destination: Coordinates) => Promise<number | null>;
}

export const useLocation = (autoStart: boolean = false): UseLocationResult => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  useEffect(() => {
    if (autoStart) {
      getCurrentLocation();
    }

    return () => {
      if (isTracking) {
        LocationService.stopLocationTracking();
      }
    };
  }, [autoStart]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const granted = await LocationService.requestPermissions();
      
      if (!granted) {
        setError('Location permission denied. Please enable location access in settings.');
      }
      
      return granted;
    } catch (err) {
      setError('Failed to request location permission');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const currentLocation = await LocationService.getCurrentLocation();
      
      if (currentLocation) {
        setLocation(currentLocation);
      } else {
        setError('Failed to get current location');
      }
    } catch (err) {
      setError('Error getting location');
      console.error('useLocation getCurrentLocation error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const startTracking = useCallback(async (providerId?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const success = await LocationService.startLocationTracking((newLocation) => {
        setLocation(newLocation);
        
        // Broadcast location for providers
        if (providerId) {
          LocationService.broadcastProviderLocation(providerId, newLocation);
        }
      });

      if (success) {
        setIsTracking(true);
      } else {
        setError('Failed to start location tracking');
      }
    } catch (err) {
      setError('Error starting location tracking');
      console.error('useLocation startTracking error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const stopTracking = useCallback(async (): Promise<void> => {
    try {
      await LocationService.stopLocationTracking();
      setIsTracking(false);
    } catch (err) {
      console.error('useLocation stopTracking error:', err);
    }
  }, []);

  const calculateDistance = useCallback((destination: Coordinates): number | null => {
    if (!location) return null;
    return LocationService.calculateDistance(location.coordinates, destination);
  }, [location]);

  const getETA = useCallback(async (destination: Coordinates): Promise<number | null> => {
    if (!location) return null;
    return await LocationService.calculateETA(location.coordinates, destination);
  }, [location]);

  return {
    location,
    loading,
    error,
    requestPermission,
    getCurrentLocation,
    startTracking,
    stopTracking,
    calculateDistance,
    getETA,
  };
};
