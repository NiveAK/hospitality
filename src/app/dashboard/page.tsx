'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import Overview from './tabs/Overview'
import StudentAnalysis from './tabs/StudentAnalysis'
import Regional from './tabs/Regional'
import Program from './tabs/Program'
import Experience from './tabs/Experience'
import Timeline from './tabs/Timeline'
import Management from './tabs/Management'
import Success from './tabs/Success'

export default function KPIDashboard() {
  const [activeTab, setActiveTab] = useState('Overview Dashboard')

  const tabs = [
    'Overview Dashboard',
    'Student Analytics',
    'Regional & Location Analytics',
    'Program Performance',
    'Experience & Skills',
    'Timeline & Progress',
    'Management & Supervision',
    'Hotel Breakdown',
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview Dashboard':
        return <Overview />
      case 'Student Analytics':
        return <StudentAnalysis />
      case 'Regional & Location Analytics':
        return <Regional />
      case 'Program Performance':
        return <Program />
      case 'Experience & Skills':
        return <Experience />
      case 'Timeline & Progress':
        return <Timeline />
      case 'Management & Supervision':
        return <Management />
      case 'Hotel Breakdown':
        return <Success />
      default:
        return null
    }
  }

  return (
    <>
      {/* <div className="p-6">
          <h1 className="text-2xl font-semibold text-white mb-6">Key Performance Indicators</h1> 
      </div> */}
      {/* Tabs Section */}
      <Card className="bg-[#0A2F2F] p-1 border-[#6D988B] max-w-8xl mx-auto">
        <div className="flex gap-1 overflow-x-auto">  
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-lg text-white transition-colors ${
                activeTab === tab 
                  ? 'bg-[#82D9BF]'
                  : 'hover:bg-[#846EDB]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Dashboard Content */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </>
  )
}