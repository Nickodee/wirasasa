'use client'

import { CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'job_completed',
    title: 'Job Completed',
    description: 'Plumbing service completed by John Doe',
    time: '5 minutes ago',
    icon: CheckCircle,
    iconColor: 'text-green-500',
  },
  {
    id: 2,
    type: 'new_user',
    title: 'New Provider Registered',
    description: 'Jane Smith registered as an electrician',
    time: '15 minutes ago',
    icon: Clock,
    iconColor: 'text-blue-500',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment of $150 received for Job #1234',
    time: '1 hour ago',
    icon: DollarSign,
    iconColor: 'text-purple-500',
  },
  {
    id: 4,
    type: 'job_cancelled',
    title: 'Job Cancelled',
    description: 'Gardening service cancelled by client',
    time: '2 hours ago',
    icon: XCircle,
    iconColor: 'text-red-500',
  },
]

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 ${activity.iconColor}`}>
                      <activity.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
