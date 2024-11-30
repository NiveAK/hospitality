'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts'
import rawExperienceData from '../mockdata/experience.json'
import overviewData from '../mockdata/overview.json'

interface ExperienceData {
  "Acedamic status": string
  English_Level: string | null
  Area_Interest: string | null
  Years_Experience: number
}

interface OverviewData {
  "Acedamic status": string
  Program: string
  Current_Position: string
  Gender: string
  Age: number
  city: string
}

const experienceSheet = rawExperienceData[0]['Experience & Skills_Sheet1'] as ExperienceData[]
const overviewSheet = overviewData[0]['overview Dashboard_Sheet1'] as OverviewData[]

// Process years of experience data
const processExperienceData = () => {
  const experienceCounts = {
    '0-3': 0,
    '4-6': 0,
    '7-9': 0,
    '10-12': 0,
    '13+': 0
  }

  experienceSheet.forEach((item) => {
    const years = item.Years_Experience || 0
    if (years <= 3) experienceCounts['0-3']++
    else if (years <= 6) experienceCounts['4-6']++
    else if (years <= 9) experienceCounts['7-9']++
    else if (years <= 12) experienceCounts['10-12']++
    else experienceCounts['13+']++
  })

  return Object.entries(experienceCounts).map(([years, count]) => ({
    years,
    count
  }))
}

// Process academic status data
const processAcademicData = () => {
  const statusCounts: { [key: string]: number } = {}
  experienceSheet.forEach((item) => {
    if (item['Acedamic status']) {
      statusCounts[item['Acedamic status']] = (statusCounts[item['Acedamic status']] || 0) + 1
    }
  })

  return Object.entries(statusCounts).map(([status, value]) => ({
    status,
    value
  }))
}

// Process area of interest data
const processInterestData = () => {
  const interestCounts: { [key: string]: number } = {}
  experienceSheet.forEach((item) => {
    if (item.Area_Interest) {
      interestCounts[item.Area_Interest] = (interestCounts[item.Area_Interest] || 0) + 1
    }
  })

  return Object.entries(interestCounts).map(([interest, value]) => ({
    interest,
    value
  }))
}

// Process English level data
const processEnglishLevelData = () => {
  const levelCounts: { [key: string]: number } = {}
  experienceSheet.forEach((item) => {
    const level = item.English_Level || 'Not Specified'
    levelCounts[level] = (levelCounts[level] || 0) + 1
  })

  return Object.entries(levelCounts).map(([level, value]) => ({
    level,
    value,
    customLabel: `${value} (${((value / experienceSheet.length) * 100).toFixed(0)}%)`
  }))
}

// Process positions by sector
const processPositionsBySector = () => {
  const sectors = {
    'Front Office | مكتب الإستقبال': [
      'استقبال', 'استقبل', 'كاتب استقبال', 'مشرف استقبال', 'guest relation',
      'front office', 'front desk', 'receptionist', 'كونسيرج', 'concierge',
      'مكاتب امامية', 'موظف استقبال', 'front of the house'
    ],
    'Food & Beverage | الأغذية والمشروبات': [
      'شيف', 'chef', 'waiter', 'captain', 'fnb', 'f&b', 'restaurant', 'مطعم',
      'demi chef', 'order taker', 'كاشير', 'مساعد مدير مطعم', 'captain waiter'
    ],
    'Management | الإدارة': [
      'مدير', 'manager', 'supervisor', 'مشرف', 'team leader', 'مناوب',
      'نائب المدير', 'مراقب عام', 'night manager', 'ممثل المالك'
    ],
    'Reservations & Sales | الحجوزات والمبيعات': [
      'مبيعات', 'sales', 'حجوزات', 'reservation', 'موظف حجوزات',
      'حجوزات شركات', 'business center'
    ],
    'Rooms & Housekeeping | الغرف والتدبير المنزلي': [
      'housekeeping', 'غرف', 'room', 'قطاع الغرف', 'room controller'
    ],
    'Events & Meetings | الفعاليات والمؤتمرات': [
      'events', 'فعاليات', 'مؤتمرات', 'conference', 'meeting', 'c&e'
    ],
    'Support Services | الخدمات المساندة': [
      'hr', 'safety', 'security', 'engineering', 'electrician', 'purchasing',
      'coordinator'
    ],
    'Others | أخرى': []
  }

  const sectorCounts: { [key: string]: number } = {}
  Object.keys(sectors).forEach(sector => {
    sectorCounts[sector] = 0
  })

  overviewSheet.forEach((item) => {
    if (item.Current_Position === 'خريج' || item.Current_Position === 'student') return

    const position = item.Current_Position.toLowerCase()
    let matched = false

    for (const [sector, keywords] of Object.entries(sectors)) {
      if (keywords.some(keyword => position.includes(keyword.toLowerCase()))) {
        sectorCounts[sector]++
        matched = true
        break
      }
    }

    if (!matched) {
      sectorCounts['Others | أخرى']++
    }
  })

  return Object.entries(sectorCounts)
    .filter(entry => entry[1] > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([sector, count]) => ({
      sector,
      count
    }))
}

const experienceData = processExperienceData()
const academicData = processAcademicData()
const interestData = processInterestData()
const englishLevelData = processEnglishLevelData()
const positionsBySector = processPositionsBySector()

const COLORS = ['#82D9BF', '#846EDB', '#4FD1C5', '#6D988B']


