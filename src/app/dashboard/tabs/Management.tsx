'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import rawData from '../mockdata/management.json'

const managementData = rawData[0]["Management & Supervision_Sheet2"] || []

// Colors for charts
const COLORS = ['#82D9BF', '#846EDB', '#4FD1C5', '#6D988B', '#A3E4D7', '#BB8FCE']

// Add these interfaces
interface ManagerData {
  Manager_Position: string;
  Manager_Email: string;
  // Add other fields from your data as needed
}

interface ChartDataItem {
  name: string;
  value: number;
}

// Process data for position distribution pie chart
const positionData = managementData.reduce<ChartDataItem[]>((acc, curr: ManagerData) => {
  const existingPos = acc.find(item => item.name === curr.Manager_Position)
  if (existingPos) {
    existingPos.value++
  } else {
    acc.push({ name: curr.Manager_Position, value: 1 })
  }
  return acc
}, [])

// Process data for email domain distribution bar chart
const domainData = managementData.reduce<ChartDataItem[]>((acc, curr) => {
  const domain = curr.Manager_Email.split('@')[1]
  const existingDomain = acc.find(item => item.name === domain)
  if (existingDomain) {
    existingDomain.value++
  } else {
    acc.push({ name: domain, value: 1 })
  }
  return acc
}, []).sort((a, b) => b.value - a.value).slice(0, 8)

export default function Management() {
  return (
    <div className="p-6 bg-[#0A2F2F] rounded-lg">
      <h2 className="text-xl text-white mb-4">Management & Supervision</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-white mb-2">Position Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={positionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {positionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#82D9BF', border: '1px solid #6D988B', color: '#fff' }}
                formatter={(value: number) => [`${value} managers`, '']}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-white mb-2">Email Domain Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="name" 
                stroke="#fff"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: '#fff' }}
              />
              <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
              <Tooltip
                contentStyle={{ background: '#082525', border: '1px solid #6D988B', color: '#fff' }}
                formatter={(value: number) => [`${value} managers`, '']}
              />
              <Bar dataKey="value" fill="#846EDB">
                {domainData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
