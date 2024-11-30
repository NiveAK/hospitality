'use client'

import { Card } from '@/components/ui/card'
import { 
  AreaChart, Area, LineChart, Line, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts'
import ReactECharts from 'echarts-for-react'

// Mock data
const processingData = [
  { stage: 'Document Review', days: 5 },
  { stage: 'Initial Screen', days: 3 },
  { stage: 'Technical Test', days: 7 },
  { stage: 'Final Review', days: 4 },
  { stage: 'Approval', days: 2 },
]

const interviewData = [
  { month: 'Jan', days: 45 },
  { month: 'Feb', days: 38 },
  { month: 'Mar', days: 42 },
  { month: 'Apr', days: 35 },
  { month: 'May', days: 40 },
]

const visaData = [
  { stage: 'Document Submission', average: 4 },
  { stage: 'Embassy Processing', average: 5 },
  { stage: 'Security Check', average: 2},
  { stage: 'Final Decision', average: 5 },
]

const completionData = [
  { month: 'Month 1', completed: 0 },
  { month: 'Month 3', completed: 25 },
  { month: 'Month 6', completed: 55 },
  { month: 'Month 9', completed: 75 },
  { month: 'Month 12', completed: 100 },
]

const graduationData = [
  { month: 'Jan', count: 45, expected: 50 },
  { month: 'Feb', count: 52, expected: 48 },
  { month: 'Mar', count: 48, expected: 52 },
  { month: 'Apr', count: 55, expected: 50 },
  { month: 'May', count: 49, expected: 51 },
]

// ECharts options for Processing Steps
const processingOptions = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} days',
    backgroundColor: '#0D2B2B',
    borderColor: '#82D9BF',
    borderWidth: 1,
    padding: [4, 6],
    textStyle: {
      color: '#fff',
      fontSize: 10
    }
  },
  series: [{
    type: 'funnel',
    left: '10%',
    top: 20,
    bottom: 20,
    width: '80%',
    min: 0,
    max: Math.max(...processingData.map(d => d.days)),
    minSize: '0%',
    maxSize: '100%',
    sort: 'none',
    gap: 2,
    label: {
      show: true,
      position: 'inside',
      formatter: '{b}',
      fontSize: 10,
      fontWeight: 500,
      color: '#0D2B2B',
      textBorderColor: 'transparent'
    },
    itemStyle: {
      borderRadius: 4,
      borderColor: '#0D2B2B',
      borderWidth: 1
    },
    emphasis: {
      label: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    data: processingData.map((item, index) => ({
      value: item.days,
      name: item.stage,
      itemStyle: {
        color: [
          'rgba(130, 217, 191, 0.95)',
          'rgba(130, 217, 191, 0.85)',
          'rgba(130, 217, 191, 0.75)',
          'rgba(130, 217, 191, 0.65)',
          'rgba(130, 217, 191, 0.55)'
        ][index]
      }
    }))
  }]
}

