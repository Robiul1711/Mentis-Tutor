import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, ChevronDown, FileText, Clock, Trophy, Star, Filter, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Grade1Icon, Grade3Icon } from "../SVG/Icons";

const progressData = [
  { date: "May 12", percentage: 25 },
  { date: "May 20", percentage: 75 },
  { date: "May 20", percentage: 70 },
  { date: "May 28", percentage: 85 },
  { date: "May 28", percentage: 98 },
];

const attempts = [
  { date: "May 28", board: "Edexcel", paper: "Paper 2", score: "89%", grade: "Grade 8", color: "bg-orange-50 text-orange-600 border-orange-100" },
  { date: "May 20", board: "AQA", paper: "Paper 1", score: "81%", grade: "Grade 8", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { date: "May 16", board: "Edexcel", paper: "Paper 3", score: "74%", grade: "Grade 7", color: "bg-green-50 text-green-600 border-green-100" },
  { date: "May 12", board: "Edexcel", paper: "Paper 2", score: "65%", grade: "Grade 6", color: "bg-blue-50 text-blue-600 border-blue-100" },
];

const StatCard = ({ icon: Icon, label, value, subtext, color, grade }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
      {grade ? (
        <div className={`w-12 h-12 rounded-full border-4 flex flex-col items-center justify-center ${color.replace('bg-', 'border-').replace('text-', 'border-')}`}>
           <span className="text-xl font-bold">{grade}</span>
        </div>
      ) : (
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      )}
    </div>
    <div>
      <div className="flex items-center gap-1">
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400">?</div>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtext && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm font-bold text-gray-800">{grade || value}</span>
          <div className="flex text-orange-300">
             <Star size={12} fill="currentColor" />
             <Star size={12} fill="currentColor" />
             <Star size={12} fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  </div>
);

const PastPaperProgressTracker = () => {
  return (
    <div className=" text-gray-700">
      {/* Header */}
      <div className="">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2d3a5a] mb-2">Past Paper Progress Tracker</h1>
            <p className="text-gray-500">Track your paper attempts, scores, and reflections over time.</p>
          </div>
          <Link to="/dashboard/past-papers" className="bg-[#1a73e8] text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-blue-600 transition">
            Go to Past Papers
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={FileText} label="Papers Completed" value="12" color="text-blue-500" />
          <StatCard icon={Grade1Icon} label="Average Grade" value="7"  color="text-orange-400" />
          <StatCard icon={Grade3Icon} label="Highest Grade" value="9"  color="text-blue-600" />
          <StatCard icon={Clock} label="Total Time Spent" value="8 hrs 45 mins" color="text-blue-500" />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-[#2d3a5a] mb-8">Progress Over Time</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a73e8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1a73e8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#1a73e8', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="percentage" stroke="#1a73e8" strokeWidth={4} fillOpacity={1} fill="url(#colorPct)" dot={{ r: 6, fill: "#fff", stroke: "#1a73e8", strokeWidth: 3 }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Filters */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search papers..." className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 transition" />
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600 px-2">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-blue-600" /> Edexcel</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-blue-600" /> AQA</label>
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />
            <span className="text-gray-300">2024</span>
            <span className="text-gray-300">2023</span>
            <span className="text-blue-600">2022</span>
            <button className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">P1 <ChevronDown size={14}/></button>
            <Filter size={18} className="text-gray-400" />
            <button className="flex items-center gap-1 text-gray-400 ml-4"><MapPin size={16}/> Clear filters</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-sm border-b border-gray-100">
                <th className="px-8 py-4 font-medium italic text-gray-400">Date</th>
                <th className="px-8 py-4 font-medium italic text-gray-400">Board</th>
                <th className="px-8 py-4 font-medium italic text-gray-400">Paper</th>
                <th className="px-8 py-4 font-medium italic text-gray-400">Score</th>
                <th className="px-8 py-4 font-medium italic text-gray-400">Grade</th>
                <th className="px-8 py-4 font-medium italic text-gray-400">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attempts.map((item, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition group">
                  <td className="px-8 py-5 text-gray-600 font-medium">{item.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-[10px] text-white">E</div>
                      {item.board}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-blue-600 font-medium">
                    <div className="flex items-center gap-2">
                       <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                       {item.paper}
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-800 text-lg">{item.score}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-bold border ${item.color}`}>
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-white hover:shadow-sm transition">
                      View Notes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PastPaperProgressTracker;