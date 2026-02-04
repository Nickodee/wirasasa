'use client'

import { useEffect, useState } from 'react'
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function ProvidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Provider Verification
        </h1>
      </div>

      {/* Pending Verifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pending Verifications
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${item}`}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Provider Name {item}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Electrician • 5 years experience
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