// ECharts options for Visa Processing
const visaOptions = {
  backgroundColor: 'transparent',
  tooltip: {
    formatter: '{b}: {c} days',
    backgroundColor: '#0D2B2B',
    borderColor: '#82D9BF',
    borderWidth: 1,
    padding: [4, 6],
    textStyle: {
      color: '#fff',
      fontSize: 10
    }
  },
  grid: {
    top: '5%',
    bottom: '5%',
    containLabel: true
  },
  series: visaData.map((item, index) => ({
    type: 'gauge',
    center: [`${13 + (index * 25)}%`, '45%'],  
    radius: '32%',
    startAngle: 200,
    endAngle: -20,
    min: 0,
    max: Math.max(...visaData.map(d => d.average)) + 5,
    progress: {
      show: true,
      width: 12,
      itemStyle: {
        color: [
          'rgba(130, 217, 191, 0.95)',
          'rgba(130, 217, 191, 0.9)',
          'rgba(130, 217, 191, 0.85)',
          'rgba(130, 217, 191, 0.8)'
        ][index]
      }
    },
    pointer: {
      show: false
    },
    axisLine: {
      lineStyle: {
        width: 12,
        color: [[1, 'rgba(130, 217, 191, 0.1)']]
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    title: {
      show: true,
      fontSize: 11,
      fontWeight: 500,
      color: '#82D9BF',
      offsetCenter: [0, '60%'],  
      formatter: function() {
        return item.stage.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join('\n');
      }
    },
    detail: {
      show: true,
      width: 40,
      height: 16,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#A5F3E3',
      formatter: '{value}d',
      offsetCenter: [0, '-10%'],
      valueAnimation: true,
      backgroundColor: 'transparent',  
      padding: [2, 4],
      borderWidth: 0  
    },
    data: [{
      value: item.average,
      name: item.stage
    }]
  }))
}

export default function Timeline() {
  return (
    <div className="p-6 bg-[#103535] rounded-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">Timeline & Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#0D2B2B] border-2 border-[#82D9BF] shadow-lg">
          <h3 className="text-xl font-medium text-[#82D9BF] mb-2">Processing Journey Flow</h3>
          <p className="text-sm text-gray-300 mb-4">Step-by-step processing timeline</p>
          <div style={{ height: '250px' }}>
            <ReactECharts 
              option={processingOptions}
              style={{ height: '100%' }}
              theme="dark"
            />
          </div>
        </Card>

        <Card className="p-6 bg-[#0D2B2B] border-2 border-[#82D9BF] shadow-lg">
          <h3 className="text-xl font-medium text-[#82D9BF] mb-2">Interview Success Timeline</h3>
          <p className="text-sm text-gray-300 mb-4">Monthly trend of interview to placement</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={interviewData}>
              <XAxis dataKey="month" stroke="#82D9BF" />
              <YAxis stroke="#82D9BF" />
              <Tooltip contentStyle={{ background: '#0D2B2B', border: '1px solid #82D9BF', borderRadius: '4px' }} />
              <Line 
                type="monotone" 
                dataKey="days" 
                stroke="#A5F3E3" 
                strokeWidth={2}
                dot={{ fill: '#82D9BF', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-[#0D2B2B] border-2 border-[#82D9BF] shadow-lg">
          <h3 className="text-xl font-medium text-[#82D9BF] mb-2">Visa Stage Progress</h3>
          <p className="text-sm text-gray-300 mb-4">Current status of each visa processing phase</p>
          <div style={{ height: '220px' }}>
            <ReactECharts 
              option={visaOptions}
              style={{ height: '100%' }}
              theme="dark"
            />
          </div>
        </Card>

        <Card className="p-6 bg-[#0D2B2B] border-2 border-[#82D9BF] shadow-lg">
          <h3 className="text-xl font-medium text-[#82D9BF] mb-2">Program Completion Progress</h3>
          <p className="text-sm text-gray-300 mb-4">Monthly completion percentage</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={completionData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82D9BF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82D9BF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#82D9BF" />
              <YAxis stroke="#82D9BF" />
              <Tooltip contentStyle={{ background: '#0D2B2B', border: '1px solid #82D9BF', borderRadius: '4px' }} />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stroke="#A5F3E3" 
                fill="url(#colorCompleted)"
                name="Completion %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-[#0D2B2B] border-2 border-[#82D9BF] shadow-lg md:col-span-2">
          <h3 className="text-xl font-medium text-[#82D9BF] mb-2">Graduation Achievement Tracking</h3>
          <p className="text-sm text-gray-300 mb-4">Actual vs Expected Graduates</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={graduationData}>
              <XAxis dataKey="month" stroke="#82D9BF" />
              <YAxis stroke="#82D9BF" />
              <Tooltip contentStyle={{ background: '#0D2B2B', border: '1px solid #82D9BF', borderRadius: '4px' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                name="Actual Graduates"
                stroke="#A5F3E3" 
                strokeWidth={2}
                dot={{ fill: '#82D9BF', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expected" 
                name="Target Goal"
                stroke="#82D9BF" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#82D9BF', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
