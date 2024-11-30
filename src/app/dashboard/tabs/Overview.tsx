"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Users, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import rawData from '../mockdata/overview.json';
import rawData2 from '../mockdata/candidates-not-interviewed.json';

const studentsData = rawData[0]["overview Dashboard_Sheet1"] || [];
const notInterviewedData = rawData2[0]["Sheet1"] || [];

export default function StudentAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('application');

  // Get unique cities and genders for filters
  const cities = [...new Set(studentsData.map(s => s.city))];
  const genders = [...new Set(studentsData.map(s => s.Gender))];

  // Filtered data
  const filteredData = useMemo(() => {
    return studentsData.filter(student => {
      const matchesSearch = Object.values(student).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'all' || student["Acedamic status"] === statusFilter;
      const matchesCity = cityFilter === 'all' || student.city === cityFilter;
      const matchesGender = genderFilter === 'all' || student.Gender === genderFilter;
      
      return matchesSearch && matchesStatus && matchesCity && matchesGender;
    });
  }, [searchTerm, statusFilter, cityFilter, genderFilter]);

  // Metrics calculations based on filtered data
  const metrics = useMemo(() => {
    const total = filteredData.length;
    const working = filteredData.filter(s => s["Acedamic status"] === "working").length;
    const graduate = filteredData.filter(s => s["Acedamic status"] === "خريج").length;
    const cities = [...new Set(filteredData.map(s => s.city))].length;

    return { total, working, graduate, cities };
  }, [filteredData]);

  // Chart data preparations based on filtered data
  const genderData = useMemo(() => {
    const genderCount = filteredData.reduce((acc: { [key: string]: number }, student) => {
      acc[student.Gender] = (acc[student.Gender] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(genderCount).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const cityData = useMemo(() => {
    const cityCount = filteredData.reduce((acc: { [key: string]: number }, student) => {
      acc[student.city] = (acc[student.city] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => (b.count as number) - (a.count as number))
      .slice(0, 5);
  }, [filteredData]);

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCityFilter('all');
    setGenderFilter('all');
  };

  return (
    <div className="p-6 bg-[#0A2F2F] rounded-lg">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800/50 text-white border-gray-700"
        />
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-gray-800/50 text-white border-gray-700">
            <SelectValue placeholder="Academic Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="working">Working</SelectItem>
            <SelectItem value="خريج">Graduate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="bg-gray-800/50 text-white border-gray-700">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger className="bg-gray-800/50 text-white border-gray-700">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="all">All Genders</SelectItem>
            {genders.map(gender => (
              <SelectItem key={gender} value={gender}>{gender}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={resetFilters}
          className="px-3 py-2 bg-gray-800/50 text-white border border-gray-700 rounded hover:bg-gray-700/50 w-full"
        >
          Reset Filters
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 mb-6">
        <Card className="bg-gradient-to-br from-purple-600/50 to-indigo-600/50 border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600/50 to-teal-600/50 border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Working</CardTitle>
            <Briefcase className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.working}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-600/50 to-rose-600/50 border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Graduates</CardTitle>
            <GraduationCap className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.graduate}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/50 to-cyan-600/50 border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">98</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-600/50 to-orange-600/50 border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Cities</CardTitle>
            <MapPin className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.cities}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Participants by City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="city" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#9ca3af' }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#ffffff' }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                  <Legend formatter={(value) => <span className="text-gray-300">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Tabs Card Section */}
      <Card className="bg-gray-800/50 border-gray-700 mb-6">
      <CardHeader>
            <CardTitle className="text-white">Applications</CardTitle>
<br></br>
          <div className="flex space-x-2 border-b border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'application' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('application')}
            >
              Application List
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'interview' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('interview')}
            >
              Interview Scheduling
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'evaluation' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('evaluation')}
            >
              Evaluation Form
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'status' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('status')}
            >
              Status Management
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'batch' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('batch')}
            >
              Batch Processing
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'application' && (
            <div className="text-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Sex</TableHead>
                    <TableHead className="text-gray-300">Age</TableHead>
                    <TableHead className="text-gray-300">Region</TableHead>
                    <TableHead className="text-gray-300">City</TableHead>
                    <TableHead className="text-gray-300">Profession</TableHead>
                    <TableHead className="text-gray-300">Employer</TableHead>
                    <TableHead className="text-gray-300">Experience</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Mobile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notInterviewedData.slice(0, 10).map((candidate, index) => (
                    <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-gray-300 font-medium">
                        {candidate["Full Name"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Sex"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Age"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Region"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["City"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Current profession"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Employer"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Years of Experience"]} years
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Email address"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["mobile number"]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {activeTab === 'interview' && (
            <div className="text-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Sex</TableHead>
                    <TableHead className="text-gray-300">Age</TableHead>
                    <TableHead className="text-gray-300">Region</TableHead>
                    <TableHead className="text-gray-300">City</TableHead>
                    <TableHead className="text-gray-300">Profession</TableHead>
                    <TableHead className="text-gray-300">Employer</TableHead>
                    <TableHead className="text-gray-300">Experience</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Mobile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notInterviewedData.slice(10, 18).map((candidate, index) => (
                    <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-gray-300 font-medium">
                        {candidate["Full Name"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Sex"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Age"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Region"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["City"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Current profession"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Employer"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Years of Experience"]} years
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["Email address"]}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {candidate["mobile number"]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {activeTab === 'evaluation' && (
            <div className="text-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Technical Skills</TableHead>
                    <TableHead className="text-gray-300">Communication</TableHead>
                    <TableHead className="text-gray-300">Experience</TableHead>
                    <TableHead className="text-gray-300">Cultural Fit</TableHead>
                    <TableHead className="text-gray-300">Overall Rating</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notInterviewedData.slice(20, 25).map((candidate, index) => {
                    // Generate random rating between 2.5 and 4.8
                    const overallRating = (Math.random() * 2.3 + 2.5).toFixed(1);
                    const isSelected = parseFloat(overallRating) > 3.5;
                    
                    return (
                      <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                        <TableCell className="text-gray-300 font-medium">
                          {candidate["Full Name"]}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Select defaultValue="3">
                            <SelectTrigger className="w-20 bg-gray-800/50 text-white border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-600">
                              {[1,2,3,4,5].map(rating => (
                                <SelectItem key={rating} value={rating.toString()} className="hover:bg-gray-700">
                                  {rating}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Select defaultValue="4">
                            <SelectTrigger className="w-20 bg-gray-800/50 text-white border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-600">
                              {[1,2,3,4,5].map(rating => (
                                <SelectItem key={rating} value={rating.toString()} className="hover:bg-gray-700">
                                  {rating}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Select defaultValue="4">
                            <SelectTrigger className="w-20 bg-gray-800/50 text-white border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-600">
                              {[1,2,3,4,5].map(rating => (
                                <SelectItem key={rating} value={rating.toString()} className="hover:bg-gray-700">
                                  {rating}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Select defaultValue="3">
                            <SelectTrigger className="w-20 bg-gray-800/50 text-white border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-600">
                              {[1,2,3,4,5].map(rating => (
                                <SelectItem key={rating} value={rating.toString()} className="hover:bg-gray-700">
                                  {rating}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-gray-300 font-medium">
                          {overallRating}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <span className={isSelected ? "text-green-400" : "text-red-400"}>
                            {isSelected ? "Selected" : "Rejected"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <button className="px-3 py-1 bg-purple-600 rounded-md text-sm hover:bg-purple-700">
                            Submit
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          {activeTab === 'status' && (
            <div className="text-white">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 border-gray-700 p-4">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Selected Candidates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Overall Rating</TableHead>
                          <TableHead className="text-gray-300">Interview Date</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notInterviewedData.slice(25, 28).map((candidate, index) => (
                          <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                            <TableCell className="text-gray-300 font-medium">
                              {candidate["Full Name"]}
                            </TableCell>
                            <TableCell className="text-gray-300">4.2</TableCell>
                            <TableCell className="text-gray-300">2024-03-{15 + index}</TableCell>
                            <TableCell>
                              <span className="text-green-400">Selected</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 p-4">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Rejected Candidates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Overall Rating</TableHead>
                          <TableHead className="text-gray-300">Interview Date</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notInterviewedData.slice(28, 31).map((candidate, index) => (
                          <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                            <TableCell className="text-gray-300 font-medium">
                              {candidate["Full Name"]}
                            </TableCell>
                            <TableCell className="text-gray-300">2.8</TableCell>
                            <TableCell className="text-gray-300">2024-03-{15 + index}</TableCell>
                            <TableCell>
                              <span className="text-red-400">Rejected</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {activeTab === 'batch' && (
            <div className="text-white">
              <div className="mb-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <Select defaultValue="batch1">
                    <SelectTrigger className="w-48 bg-gray-800/50 text-white border-gray-600">
                      <SelectValue placeholder="Select Batch" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-600">
                      <SelectItem value="batch1" className="hover:bg-gray-700">Batch 1 (March 2024)</SelectItem>
                      <SelectItem value="batch2" className="hover:bg-gray-700">Batch 2 (April 2024)</SelectItem>
                      <SelectItem value="batch3" className="hover:bg-gray-700">Batch 3 (May 2024)</SelectItem>
                    </SelectContent>
                  </Select>
                  <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700">
                    Create New Batch
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700">
                    Assign to Batch
                  </button>
                  <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
                    Send Notifications
                  </button>
                </div>
              </div>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Selected Candidates for Batch Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300 w-12">
                          <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                        </TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Overall Rating</TableHead>
                        <TableHead className="text-gray-300">Interview Date</TableHead>
                        <TableHead className="text-gray-300">City</TableHead>
                        <TableHead className="text-gray-300">Contact</TableHead>
                        <TableHead className="text-gray-300">Current Status</TableHead>
                        <TableHead className="text-gray-300">Batch Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notInterviewedData.slice(25, 31).map((candidate, index) => {
                        const overallRating = (Math.random() * 1.3 + 3.5).toFixed(1); // Generates ratings between 3.5-4.8
                        return (
                          <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                            <TableCell>
                              <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                            </TableCell>
                            <TableCell className="text-gray-300 font-medium">
                              {candidate["Full Name"]}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {overallRating}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              2024-03-{15 + index}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {candidate["City"]}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {candidate["mobile number"]}
                            </TableCell>
                            <TableCell>
                              <span className="text-green-400">Selected</span>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue="pending">
                                <SelectTrigger className="w-32 bg-gray-800/50 text-white border-gray-600">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 text-white border-gray-600">
                                  <SelectItem value="pending" className="hover:bg-gray-700">Pending</SelectItem>
                                  <SelectItem value="assigned" className="hover:bg-gray-700">Assigned</SelectItem>
                                  <SelectItem value="confirmed" className="hover:bg-gray-700">Confirmed</SelectItem>
                                  <SelectItem value="declined" className="hover:bg-gray-700">Declined</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Batch 1 Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Selected:</span>
                        <span className="text-white">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confirmed:</span>
                        <span className="text-green-400">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pending:</span>
                        <span className="text-yellow-400">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Declined:</span>
                        <span className="text-red-400">1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Batch 2 Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Selected:</span>
                        <span className="text-white">18</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confirmed:</span>
                        <span className="text-green-400">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pending:</span>
                        <span className="text-yellow-400">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Declined:</span>
                        <span className="text-red-400">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Batch 3 Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Selected:</span>
                        <span className="text-white">20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confirmed:</span>
                        <span className="text-green-400">10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pending:</span>
                        <span className="text-yellow-400">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Declined:</span>
                        <span className="text-red-400">2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Graduates Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Academic Status</TableHead>
                <TableHead className="text-gray-300">Program</TableHead>
                <TableHead className="text-gray-300">Current Position</TableHead>
                <TableHead className="text-gray-300">Gender</TableHead>
                <TableHead className="text-gray-300">City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(0, 15).map((student, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-gray-300">{student["Acedamic status"]}</TableCell>
                  <TableCell className="text-gray-300">{student.Program}</TableCell>
                  <TableCell className="text-gray-300">{student.Current_Position}</TableCell>
                  <TableCell className="text-gray-300">{student.Gender}</TableCell>
                  <TableCell className="text-gray-300">{student.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
