export type UserRole = 'client' | 'provider';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  jobsCompleted: number;
  hourlyRate: number;
  eta: number;
  profileImage?: string;
  verified?: boolean;
  about?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Job {
  id: string;
  clientId: string;
  providerId: string;
  serviceType: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  estimatedEarnings?: number;
  distance?: number;
  estimatedTime?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}

export interface WeeklyEarnings {
  day: string;
  amount: number;
}

