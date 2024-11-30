'use client'

import { Card } from '@/components/ui/card'
import { useState, Fragment } from 'react'

const hotelData = [
  { name: 'Al Andalus Mall Hotel', area: { en: 'Jeddah', ar: 'جدة' }, participants: 7 },
  { name: 'Madinah Hilton', area: { en: 'Medina (Al Madinah)', ar: 'المدينة المنورة' }, participants: 47 },
  { name: 'The Hotel Galleria - Curio Collection by Hilton', area: { en: 'Jeddah', ar: 'جدة' }, participants: 3 },
  { name: 'Hilton Al Khobar King Fahd Causeway', area: { en: 'Al Khobar', ar: 'الخبر' }, participants: 9 },
  { name: 'Hilton Riyadh Hotel & Residences', area: { en: 'Riyadh', ar: 'الرياض' }, participants: 25 },
  { name: 'Hilton double tree Almuroj', area: { en: 'Riyadh', ar: 'الرياض' }, participants: 4 },
]

const departmentData = {
  'Al Andalus Mall Hotel': ['Human Resources', 'Marketing & Sales', 'FB Culinary', 'Front Office'],
  'Madinah Hilton': [
    'Health and Safety', 'Housekeeping', 'Reservation', 'Food & Beverage',
    'Marketing', 'Purchasing', 'Finance', 'IT', 'Sales', 'Kitchen', 'QA'
  ],
  'The Hotel Galleria - Curio Collection by Hilton': ['Kitchen', 'IT', 'Sales & Marketing'],
  'Hilton Al Khobar King Fahd Causeway': [
    'Engineering', 'Housekeeping', 'Food & Beverage', 'Commerical', 'Front Office'
  ],
  'Hilton Riyadh Hotel & Residences': [
    'Food & Beverage', 'GC&E', 'C&E', 'Purchasing', 'Front Office', 'Kitchen'
  ],
  'Hilton double tree Almuroj': ['Food & Beverage', 'Finance', 'Purchasing', 'Engineering']
}

const recruitmentData = {
  'Al Andalus Mall Hotel': ["Dhuʻl-H-24", "Muh-25", "Saf-25"],
  'Madinah Hilton': ["Dhuʻl-H-24", "Muh-25", "Saf-25", "Jum. I-25", "Jum. II-25", "Raj-25"],
  'The Hotel Galleria - Curio Collection by Hilton': ["Dhuʻl-H-24", "Muh-25"],
  'Hilton Al Khobar King Fahd Causeway': ["Dhuʻl-H-24", "Muh-25", "Saf-25", "Jum. I-25", "Jum. II-25"],
  'Hilton Riyadh Hotel & Residences': ["Dhuʻl-H-24", "Muh-25", "Saf-25", "Jum. I-25", "Jum. II-25"],
  'Hilton double tree Almuroj': ["Dhuʻl-H-24"]
}

const months = [
  "Dhuʻl-H-24",
  "Muh-25",
  "Saf-25",
  "Jum. I-25",
  "Jum. II-25",
  "Raj-25"
]

// Calculate total participants for percentage calculation
const totalParticipants = hotelData.reduce((sum, hotel) => sum + hotel.participants, 0)

export default function Success() {
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null)

  return (
    <div className="p-6 bg-[#0A2F2F] rounded-lg space-y-8">
      {/* Hotel Distribution Section */}
      <div>
        <h2 className="text-3xl font-semibold text-[#4FD1C5] mb-2">Hotel Distribution</h2>
        <p className="text-[#81E6D9] mb-6">Overview of participant distribution across partner hotels</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotelData.map((hotel) => {
            const percentage = Math.round((hotel.participants / totalParticipants) * 100)
            const borderColor = 'border-[#FFB800]'
            
            return (
              <Card 
                key={hotel.name}
                className={`p-6 bg-[#082525] border-l-4 ${borderColor} hover:bg-[#0A2F2F] transition-colors`}
              >
                <h3 className="text-xl font-semibold text-[#4FD1C5] mb-1">{hotel.name}</h3>
                <p className="text-[#81E6D9] text-sm mb-2 flex items-center gap-2">
                  <span>{hotel.area.en}</span>
                  <span className="text-[#2C7A7B]">|</span>
                  <span className="font-arabic">{hotel.area.ar}</span>
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[#4FD1C5]">{hotel.participants} Participants</p>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-[#2C7A7B] flex items-center justify-center">
                      <span className="text-xl font-bold text-[#4FD1C5]">{percentage}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Departments Section */}
      <div>
        <h2 className="text-3xl font-semibold text-[#4FD1C5] mb-2">Hotel Departments</h2>
        <p className="text-[#81E6D9] mb-6">Departments available in each partner hotel</p>

        <div className="grid grid-cols-1 gap-4">
          {Object.entries(departmentData).map(([hotelName, departments]) => (
            <Card 
              key={hotelName}
              className="bg-[#082525] overflow-hidden border border-[#FFB800]/20"
            >
              <div 
                className="p-4 bg-[#0A3535] cursor-pointer flex justify-between items-center border-l-4 border-[#FFB800]"
                onClick={() => setExpandedHotel(expandedHotel === hotelName ? null : hotelName)}
              >
                <h3 className="text-xl font-semibold text-[#4FD1C5]">{hotelName}</h3>
                <span className="text-[#4FD1C5]">
                  {expandedHotel === hotelName ? '▼' : '▶'}
                </span>
              </div>
              
              {expandedHotel === hotelName && (
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {departments.map((dept) => (
                      <div 
                        key={dept}
                        className="bg-[#0A2F2F] p-3 rounded-lg border border-[#FFB800]/10 hover:border-[#FFB800]/30 transition-colors"
                      >
                        <p className="text-[#81E6D9] text-sm">{dept}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Recruitment Timeline Section */}
      <div>
        <h2 className="text-3xl font-semibold text-[#4FD1C5] mb-2">Recruitment Timeline</h2>
        <p className="text-[#81E6D9] mb-6">Monthly trainee recruitment schedule across hotels</p>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[250px_repeat(6,1fr)] bg-[#082525] rounded-lg p-4 gap-2 border border-[#FFB800]/20">
              {/* Header */}
              <div className="text-[#4FD1C5] font-semibold border-b border-[#FFB800]/20 pb-2">Hotel</div>
              {months.map(month => (
                <div key={month} className="text-[#4FD1C5] font-semibold text-center border-b border-[#FFB800]/20 pb-2">{month}</div>
              ))}

              {/* Timeline rows */}
              {Object.entries(recruitmentData).map(([hotel, hotelMonths]) => (
                <Fragment key={hotel}>
                  <div className="text-[#81E6D9] py-3 border-l-4 border-[#FFB800] pl-2">{hotel}</div>
                  {months.map(month => (
                    <div key={`${hotel}-${month}`} className="flex items-center justify-center">
                      {hotelMonths.includes(month) ? (
                        <div className="w-6 h-6 rounded-full bg-[#FFB800] flex items-center justify-center">
                          <span className="text-black text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#0A2F2F] border border-[#FFB800]/10" />
                      )}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
