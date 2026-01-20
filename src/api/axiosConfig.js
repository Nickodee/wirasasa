import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL from environment variable or default
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors (logout)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      try {
        await AsyncStorage.removeItem('auth_token');
        await AsyncStorage.removeItem('user');
        // You can emit an event here or use a navigation service to redirect
      } catch (storageError) {
        console.error('Error clearing auth data:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
