'use client'

import { useEffect, useState } from 'react'
import { DollarSign, Briefcase, Users, TrendingUp } from 'lucide-react'
import StatCard from '@/components/StatCard'
import { getAnalytics } from '@/lib/api'

type Period = '7d' | '30d' | '90d'

interface AnalyticsSummary {
  totalRevenue: number
  totalJobs: number
  activeUsers: number
  revenueGrowth: number
  topServices: { name: string; jobs: number; revenue: number }[]
}

// Fallback mock data while backend analytics endpoint is not implemented
const mockAnalytics: Record<Period, AnalyticsSummary> = {
  '7d': {
    totalRevenue: 12540,
    totalJobs: 184,
    activeUsers: 312,
    revenueGrowth: 8.4,
    topServices: [
      { name: 'Plumbing', jobs: 48, revenue: 3800 },
      { name: 'Electrical', jobs: 36, revenue: 3250 },
      { name: 'Cleaning', jobs: 30, revenue: 2100 },
    ],
  },
  '30d': {
    totalRevenue: 48210,
    totalJobs: 712,
    activeUsers: 1043,
    revenueGrowth: 15.2,
    topServices: [
      { name: 'Plumbing', jobs: 190, revenue: 14800 },
      { name: 'Electrical', jobs: 165, revenue: 13650 },
      { name: 'Gardening', jobs: 120, revenue: 7800 },
    ],
  },
  '90d': {
    totalRevenue: 139450,
    totalJobs: 2110,
    activeUsers: 2894,
    revenueGrowth: 24.7,
    topServices: [
      { name: 'Plumbing', jobs: 580, revenue: 45200 },
      { name: 'Electrical', jobs: 520, revenue: 41600 },
      { name: 'Cleaning', jobs: 390, revenue: 27150 },
    ],
  },
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('7d')
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics(period)
  }, [period])

  const fetchAnalytics = async (p: Period) => {
    setLoading(true)
    try {
      // Try real API first
      const response = await getAnalytics(p).catch(() => null)

      if (response && typeof response === 'object') {
        // Be defensive about backend shape; fall back to mock if keys missing
        if (
          typeof response.totalRevenue === 'number' &&
          typeof response.totalJobs === 'number' &&
          typeof response.activeUsers === 'number'
        ) {
          setData({
            totalRevenue: response.totalRevenue,
            totalJobs: response.totalJobs,
            activeUsers: response.activeUsers,
            revenueGrowth: response.revenueGrowth ?? 0,
            topServices: response.topServices ?? mockAnalytics[p].topServices,
          })
          setLoading(false)
          return
        }
      }

      // Fallback to mock data
      setData(mockAnalytics[p])
    } catch (error) {
      console.error('Error loading analytics:', error)
      setData(mockAnalytics[p])
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }

  const periodLabel =
    period === '7d' ? 'Last 7 days' : period === '30d' ? 'Last 30 days' : 'Last 90 days'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics &amp; Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Key metrics and trends for {periodLabel.toLowerCase()}.
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 first:rounded-l-lg last:rounded-r-lg ${
                period === p
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {p === '7d' ? '7d' : p === '30d' ? '30d' : '90d'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={data.revenueGrowth}
          trendLabel="vs previous period"
          color="purple"
        />
        <StatCard
          title="Total Jobs"
          value={data.totalJobs}
          icon={Briefcase}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={data.activeUsers}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Growth"
          value={`${data.revenueGrowth.toFixed(1)}%`}
          icon={TrendingUp}
          color="indigo"
        />
      </div>

      {/* Top services table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Services by Revenue
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Jobs
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.topServices.map((service) => (
                <tr key={service.name}>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {service.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 text-right">
                    {service.jobs}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                    ${service.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

