'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// TypeScript interfaces
interface ProgramData {
  program: string
  count: number
  percentage: number
  color: string
}

interface GPAData {
  range: string
  label: string
  count: number
  percentage: number
}

interface StatusData {
  status: string
  value: number
  percentage: number
}

interface RegistrationData {
  type: string
  value: number
  color: string
}

// Program distribution data
const programDistribution: ProgramData[] = [
  {
    program: 'Tourism',
    count: 537,
    percentage: 73.6,
    color: '#3B82F6' // Bright blue
  },
  {
    program: 'Tourism and Events Management',
    count: 98,
    percentage: 13.4,
    color: '#10B981' // Emerald green
  },
  {
    program: 'Others',
    count: 42,
    percentage: 5.8,
    color: '#F59E0B' // Amber
  },
  {
    program: 'Food & Beverage',
    count: 28,
    percentage: 3.8,
    color: '#EC4899' // Pink
  },
  {
    program: 'Kitchen',
    count: 13,
    percentage: 1.8,
    color: '#8B5CF6' // Purple
  },
  {
    program: 'Front Office',
    count: 12,
    percentage: 1.6,
    color: '#6366F1' // Indigo
  }
].sort((a, b) => b.count - a.count); // Sort by count in descending order

// GPA data showing distribution across GPA ranges
const gpaData: GPAData[] = [
  { range: '3.5 - 4.0', label: 'Excellent', count: 4, percentage: 10.8 },
  { range: '3.0 - 3.49', label: 'Very Good', count: 8, percentage: 21.6 },
  { range: '2.5 - 2.99', label: 'Good', count: 19, percentage: 51.4 },
  { range: '2.0 - 2.49', label: 'Satisfactory', count: 6, percentage: 16.2 }
]

// Academic status distribution
const statusData: StatusData[] = [
  { status: 'يعمل / Working', value: 595, percentage: 81.5 },
  { status: 'طالب / Student', value: 98, percentage: 13.4 },
  { status: 'خريج / Graduate', value: 37, percentage: 5.1 }
]

// Registration type distribution
const registrationData: RegistrationData[] = [
  { 
    type: 'نموذج تسجيل برنامج الإعارة / Secondment Program Registration Form', 
    value: 500,
    color: '#4FD1C5'  // Light green color
  },
  { 
    type: 'نموذج آخر / Other Form', 
    value: 230,
    color: '#846EDB'  // Light green color
  },
]

const CHART_COLORS = {
  primary: '#00E676',    // Bright Green
  secondary: '#2979FF',  // Bright Blue
  tertiary: '#FF3D00',   // Bright Red
  quaternary: '#AA00FF', // Bright Purple
  quinary: '#FFAB00',    // Bright Orange
};

// Common tooltip style
const tooltipStyle = {
  background: '#7E3AF2',
  border: 'none',
  borderRadius: '8px',
  padding: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: '#ffffff'
};