export default function Experience() {
  return (
    <div className="p-6 bg-[#0A2F2F] rounded-lg">
      <h2 className="text-xl text-white mb-4">Experience & Skills | الخبرة والمهارات</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-white mb-4 pb-2 border-b border-[#6D988B]">Years of Experience Distribution | توزيع سنوات الخبرة</h3>
          <ResponsiveContainer width="95%" height={250}>
            <BarChart data={experienceData}>
              <XAxis dataKey="years" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                cursor={{ fill: 'rgba(130, 217, 191, 0.1)' }}
                contentStyle={{ 
                  background: '#ffffff',
                  border: '1px solid #6D988B',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '14px',
                  color: '#082525'
                }}
                formatter={(value) => `${value}`}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="count" fill="#82D9BF">
                <LabelList dataKey="count" position="top" fill="#fff" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-[#082525] border-[#6D988B]">
          <h3 className="text-white  mb-4 pb-2 border-b border-[#6D988B]">Academic Status Distribution | توزيع الوضع الأكاديمي</h3>
          <div className="flex flex-col gap-5 py-3">
            {academicData.map((entry, index) => {
              const percentage = (entry.value / academicData.reduce((acc, curr) => acc + curr.value, 0)) * 100;
              const iconCount = Math.ceil(percentage / 10); // One icon per 10%
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-28">
                    <div className="text-white text-base font-medium">{entry.status}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{percentage.toFixed(0)}% of total</div>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 flex items-center justify-center transition-opacity duration-200"
                        style={{
                          opacity: i < iconCount ? 1 : 0.35
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-5 h-5"
                          style={{ fill: COLORS[index % COLORS.length] }}
                        >
                          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="w-20 text-right">
                    <div className="text-white text-xl font-bold">{entry.value}</div>
                    <div className="text-gray-400 text-xs">students</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-3 border-t border-[#6D988B] flex justify-between items-center">
            <div className="text-gray-400 text-sm">Total Students</div>
            <div className="text-white text-xl font-bold">
              {academicData.reduce((acc, curr) => acc + curr.value, 0)}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-white mb-4 pb-2 border-b border-[#6D988B]">Areas of Interest | مجالات الإهتمام</h3>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="95%" height={200}>
              <PieChart>
                <Pie
                  data={interestData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  cornerRadius={6}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="interest"
                >
                  {interestData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="47%"
                  textAnchor="middle"
                  className="fill-white text-2xl font-bold"
                >
                  {interestData.reduce((acc, curr) => acc + curr.value, 0)}
                </text>
                <text
                  x="50%"
                  y="57%"
                  textAnchor="middle"
                  className="fill-gray-400 text-sm"
                >
                  Total Students
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4">
              {interestData.map((entry, index) => {
                const percentage = (entry.value / interestData.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(0);
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-white text-sm">{entry.interest}</span>
                    </div>
                    <div className="text-gray-400 text-xs">{percentage}% ({entry.value} students)</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#082525] border-[#6D988B]">
          <h3 className="text-white mb-4 pb-2 border-b border-[#6D988B]">English Proficiency Levels | مستويات الكفاءة في اللغة الإنجليزية</h3>
          <div className="flex justify-center items-center h-[250px]">
            <ResponsiveContainer width="95%" height="100%">
              <BarChart
                data={englishLevelData}
                layout="vertical"
                margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
              >
                <XAxis type="number" stroke="#fff" />
                <YAxis 
                  type="category" 
                  dataKey="level" 
                  stroke="#fff"
                  width={100}
                  tick={{ fill: '#fff', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(130, 217, 191, 0.1)' }}
                  contentStyle={{ 
                    background: '#ffffff',
                    border: '1px solid #6D988B',
                    borderRadius: '4px',
                    padding: '4px 6px',
                    fontSize: '14px',
                    color: '#082525'
                  }}
                  formatter={(value) => `${value}`}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar 
                  dataKey="value" 
                  fill="#82D9BF"
                >
                  <LabelList 
                    dataKey="customLabel" 
                    position="right" 
                    fill="#fff"
                    fontSize={12}
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card className="p-4 bg-[#082525] border-[#6D988B] w-full">
          <h3 className="text-white mb-4 pb-2 border-b border-[#6D988B]">Positions by Sector | المناصب حسب القطاع</h3>
          <div className="flex flex-row gap-4">
            <div className="w-3/4 flex flex-col items-center">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={positionsBySector}
                    cx="35%"
                    cy="60%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="sector"
                    label={({ name, percent }) => {
                      const [english, arabic] = typeof name === 'string' ? name.split('|').map(s => s.trim()) : [String(name), ''];
                      return `${english}\n${arabic}\n(${(percent * 100).toFixed(0)}%)`;
                    }}
                  >
                    {positionsBySector.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      background: '#ffffff',
                      border: '1px solid #6D988B',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '14px',
                      color: '#082525'
                    }}
                    formatter={(value, name) => {
                      const [english, arabic] = typeof name === 'string' ? name.split('|').map(s => s.trim()) : [String(name), ''];
                      return [`${value} participants`, `${english} | ${arabic}`];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/4 pr-4">
              <div className="text-white space-y-4 mt-12">
                {positionsBySector.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm whitespace-nowrap">{item.sector.split('|')[0]}</span>
                      <span className="text-sm ml-auto whitespace-nowrap">{item.count} participants</span>
                    </div>
                    <div className="mt-1 bg-gray-700 h-2 rounded-full">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${(item.count / positionsBySector.reduce((acc, curr) => acc + curr.count, 0) * 100)}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }} 
                      />
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {(item.count / positionsBySector.reduce((acc, curr) => acc + curr.count, 0) * 100).toFixed(1)}% of total participants
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}