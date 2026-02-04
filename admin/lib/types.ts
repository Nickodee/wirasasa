export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  profile_picture: string
  role: 'client' | 'provider'
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface ProviderProfile {
  id: number
  user_id: number
  bio: string
  experience_years: number
  rating: number
  total_reviews: number
  total_jobs_completed: number
  is_available: boolean
  verification_status: 'pending' | 'verified' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Job {
  id: number
  client_id: number
  provider_id: number
  service_id: number
  title: string
  description: string
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  address: string
  latitude: number
  longitude: number
  scheduled_date: string
  estimated_duration: number
  estimated_price: number
  final_price: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  name: string
  description: string
  category: string
  icon: string
  base_price: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: number
  job_id: number
  payer_id: number
  payee_id: number
  payment_method_id: number
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transaction_id: string
  payment_provider: string
  created_at: string
  processed_at: string
}

export interface DashboardStats {
  totalUsers: number
  totalProviders: number
  totalClients: number
  activeJobs: number
  completedJobs: number
  totalRevenue: number
  pendingPayments: number
  newUsersThisWeek: number
  revenueGrowth: number
  jobsGrowth: number
}
