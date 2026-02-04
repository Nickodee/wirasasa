'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  DollarSign, 
  Settings, 
  Package,
  CheckSquare,
  BarChart3,
  X
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Providers', href: '/dashboard/providers', icon: Briefcase },
  { name: 'Jobs', href: '/dashboard/jobs', icon: CheckSquare },
  { name: 'Services', href: '/dashboard/services', icon: Package },
  { name: 'Payments', href: '/dashboard/payments', icon: DollarSign },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
            WiraSasa
          </span>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-8 flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 z-50 transform transition-transform">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
