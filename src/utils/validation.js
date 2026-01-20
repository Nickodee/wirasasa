/**
 * Validates a Kenya phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const validatePhone = (phone) => {
  // Remove any spaces or special characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's 10 digits (without country code) or 12 digits (with +254)
  if (cleaned.length === 10) {
    return /^[0-9]{10}$/.test(cleaned);
  }
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return true;
  }
  
  return false;
};

/**
 * Validates OTP code
 * @param {string} otp - OTP to validate
 * @returns {boolean} - True if valid
 */
export const validateOTP = (otp) => {
  return /^[0-9]{6}$/.test(otp);
};

/**
 * Validates rate amount
 * @param {string|number} rate - Rate to validate
 * @returns {boolean} - True if valid
 */
export const validateRate = (rate) => {
  const num = parseFloat(rate);
  return !isNaN(num) && num > 0;
};

/**
 * Validates email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
