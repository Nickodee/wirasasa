import axiosInstance from './axiosConfig';

/**
 * Get nearby providers
 * @param {object} params - Query params (lat, lng, service, radius)
 * @returns {Promise} - API response with providers list
 */
export const getNearbyProviders = async (params) => {
  try {
    const response = await axiosInstance.get('/providers/nearby', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new job request
 * @param {object} jobData - Job request data
 * @returns {Promise} - API response
 */
export const createJob = async (jobData) => {
  try {
    const response = await axiosInstance.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Accept a job (provider)
 * @param {string} jobId - Job ID
 * @returns {Promise} - API response
 */
export const acceptJob = async (jobId) => {
  try {
    const response = await axiosInstance.post(`/jobs/${jobId}/accept`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Decline a job (provider)
 * @param {string} jobId - Job ID
 * @returns {Promise} - API response
 */
export const declineJob = async (jobId) => {
  try {
    const response = await axiosInstance.post(`/jobs/${jobId}/decline`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update job status
 * @param {string} jobId - Job ID
 * @param {string} status - New status
 * @returns {Promise} - API response
 */
export const updateJobStatus = async (jobId, status) => {
  try {
    const response = await axiosInstance.patch(`/jobs/${jobId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Rate a job
 * @param {string} jobId - Job ID
 * @param {number} rating - Rating (1-5)
 * @param {string} review - Review text (optional)
 * @returns {Promise} - API response
 */
export const rateJob = async (jobId, rating, review) => {
  try {
    const response = await axiosInstance.post(`/jobs/${jobId}/rate`, {
      rating,
      review,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get job details
 * @param {string} jobId - Job ID
 * @returns {Promise} - API response
 */
export const getJobDetails = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user's job history
 * @param {string} role - 'client' or 'provider'
 * @returns {Promise} - API response
 */
export const getJobHistory = async (role) => {
  try {
    const response = await axiosInstance.get(`/jobs/history?role=${role}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
