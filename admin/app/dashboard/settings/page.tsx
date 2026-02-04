'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Bell, Mail, Shield } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const email = localStorage.getItem('admin_email_notifications')
    const push = localStorage.getItem('admin_push_notifications')
    if (email !== null) setEmailNotifications(email === 'true')
    if (push !== null) setPushNotifications(push === 'true')
  }, [])

  const handleEmailToggle = () => {
    const next = !emailNotifications
    setEmailNotifications(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_email_notifications', String(next))
    }
  }

  const handlePushToggle = () => {
    const next = !pushNotifications
    setPushNotifications(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_push_notifications', String(next))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your admin experience, appearance, and notifications.
        </p>
      </div>

      {/* Appearance */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-primary-600" />
              ) : (
                <Moon className="h-5 w-5 text-primary-400" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">Appearance</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Switch between light and dark mode for the admin panel.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Control how you receive updates about jobs, payments, and users.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Email notifications
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive summary emails about key activity.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleEmailToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  In-app alerts
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Show alerts inside the admin dashboard.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePushToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pushNotifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Account info (read-only for now) */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-900 dark:text-white">Account</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          These details are based on the currently signed-in admin. In a full implementation,
          you would manage admin accounts from here.
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-gray-900 dark:text-white">admin@wirasasa.com</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Role</p>
            <p className="text-gray-900 dark:text-white">Administrator</p>
          </div>
        </div>
      </section>
    </div>
  )
}

