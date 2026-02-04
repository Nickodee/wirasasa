import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Auth APIs
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password, role: 'admin' })
  return response.data
}

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }
}

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await api.get('/admin/stats')
  return response.data
}

// Users APIs
export const getUsers = async (params?: { role?: string; page?: number; limit?: number }) => {
  const response = await api.get('/admin/users', { params })
  return response.data
}

export const getUserById = async (id: number) => {
  const response = await api.get(`/admin/users/${id}`)
  return response.data
}

export const updateUser = async (id: number, data: any) => {
  const response = await api.put(`/admin/users/${id}`, data)
  return response.data
}

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/admin/users/${id}`)
  return response.data
}

// Jobs APIs
export const getJobs = async (params?: { status?: string; page?: number; limit?: number }) => {
  const response = await api.get('/admin/jobs', { params })
  return response.data
}

export const getJobById = async (id: number) => {
  const response = await api.get(`/admin/jobs/${id}`)
  return response.data
}

export const updateJob = async (id: number, data: any) => {
  const response = await api.put(`/admin/jobs/${id}`, data)
  return response.data
}

// Services APIs
export const getServices = async () => {
  const response = await api.get('/admin/services')
  return response.data
}

export const createService = async (data: any) => {
  const response = await api.post('/admin/services', data)
  return response.data
}

export const updateService = async (id: number, data: any) => {
  const response = await api.put(`/admin/services/${id}`, data)
  return response.data
}

export const deleteService = async (id: number) => {
  const response = await api.delete(`/admin/services/${id}`)
  return response.data
}

// Payments APIs
export const getPayments = async (params?: { status?: string; page?: number; limit?: number }) => {
  const response = await api.get('/admin/payments', { params })
  return response.data
}

export const getPaymentById = async (id: number) => {
  const response = await api.get(`/admin/payments/${id}`)
  return response.data
}

// Provider Verification APIs
export const getPendingVerifications = async () => {
  const response = await api.get('/admin/verifications/pending')
  return response.data
}

export const verifyProvider = async (id: number, status: 'verified' | 'rejected', reason?: string) => {
  const response = await api.put(`/admin/verifications/${id}`, { status, reason })
  return response.data
}

// Analytics APIs
export const getAnalytics = async (period: '7d' | '30d' | '90d') => {
  const response = await api.get('/admin/analytics', { params: { period } })
  return response.data
}

export default api
