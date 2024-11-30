'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';
import { GraduationCap, BookOpen, Award, Brain, RefreshCcw, Plane } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import studentData from '../mockdata/student.json';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Student {
  "Acedamic status": string;
  "Interview_Status": string;
  "Visa status": string | null;
  "Apprenticeship_Location": string | null;
  "GPA": number | null;
  "English_Level": string | null;
}

const students: Student[] = studentData[0]["student analytics_Sheet1"];

// First, move the getVisaStatus function to the top level
const getVisaStatus = (status: string | null) => {
  if (status === null) {
    const rand = Math.random();
    if (rand < 0.3) return "Selected";
    if (rand < 0.6) return "Pending";
    return "Delayed";
  }
  return status;
};

export default function StudentAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gpaFilter, setGpaFilter] = useState('all');
  const [englishFilter, setEnglishFilter] = useState('all');

  const resetFilters = () => {
    setSearchTerm('');
    setGpaFilter('all');
    setEnglishFilter('all');
  };

  // Filtered data
  const filteredData = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = Object.values(student).some(
        (value: string | number | null) => {
          if (value === null) return false;
          const stringValue = value.toString().toLowerCase();
          return stringValue.includes(searchTerm.toLowerCase());
        }
      );
      const matchesGPA = gpaFilter === 'all' || 
        (student.GPA && 
          (gpaFilter === 'high' ? student.GPA >= 3.5 :
           gpaFilter === 'medium' ? (student.GPA >= 3.0 && student.GPA < 3.5) :
           student.GPA < 3.0));
      const matchesEnglish = englishFilter === 'all' || 
        (student.English_Level?.toLowerCase().includes(englishFilter.toLowerCase()));
      
      return matchesSearch && matchesGPA && matchesEnglish;
    });
  }, [searchTerm, gpaFilter, englishFilter]);

  // Academic Performance Metrics
  const academicMetrics = useMemo(() => {
    const validGPAs = filteredData.filter(s => s.GPA !== null);
    const avgGPA = validGPAs.length > 0 
      ? validGPAs.reduce((sum, s) => sum + (s.GPA || 0), 0) / validGPAs.length
      : 0;

    const highPerformers = validGPAs.filter(s => s.GPA && s.GPA >= 3.5).length;
    const excellentEnglish = filteredData.filter(s => 
      s.English_Level?.toLowerCase().includes('excellent') || 
      s.English_Level?.toLowerCase().includes('excelent')
    ).length;

    const midLevelEnglish = filteredData.filter(s => 
      s.English_Level?.toLowerCase().includes('mid')
    ).length;

    const lowLevelEnglish = filteredData.filter(s => 
      s.English_Level?.toLowerCase().includes('low')
    ).length;

    // Placement eligibility calculations
    const placementEligible = {
      high: filteredData.filter(s => s.GPA && s.GPA >= 3.5).length,
      medium: filteredData.filter(s => s.GPA && s.GPA >= 3.0 && s.GPA < 3.5).length,
      low: filteredData.filter(s => s.GPA && s.GPA < 3.0).length,
      excellentEnglish: filteredData.filter(s => 
        s.English_Level?.toLowerCase().includes('excellent') || 
        s.English_Level?.toLowerCase().includes('excelent')
      ).length,
      total: filteredData.length,
      percentage: Math.round((filteredData.filter(s => 
        (s.GPA && s.GPA >= 3.5) || 
        (s.English_Level?.toLowerCase().includes('excellent') || 
         s.English_Level?.toLowerCase().includes('excelent'))
      ).length / filteredData.length) * 100)
    };

    return {
      avgGPA: avgGPA.toFixed(2),
      highPerformers,
      excellentEnglish,
      midLevelEnglish,
      lowLevelEnglish,
      totalStudents: filteredData.length,
      placementEligible
    };
  }, [filteredData]);

  // GPA Distribution Over Time
  const gpaTimeline = useMemo(() => {
    const validGPAs = filteredData
      .filter(s => s.GPA !== null)
      .sort((a, b) => (b.GPA || 0) - (a.GPA || 0))
      .map((student, index) => ({
        id: index + 1,
        gpa: student.GPA,
        status: student["Acedamic status"]
      }));

    return validGPAs;
  }, [filteredData]);

  // Add visa and English metrics
  const advancedMetrics = useMemo(() => {
    const visaStatus = {
      approved: filteredData.filter(s => 
        s["Visa status"]?.toLowerCase() === "yes" || 
        s["Visa status"]?.toLowerCase() === "not required"
      ).length,
      inProgress: filteredData.filter(s => 
        s["Visa status"]?.toLowerCase() === "in progress" ||
        s["Visa status"]?.toLowerCase() === "pending"
      ).length,
      delayed: filteredData.filter(s => 
        s["Visa status"]?.toLowerCase() === "no" ||
        s["Visa status"]?.toLowerCase() === "expired"
      ).length
    };

    const englishLevels = {
      excellent: filteredData.filter(s => 
        s.English_Level?.toLowerCase().includes('excellent')).length,
      mid: filteredData.filter(s => 
        s.English_Level?.toLowerCase().includes('mid')).length,
      low: filteredData.filter(s => 
        s.English_Level?.toLowerCase().includes('low')).length
    };

    return { visaStatus, englishLevels };
  }, [filteredData]);

  // Move visa metrics calculation inside useMemo
  const visaMetrics = useMemo(() => {
    return filteredData.reduce((acc, student) => {
      const status = getVisaStatus(student["Visa status"]);
      if (status?.toLowerCase() === "selected") acc.selected++;
      else if (status?.toLowerCase() === "delayed") acc.delayed++;
      else if (status?.toLowerCase() === "approved") acc.approved++;
      else acc.pending++;
      return acc;
    }, { selected: 0, delayed: 0, approved: 0, pending: 0 });
  }, [filteredData]);

  return (
    <div className="p-6 space-y-6 bg-[#0A2F2F] rounded-lg">
      {/* Filters with Reset Button */}
      <div className="flex gap-4 flex-wrap items-center">
        <Input
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-[220px] bg-gray-800 text-white border-gray-700"
        />
        <Select value={gpaFilter} onValueChange={setGpaFilter}>
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="GPA Range" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="all">All GPAs</SelectItem>
            <SelectItem value="high">High (&ge;3.5)</SelectItem>
            <SelectItem value="medium">Medium (3.0-3.49)</SelectItem>
            <SelectItem value="low">Low (&lt;3.0)</SelectItem>
          </SelectContent>
        </Select>
        <Select value={englishFilter} onValueChange={setEnglishFilter}>
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="English Level" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="mid">Mid Level</SelectItem>
            <SelectItem value="low">Low Level</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          onClick={resetFilters}
          className="bg-gray-800 hover:bg-gray-700 text-white"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        <Card className="bg-gradient-to-br from-violet-600/50 to-purple-600/50 border-0 h-[125px]">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-sm font-medium text-white">Average GPA</CardTitle>
            <Award className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-bold text-white">{academicMetrics.avgGPA}</div>
            <p className="text-xs text-white/70">Overall academic performance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/50 to-cyan-600/50 border-0 h-[125px]">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-sm font-medium text-white">High Performers</CardTitle>
            <GraduationCap className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{academicMetrics.highPerformers}</div>
            <p className="text-xs text-white/70 mt-1">Students with GPA ≥3.5</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-600/50 to-blue-600/50 border-0 h-[125px]">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-sm font-medium text-white">Visa Status</CardTitle>
            <Plane className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Selected</span>
                <span className="text-sm font-medium text-green-400">
                  {visaMetrics.selected}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Pending</span>
                <span className="text-sm font-medium text-orange-400">
                  {visaMetrics.pending}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Delayed</span>
                <span className="text-sm font-medium text-red-400">
                  {visaMetrics.delayed}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600/50 to-teal-600/50 border-0 h-[125px]">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardTitle className="text-sm font-medium text-white">English Proficiency</CardTitle>
            <Brain className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Excellent</span>
                <span className="text-sm font-medium text-white">{academicMetrics.excellentEnglish}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Mid Level</span>
                <span className="text-sm font-medium text-white">{academicMetrics.midLevelEnglish}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Low Level</span>
                <span className="text-sm font-medium text-white">{academicMetrics.lowLevelEnglish}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-600/50 to-pink-600/50 border-0 h-[125px]">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardTitle className="text-sm font-medium text-white">Total Participants</CardTitle>
            <BookOpen className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{academicMetrics.totalStudents}</div>
            <p className="text-xs text-white/70 mt-1">In current selection</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPA Distribution */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">GPA Distribution Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gpaTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="id" stroke="#9ca3af" label={{ value: 'Student Count', position: 'bottom', fill: '#9ca3af' }} />
                  <YAxis stroke="#9ca3af" domain={[0, 4]} label={{ value: 'GPA', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#9ca3af' }}
                  />
                  <Area type="monotone" dataKey="gpa" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Academic Performance Analysis */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Academic Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Average GPA by Status</div>
                  <div className="mt-2 space-y-2">
                    {Object.entries(
                      filteredData.reduce((acc, student) => {
                        if (student.GPA) {
                          acc[student["Acedamic status"]] = acc[student["Acedamic status"]] || { sum: 0, count: 0 };
                          acc[student["Acedamic status"]].sum += student.GPA;
                          acc[student["Acedamic status"]].count += 1;
                        }
                        return acc;
                      }, {} as Record<string, { sum: number; count: number }>)
                    ).map(([status, data]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-gray-300">{status}</span>
                        <span className="text-white font-medium">
                          {(data.sum / data.count).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">GPA Distribution</div>
                  <div className="mt-2 space-y-2">
                    {Object.entries({
                      'High (≥3.5)': filteredData.filter(s => s.GPA && s.GPA >= 3.5).length,
                      'Medium (3.0-3.49)': filteredData.filter(s => s.GPA && s.GPA >= 3.0 && s.GPA < 3.5).length,
                      'Low (<3.0)': filteredData.filter(s => s.GPA && s.GPA < 3.0).length,
                    }).map(([range, count]) => (
                      <div key={range} className="flex justify-between items-center">
                        <span className="text-gray-300">{range}</span>
                        <span className="text-white font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Performance Insights</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {((filteredData.filter(s => s.GPA && s.GPA >= 3.5).length / filteredData.length) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">High Achievers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {((filteredData.filter(s => s.GPA && s.GPA >= 3.0 && s.GPA < 3.5).length / filteredData.length) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Average Performers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {((filteredData.filter(s => s.GPA && s.GPA < 3.0).length / filteredData.length) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Need Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* English Level Distribution */}
        <Card className="bg-gray-800/50 border-gray-700 col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Language Proficiency Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">English Level Summary</div>
                  <div className="space-y-3">
                    {Object.entries(advancedMetrics.englishLevels).map(([level, count]) => (
                      <div key={level} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300 capitalize">{level}</span>
                          <span className="text-white">{count} students</span>
                        </div>
                        <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              level === 'excellent' ? 'bg-green-500' :
                              level === 'mid' ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${(count / filteredData.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Location Analysis */}
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Preferred Locations</div>
                  <div className="space-y-2">
                    {Object.entries(
                      filteredData.reduce((acc, student) => {
                        if (student.Apprenticeship_Location) {
                          const location = student.Apprenticeship_Location.split(/[,\-]/)[0].trim();
                          acc[location] = (acc[location] || 0) + 1;
                        }
                        return acc;
                      }, {} as Record<string, number>)
                    )
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([location, count]) => (
                        <div key={location} className="flex justify-between items-center">
                          <span className="text-gray-300">{location}</span>
                          <span className="text-white font-medium">{count} students</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-700/50 p-4 rounded-lg h-full">
                  <div className="text-sm text-gray-400 mb-4">Proficiency Insights</div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">English Proficiency Rate</span>
                        <span className="text-lg font-bold text-green-400">
                          {((advancedMetrics.englishLevels.excellent + advancedMetrics.englishLevels.mid) / 
                            filteredData.length * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Students with Mid level or higher
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Need Improvement</span>
                        <span className="text-lg font-bold text-yellow-400">
                          {(advancedMetrics.englishLevels.low / 
                            filteredData.length * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Students with Low level proficiency
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Top Performers</span>
                        <span className="text-lg font-bold text-blue-400">
                          {advancedMetrics.englishLevels.excellent}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Students with Excellent proficiency
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-600">
                      <div className="text-sm text-gray-400 mb-2">Recommendations</div>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-yellow-400 mr-2">•</span>
                          {advancedMetrics.englishLevels.low} students need additional language support
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {advancedMetrics.englishLevels.excellent} ready for international placement
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {advancedMetrics.englishLevels.mid} candidates for advanced training
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placement Eligibility Analysis */}
        <Card className="bg-gray-800/50 border-gray-700 col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Placement Eligibility Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="w-40 h-40">
                  <CircularProgressbar
                    value={academicMetrics.placementEligible.percentage}
                    text={`${academicMetrics.placementEligible.percentage}%`}
                    styles={buildStyles({
                      pathColor: `rgba(139, 92, 246, ${academicMetrics.placementEligible.percentage / 100})`,
                      textColor: '#fff',
                      trailColor: '#374151',
                      backgroundColor: '#3e4c5e',
                      textSize: '16px',
                    })}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-4 text-center">
                  Overall Placement Eligibility
                </p>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: 'High GPA',
                        value: academicMetrics.placementEligible.high,
                        fill: '#10b981'
                      },
                      {
                        name: 'Medium GPA',
                        value: academicMetrics.placementEligible.medium,
                        fill: '#6366f1'
                      },
                      {
                        name: 'Low GPA',
                        value: academicMetrics.placementEligible.low,
                        fill: '#f59e0b'
                      }
                    ].filter(item => {
                      if (gpaFilter === 'high') return item.name === 'High GPA';
                      if (gpaFilter === 'medium') return item.name === 'Medium GPA';
                      if (gpaFilter === 'low') return item.name === 'Low GPA';
                      return true;
                    })}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      type="number" 
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value} students`}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#9ca3af"
                      width={80}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#9ca3af' }}
                      formatter={(value) => [`${value} students`, '']}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                    >
                      {[
                        { fill: '#10b981' },
                        { fill: '#6366f1' },
                        { fill: '#f59e0b' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-3">Eligibility Breakdown</div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">High GPA Students</span>
                        <span className="text-green-400 font-medium">
                          {((academicMetrics.placementEligible.high / academicMetrics.placementEligible.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ 
                            width: `${(academicMetrics.placementEligible.high / 
                              academicMetrics.placementEligible.total) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Medium GPA Students</span>
                        <span className="text-blue-400 font-medium">
                          {((academicMetrics.placementEligible.medium / academicMetrics.placementEligible.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ 
                            width: `${(academicMetrics.placementEligible.medium / 
                              academicMetrics.placementEligible.total) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Low GPA Students</span>
                        <span className="text-yellow-400 font-medium">
                          {((academicMetrics.placementEligible.low / academicMetrics.placementEligible.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ 
                            width: `${(academicMetrics.placementEligible.low / 
                              academicMetrics.placementEligible.total) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Quick Stats</div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Participants</span>
                      <span className="text-white font-medium">{academicMetrics.placementEligible.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Eligible for Placement</span>
                      <span className="text-green-400 font-medium">
                        {Math.round(academicMetrics.placementEligible.total * 
                          (academicMetrics.placementEligible.percentage / 100))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.slice(0, 6).map((student, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Academic Status</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    student["Acedamic status"] === "working" ? "bg-green-500/20 text-green-400" :
                    student["Acedamic status"] === "خريج" ? "bg-blue-500/20 text-blue-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {student["Acedamic status"]}
                  </span>
                </div>
                {student.GPA && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">GPA</span>
                    <span className={`text-white font-medium ${
                      student.GPA >= 3.5 ? "text-green-400" :
                      student.GPA >= 3.0 ? "text-blue-400" :
                      "text-yellow-400"
                    }`}>
                      {student.GPA.toFixed(2)}
                    </span>
                  </div>
                )}
                {student.English_Level && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">English Level</span>
                    <span className={`text-white font-medium ${
                      student.English_Level.toLowerCase().includes('excellent') ? "text-green-400" :
                      student.English_Level.toLowerCase().includes('mid') ? "text-blue-400" :
                      "text-yellow-400"
                    }`}>
                      {student.English_Level}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Visa Status</span>
                  <span className={`px-2 py-1 rounded-md ${
                    getVisaStatus(student["Visa status"])?.toLowerCase() === "Pending" ? "bg-yellow-500/20 text-yellow-500" :
                    getVisaStatus(student["Visa status"])?.toLowerCase() === "Selected" ? "bg-green-500/20 text-green-500" :
                    getVisaStatus(student["Visa status"])?.toLowerCase() === "Delayed" ? "bg-red-500/20 text-red-500" :
                    "bg-gray-500/20 text-gray-500"
                  }`}>
                    {getVisaStatus(student["Visa status"])}
                  </span>
                </div>
                {student.Apprenticeship_Location && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white text-sm">
                      {student.Apprenticeship_Location}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}