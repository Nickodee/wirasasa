import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  /**
   * Login user
   * @param {string} token - Auth token
   * @param {object} user - User object
   */
  login: async (token, user) => {
    try {
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user');
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error removing auth data:', error);
    }
  },

  /**
   * Restore auth state from storage
   */
  restoreAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userStr = await AsyncStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Error restoring auth data:', error);
    }
  },

  /**
   * Update user data
   * @param {object} userData - Updated user data
   */
  updateUser: async (userData) => {
    try {
      const currentUser = await AsyncStorage.getItem('user');
      const user = currentUser ? JSON.parse(currentUser) : {};
      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  },
}));

export default useAuthStore;