export default function Program() {
  return (
    <div className="p-6 bg-[#0A2F2F] rounded-lg">
      <h2 className="text-2xl text-white mb-4">Program Performance</h2>
      <div className="flex flex-col space-y-4 overflow-y-auto p-4">
        {/* Overall Performance Metrics */}
        <div className="grid grid-cols-4 gap-4">
          {/* Program Participants Card */}
          <Card className="p-4 bg-[#4C1D95] border-[#6D988B] h-[130px]">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Total Participants</span>
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-white mt-2">730</span>
              <span className="text-sm text-gray-300 mt-1">Program Distribution</span>
            </div>
          </Card>

          {/* GPA Range Card */}
          <Card className="p-4 bg-[#065F46] border-[#6D988B] h-[130px]">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-center">
                <span className="text-gray-200">GPA Range</span>
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-white mt-2">2-4</span>
              <span className="text-sm text-gray-300 mt-1">Academic Performance</span>
            </div>
          </Card>

          {/* Status Card */}
          <Card className="p-4 bg-[#1E40AF] border-[#6D988B] h-[130px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Current Status</span>
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-white">Working</span>
                  <span className="text-xl font-bold text-white">595</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-white">Student</span>
                  <span className="text-xl font-bold text-white">98</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-white">Graduate</span>
                  <span className="text-xl font-bold text-white">37</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Registration Card */}
          <Card className="p-4 bg-[#7E22CE] border-[#6D988B] h-[130px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Registration Forms</span>
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">Secondment</span>
                  <span className="text-2xl font-bold text-white">500</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white">Other</span>
                  <span className="text-2xl font-bold text-white">230</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Program Distribution Card */}
        <Card className="p-3 bg-[#082525] border-[#6D988B]">
          <h3 className="text-lg text-white mb-3">Program-wise Distribution</h3>
          <div className="flex flex-col space-y-3 px-3">
            {programDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                {/* Percentage Circle */}
                <div className="relative w-14 h-14 flex-shrink-0">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center border-2 border-white/20"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-white font-bold text-sm">
                      {item.percentage}%
                    </span>
                  </div>
                  {index < programDistribution.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 w-0.5 h-3 bg-gray-600 transform -translate-x-1/2" />
                  )}
                </div>
                
                {/* Program Bar */}
                <div className="flex-grow">
                  <div 
                    className="p-2 rounded transition-all duration-300 hover:opacity-90"
                    style={{ 
                      backgroundColor: item.color,
                      width: item.program === 'Tourism' ? '500px' :
                             item.program === 'Tourism and Events Management' ? '250px' :
                             item.program === 'Others' ? '150px' :
                             item.program === 'Food & Beverage' ? '125px' :
                             item.program === 'Kitchen' ? '100px' :
                             '90px', // Front Office
                      maxWidth: '100%'
                    }}
                  >
                    <div className="flex flex-col whitespace-nowrap">
                      <span className="text-white font-semibold text-sm">{item.program}</span>
                      <span className="text-white/90 text-xs mt-0.5">{item.count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* GPA Chart */}
        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-xl text-white mb-4">GPA Distribution of Graduates</h3>
          <div className="grid grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={gpaData} barSize={40}>
                <XAxis 
                  dataKey="range" 
                  stroke="#fff"
                  tick={{ fill: '#fff', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#fff"
                  domain={[0, 20]}
                  ticks={[0, 5, 10, 15, 20]}
                  tick={{ fill: '#fff' }}
                />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(value) => [`GPA Count: ${value}`]}
                />
                <Bar dataKey="count">
                  {gpaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-col space-y-3 p-3 bg-[#0A2F2F] rounded-lg">
              {gpaData.map((item, index) => (
                <div key={index} className="flex flex-col space-y-2 p-3 bg-[#082525] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length] }}
                      />
                      <span className="text-white text-lg font-medium">{item.range} ({item.label})</span>
                    </div>
                    <span className="text-white text-lg font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#0A2F2F] rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]
                      }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{item.percentage}% of graduates</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Academic Status Distribution */}
        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-xl text-white mb-4">Academic Status Distribution</h3>
          <div className="grid grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  nameKey="status"
                  label={({ status, percent }) => `${status} (${(percent * 100).toFixed(0)}%)`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(value: number, name: string) => {
                    const total = statusData.reduce((acc, curr) => acc + curr.value, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return [
                      `Count: ${value}`,
                      `${name}: ${percentage}%`
                    ];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col space-y-3 p-3 bg-[#0A2F2F] rounded-lg">
              {statusData.map((item, index) => (
                <div key={index} className="flex flex-col space-y-2 p-3 bg-[#082525] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length] }}
                      />
                      <span className="text-white text-lg font-medium">{item.status}</span>
                    </div>
                    <span className="text-white text-lg font-medium">{item.value}</span>
                  </div>
                  <div className="w-full bg-[#0A2F2F] rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(item.value / statusData.reduce((acc, curr) => acc + curr.value, 0)) * 100}%`,
                        backgroundColor: Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]
                      }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{((item.value / statusData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}% of total</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Registration Type Distribution */}
        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-xl text-white mb-4">Registration Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={registrationData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 600]}
                  ticks={[0, 150, 300, 450, 600]}
                  stroke="#fff"
                />
                <YAxis 
                  type="category" 
                  dataKey="type" 
                  width={300}
                  stroke="#fff"
                />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value} Registrations`]}
                />
                <Bar 
                  dataKey="value" 
                  name="Registration Count"
                  fill="#81C784"
                  radius={[0, 4, 4, 0]}
                >
                  {registrationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
