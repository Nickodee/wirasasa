import axiosInstance from './axiosConfig';

/**
 * Get messages for a job
 * @param {string} jobId - Job ID
 * @returns {Promise} - API response
 */
export const getMessages = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/chat/${jobId}/messages`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Send a message
 * @param {string} jobId - Job ID
 * @param {object} messageData - Message data
 * @returns {Promise} - API response
 */
export const sendMessage = async (jobId, messageData) => {
  try {
    const response = await axiosInstance.post(`/chat/${jobId}/messages`, messageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all conversations
 * @returns {Promise} - API response
 */
export const getConversations = async () => {
  try {
    const response = await axiosInstance.get('/chat/conversations');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
