import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserStore = create((set, get) => ({
  currentRole: 'client', // 'client' or 'provider'
  primaryRole: 'client',
  isProvider: false,

  /**
   * Toggle between client and provider roles
   */
  toggleRole: async () => {
    const { currentRole } = get();
    const newRole = currentRole === 'client' ? 'provider' : 'client';
    try {
      await AsyncStorage.setItem('current_role', newRole);
      set({ currentRole: newRole });
    } catch (error) {
      console.error('Error toggling role:', error);
    }
  },

  /**
   * Set primary role (from registration)
   * @param {string} role - Primary role ('client' or 'provider')
   */
  setPrimaryRole: async (role) => {
    try {
      await AsyncStorage.setItem('primary_role', role);
      set({ primaryRole: role, currentRole: role, isProvider: role === 'provider' });
    } catch (error) {
      console.error('Error setting primary role:', error);
    }
  },

  /**
   * Update profile data
   * @param {object} data - Profile data
   */
  updateProfile: async (data) => {
    try {
      const profileStr = await AsyncStorage.getItem('profile');
      const profile = profileStr ? JSON.parse(profileStr) : {};
      const updatedProfile = { ...profile, ...data };
      await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
      
      if (data.primaryRole) {
        set({ primaryRole: data.primaryRole });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  },

  /**
   * Restore user state from storage
   */
  restoreUserState: async () => {
    try {
      const currentRole = await AsyncStorage.getItem('current_role');
      const primaryRole = await AsyncStorage.getItem('primary_role');
      
      if (currentRole || primaryRole) {
        set({
          currentRole: currentRole || 'client',
          primaryRole: primaryRole || 'client',
          isProvider: primaryRole === 'provider',
        });
      }
    } catch (error) {
      console.error('Error restoring user state:', error);
    }
  },
}));

export default useUserStore;
