'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  Clock,
  UserCheck,
  Activity
} from 'lucide-react'
import { getDashboardStats } from '@/lib/api'
import { DashboardStats } from '@/lib/types'
import StatCard from '@/components/StatCard'
import RecentActivity from '@/components/RecentActivity'
import RevenueChart from '@/components/RevenueChart'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockStats: DashboardStats = {
        totalUsers: 1247,
        totalProviders: 342,
        totalClients: 905,
        activeJobs: 87,
        completedJobs: 1532,
        totalRevenue: 45678.50,
        pendingPayments: 12,
        newUsersThisWeek: 45,
        revenueGrowth: 12.5,
        jobsGrowth: 8.3,
      }
      setStats(mockStats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          trend={stats?.revenueGrowth}
          trendLabel="vs last month"
          color="blue"
        />
        <StatCard
          title="Active Providers"
          value={stats?.totalProviders || 0}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Active Jobs"
          value={stats?.activeJobs || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue.toLocaleString() || 0}`}
          icon={DollarSign}
          trend={stats?.jobsGrowth}
          trendLabel="vs last month"
          color="purple"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Completed Jobs"
          value={stats?.completedJobs || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Total Clients"
          value={stats?.totalClients || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending Payments"
          value={stats?.pendingPayments || 0}
          icon={Activity}
          color="orange"
        />
        <StatCard
          title="New Users (7d)"
          value={stats?.newUsersThisWeek || 0}
          icon={TrendingUp}
          color="indigo"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <RecentActivity />
      </div>
    </div>
  )
}
