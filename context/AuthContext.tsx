import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { User, UserRole } from '../types';
import LocationService from '../services/LocationService';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedRole = await AsyncStorage.getItem('role');
      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole as UserRole);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const login = async (email: string, password: string, selectedRole: UserRole) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: selectedRole === 'client' ? 'Alice Mwangi' : 'John Doe',
      email,
      role: selectedRole,
      phone: '+254712345678',
      profileImage: undefined,
    };

    setUser(mockUser);
    setRole(selectedRole);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('role', selectedRole);

    // Request location permission on first login
    await requestLocationPermissionOnFirstLogin();
  };

  const requestLocationPermissionOnFirstLogin = async () => {
    try {
      // Check if location permission was already requested
      const locationPermissionRequested = await AsyncStorage.getItem('locationPermissionRequested');
      
      if (locationPermissionRequested === 'true') {
        // Already requested, just check if we have permission
        const hasPermission = await LocationService.hasPermissions();
        if (!hasPermission) {
          // Permission was denied previously, don't ask again automatically
          return;
        }
        return;
      }

      // First time login - request location permission
      Alert.alert(
        'Location Access',
        'WiraSasa needs access to your location to help you find nearby service providers and improve your experience. Would you like to enable location services?',
        [
          {
            text: 'Not Now',
            style: 'cancel',
            onPress: async () => {
              await AsyncStorage.setItem('locationPermissionRequested', 'true');
            },
          },
          {
            text: 'Allow',
            onPress: async () => {
              const granted = await LocationService.requestPermissions();
              await AsyncStorage.setItem('locationPermissionRequested', 'true');
              
              if (granted) {
                // Get initial location
                await LocationService.getCurrentLocation();
              } else {
                Alert.alert(
                  'Location Permission Denied',
                  'You can enable location access later in your device settings.',
                  [{ text: 'OK' }]
                );
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error requesting location permission on first login:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('role');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    AsyncStorage.setItem('role', newRole);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

