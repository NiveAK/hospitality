'use client'
 
import { useLayoutStore } from '@/store/layout-store'
import Header from './Header'
import Sidebar from './Sidebar'
 
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useLayoutStore()
 
  return (
    <div className="min-h-screen bg-[#0A2F2F]">
      {/* Fixed Header */}
      <Header />
     
      {/* Main content wrapper */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar />
       
        {/* Main content area */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? 'ml-16' : 'ml-64'
          } fixed left-0 top-0 p-3 relative z-10`}
        >
          <div className="bg-[] rounded-lg p-4 min-h-[calc(100vh-7rem)]">
            {children}
          </div>
        </main>
      </div>
 
      {/* Overlay when sidebar is open on mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => useLayoutStore.setState({ isCollapsed: true })}
        />
      )}
    </div>
  )
}