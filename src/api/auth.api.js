import axiosInstance from './axiosConfig';

/**
 * Send OTP to phone number
 * @param {string} phoneNumber - Phone number
 * @returns {Promise} - API response
 */
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post('/auth/send-otp', {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Verify OTP
 * @param {string} phoneNumber - Phone number
 * @param {string} otp - OTP code
 * @returns {Promise} - API response with token and user
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', {
      phoneNumber,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Register user
 * @param {object} userData - User registration data
 * @returns {Promise} - API response
 */
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get current user profile
 * @returns {Promise} - API response
 */
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
