/**
 * Payment Service
 * Handles M-Pesa, Card, and Cash payment processing
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/v1';

export interface PaymentMethod {
  id: string;
  type: 'mpesa' | 'card' | 'cash';
  details: {
    phoneNumber?: string;
    cardLast4?: string;
    cardBrand?: string;
  };
  isDefault: boolean;
}

export interface PaymentRequest {
  jobId: string;
  amount: number;
  paymentMethod: 'mpesa' | 'card' | 'cash';
  phoneNumber?: string;
  description: string;
}

export interface Invoice {
  id: string;
  jobId: string;
  amount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  paidAt?: string;
}

class PaymentService {
  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  /**
   * Initialize M-Pesa STK Push payment
   */
  async initiateMpesaPayment(
    phoneNumber: string,
    amount: number,
    jobId: string,
    description: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${API_URL}/payments/mpesa/initiate`,
        {
          phoneNumber,
          amount,
          jobId,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        transactionId: response.data.transactionId,
      };
    } catch (error: any) {
      console.error('M-Pesa payment error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Payment failed. Please try again.',
      };
    }
  }

  /**
   * Check M-Pesa payment status
   */
  async checkMpesaPaymentStatus(transactionId: string): Promise<{
    status: 'pending' | 'success' | 'failed';
    message?: string;
  }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.get(
        `${API_URL}/payments/mpesa/status/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Check payment status error:', error);
      return { status: 'failed', message: 'Failed to check payment status' };
    }
  }

  /**
   * Process card payment
   */
  async processCardPayment(
    amount: number,
    jobId: string,
    cardToken: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${API_URL}/payments/card/charge`,
        {
          amount,
          jobId,
          cardToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        transactionId: response.data.transactionId,
      };
    } catch (error: any) {
      console.error('Card payment error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Card payment failed',
      };
    }
  }

  /**
   * Confirm cash payment
   */
  async confirmCashPayment(
    jobId: string,
    amount: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${API_URL}/payments/cash/confirm`,
        {
          jobId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return { success: true };
    } catch (error: any) {
      console.error('Cash payment confirmation error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to confirm cash payment',
      };
    }
  }

  /**
   * Generate invoice for a job
   */
  async generateInvoice(jobId: string): Promise<{ success: boolean; invoice?: Invoice; error?: string }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${API_URL}/payments/invoice/generate`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        invoice: response.data.invoice,
      };
    } catch (error: any) {
      console.error('Invoice generation error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to generate invoice',
      };
    }
  }

  /**
   * Get invoice by ID
   */
  async getInvoice(invoiceId: string): Promise<Invoice | null> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.get(
        `${API_URL}/payments/invoice/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.invoice;
    } catch (error) {
      console.error('Get invoice error:', error);
      return null;
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(userId: string): Promise<Invoice[]> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.get(
        `${API_URL}/payments/history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.payments || [];
    } catch (error) {
      console.error('Get payment history error:', error);
      return [];
    }
  }

  /**
   * Save payment method
   */
  async savePaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<{
    success: boolean;
    paymentMethodId?: string;
    error?: string;
  }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${API_URL}/payments/methods`,
        paymentMethod,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        paymentMethodId: response.data.paymentMethodId,
      };
    } catch (error: any) {
      console.error('Save payment method error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to save payment method',
      };
    }
  }

  /**
   * Get saved payment methods
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.get(`${API_URL}/payments/methods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.paymentMethods || [];
    } catch (error) {
      console.error('Get payment methods error:', error);
      return [];
    }
  }

  /**
   * Request refund
   */
  async requestRefund(
    jobId: string,
    reason: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${API_URL}/payments/refund`,
        {
          jobId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return { success: true };
    } catch (error: any) {
      console.error('Refund request error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to request refund',
      };
    }
  }
}

export default new PaymentService();
