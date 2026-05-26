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
import { useApiQuery } from "@/hooks/apiQuery";



const StatCard = ({ icon: Icon, label, value, subtext, color, grade }) => (
  <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-5">
    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
      {grade ? (
        <div className={`w-12 h-12 rounded-full border-4 flex flex-col items-center justify-center ${color.replace('bg-', 'border-').replace('text-', 'border-')}`}>
           <span className="text-xl font-bold dark:text-white">{grade}</span>
        </div>
      ) : (
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      )}
    </div>
    <div>
      <div className="flex items-center gap-1">
        <p className="text-gray-500 text-sm font-medium dark:text-gray-400">{label}</p>
        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400">?</div>
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
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
  const [selectedBoards, setSelectedBoards] = useState(["Edexcel", "AQA"]);
  const [year, setYear] = useState("");
  const [paper, setPaper] = useState("");
  const [search, setSearch] = useState("");

  const handleBoardToggle = (board) => {
    setSelectedBoards((prev) =>
      prev.includes(board) ? prev.filter((b) => b !== board) : [...prev, board]
    );
  };

  const { data: pastPaperResponse } = useApiQuery({
    queryKey: ["past-paper-progress", selectedBoards, year, paper, search],
    url: "/past-paper-progress",
    params: {
      exam_board: selectedBoards.length === 1 ? selectedBoards[0] : "",
      year: year || undefined,
      paper: paper || undefined,
      search: search || undefined,
    },
    secure: true,
  });

  const chartData = pastPaperResponse?.data?.chart?.data || [];
  const attemptsData = pastPaperResponse?.data?.attempts || [];
  const summary = pastPaperResponse?.data?.summary || {};
  
  const getGradeColor = (grade) => {
    if (!grade) return "bg-gray-50 text-gray-600 border-gray-100";
    const num = parseInt(grade.replace(/\D/g, ""), 10);
    if (num >= 8) return "bg-orange-50 text-orange-600 border-orange-100";
    if (num >= 6) return "bg-blue-50 text-blue-600 border-blue-100";
    return "bg-green-50 text-green-600 border-green-100";
  };
  return (
    <div className=" text-gray-700">
      {/* Header */}
      <div className="">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2d3a5a] mb-2 dark:text-white">Past Paper Progress Tracker</h1>
            <p className="text-gray-500 dark:text-gray-400">Track your paper attempts, scores, and reflections over time.</p>
          </div>
          <Link to="/dashboard/past-papers" className="bg-Secondary text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-Primary transition">
            Go to Past Papers
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={FileText} label="Papers Completed" value={summary?.papers_completed || 0} color="text-blue-500" />
          <StatCard icon={Grade1Icon} label="Average Grade" value={summary?.average_grade || "-"}  color="text-orange-400" />
          <StatCard icon={Grade3Icon} label="Highest Grade" value={summary?.highest_grade || "-"}  color="text-blue-600" />
          <StatCard icon={Clock} label="Total Time Spent" value={summary?.total_time_spent_human || "0 mins"} color="text-blue-500" />
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-[#2d3a5a] dark:text-white mb-8">Progress Over Time</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
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
                  cursor={{ stroke: '#1a73e8', strokeWidth: 2 }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100">
                          <p className="font-bold text-gray-800 mb-1">{data.tooltip_title || label}</p>
                          <p className="text-sm font-medium text-gray-600">{data.tooltip_subtitle || data.score_text}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="score_percentage" stroke="#1a73e8" strokeWidth={4} fillOpacity={1} fill="url(#colorPct)" dot={{ r: 6, fill: "#fff", stroke: "#1a73e8", strokeWidth: 3 }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Filters */}
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-200 pointer-events-none " size={18} />
            <input 
              type="text" 
              placeholder="Search papers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:text-white dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 transition" 
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={selectedBoards.includes("Edexcel")} 
                onChange={() => handleBoardToggle("Edexcel")} 
                className="rounded text-blue-600" 
              /> Edexcel
            </label>
            <label className="flex items-center gap-2 ">
              <input 
                type="checkbox" 
                checked={selectedBoards.includes("AQA")} 
                onChange={() => handleBoardToggle("AQA")} 
                className="rounded text-blue-600" 
              /> AQA
            </label>
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />
            <div className="relative">
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-100 dark:text-white dark:bg-gray-800 rounded-lg py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-600 font-medium cursor-pointer"
              >
                <option value="">Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={paper} 
                onChange={(e) => setPaper(e.target.value)}
                className="appearance-none bg-gray-50 border dark:text-white dark:bg-gray-800   border-gray-100 rounded-lg py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-600 font-medium cursor-pointer"
              >
                <option value="">Paper</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <Filter size={18} className="text-gray-400 dark:text-white" />
            <button 
              onClick={() => { setYear(""); setPaper(""); setSearch(""); setSelectedBoards(["Edexcel", "AQA"]); }}
              className="flex items-center gap-1 text-gray-400 dark:text-white ml-4 hover:text-gray-600 transition"
            >
              <MapPin size={16}/> Clear filters
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-sm border-b border-gray-100 dark:border-gray-800">
                <th className="px-8 py-4 font-medium italic text-gray-400 dark:text-white">Date</th>
                <th className="px-8 py-4 font-medium italic text-gray-400 dark:text-white">Board</th>
                <th className="px-8 py-4 font-medium italic text-gray-400 dark:text-white">Paper</th>
                <th className="px-8 py-4 font-medium italic text-gray-400 dark:text-white">Score</th>
                <th className="px-8 py-4 font-medium italic text-gray-400 dark:text-white">Grade</th>
                {/* <th className="px-8 py-4 font-medium italic text-gray-400">Notes</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attemptsData.map((item, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition group">
                  <td className="px-8 py-5 text-gray-600 dark:text-white font-medium">{item.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold">
                      <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-[10px] text-white">
                        {item.exam_board ? item.exam_board.charAt(0) : 'E'}
                      </div>
                      {item.exam_board}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-blue-600 dark:text-blue-400 font-medium">
                    <div className="flex items-center gap-2">
                       {item.paper}
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-800 dark:text-white text-lg">{item.score_percentage}%</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-bold border ${getGradeColor(item.grade_label)}`}>
                      {item.grade_label}
                    </span>
                  </td>
                </tr>
              ))}
              {attemptsData.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-8 text-center text-gray-500">
                    No attempts found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PastPaperProgressTracker;