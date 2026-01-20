import axiosInstance from './axiosConfig';

/**
 * Create invoice for a job
 * @param {string} jobId - Job ID
 * @param {object} invoiceData - Invoice data
 * @returns {Promise} - API response
 */
export const createInvoice = async (jobId, invoiceData) => {
  try {
    const response = await axiosInstance.post(`/jobs/${jobId}/invoice`, invoiceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get provider earnings
 * @param {object} params - Query params (from, to dates)
 * @returns {Promise} - API response
 */
export const getEarnings = async (params) => {
  try {
    const response = await axiosInstance.get('/provider/earnings', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get provider dashboard data
 * @returns {Promise} - API response
 */
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get('/provider/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Request payout
 * @param {object} payoutData - Payout request data
 * @returns {Promise} - API response
 */
export const requestPayout = async (payoutData) => {
  try {
    const response = await axiosInstance.post('/provider/payout', payoutData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
