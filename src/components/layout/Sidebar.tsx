'use client'
 
import { Menu as MenuIcon, LayoutDashboard, Users, Clock, Building2, LineChart, Bell, Settings, BarChart, GitBranch } from 'lucide-react'
import { useLayoutStore } from '@/store/layout-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
 
const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Participant Distribution', icon: GitBranch, path: '/participation' },
  { name: 'Trainee Metrics', icon: Users, path: '/trainee' },
  { name: 'Timeline & Duration', icon: Clock, path: '/timeline' },
  { name: 'Organization', icon: Building2, path: '/organization' },
  { name: 'KPIs', icon: LineChart, path: '/kpi' },
  { name: 'Status Alerts', icon: Bell, path: '/statusalerts' },
  { name: 'Survey Metrics', icon: BarChart, path: '/survey' },
  { name: 'Admin', icon: Settings, path: '/admin' }
]
 
export default function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useLayoutStore()
  const pathname = usePathname()
 
  return (
    <aside
      className={`fixed left-0 top-12 h-[calc(110vh-4rem)] bg-[#082525] shadow-lg transition-all duration-300 ease-in-out z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header section */}
      <div className="p-4">
        <div className={`flex items-center justify-between bg-[#3E615F]/20 rounded-lg p-3 transition-all duration-300 ${
          isCollapsed ? 'hidden' : 'flex'
        }`}>
          <h2 className="text-white font-semibold text-lg">
            Tourism
          </h2>
          <button
            className="text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsCollapsed(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Show only menu button when collapsed */}
        {isCollapsed && (
          <button
            className="w-full flex justify-center text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsCollapsed(false)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        )}
      </div>
 
      {/* Navigation items */}
      <nav className="px-2 py-2 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative flex items-center text-white p-3 rounded-lg transition-all duration-200 group/item ${
                isActive
                  ? 'bg-[#846EDB]'
                  : 'hover:bg-[#846EDB]'
              } ${
                isCollapsed
                  ? 'justify-center w-12'
                  : ''
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? '' : 'w-full'}`}>
                <div className={`flex-shrink-0 ${isCollapsed ? '' : 'w-8'}`}>
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </div>
                {!isCollapsed && (
                  <span className="ml-3 truncate">
                    {item.name}
                  </span>
                )}
              </div>
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-[#082525] text-white rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}