import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TopicBreakdown from "./TopicBreakdown";
import ReflectionNotes from "./ReflectionNotes";

const data = [
  { name: "2024 Paper P1", score: 70 },
  { name: "2024 Paper P1", score: 68 },
  { name: "2024 Paper P1", score: 66 },
];

const PastPaperProgressTracker = () => {
  return (
    <div className="">
      <h1 className="text-[22px] font-semibold mb-6">
        Past Paper Progress Tracker
      </h1>

      {/* TOP FILTER ROW */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select className="border border-gray-300  rounded-lg px-4 py-2 w-56">
          <option>Exam Board: Edexcel</option>
        </select>

        <select className="border border-gray-300  rounded-lg px-4 py-2 w-56">
          <option>Paper: 2024 Paper P3</option>
        </select>

        <button className="bg-[#4EA3F1] text-white px-6 py-2 rounded-lg hover:bg-[#3b8dd1]">
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button className="border  px-6 py-2 rounded-lg ">
         Your Score:  68%
        </button>
      </div>

      {/* CARD */}
      <div className="border rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-[18px] mb-4">
          Overall Past Paper Performance
        </h2>

        {/* CHART WRAPPER */}
        <div className="h-[380px]  rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={70}>
              <CartesianGrid vertical={false} stroke="#E5E5E5" />
              <XAxis
                dataKey="name"
             
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#000" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#000" }}
              />
              <Tooltip />
              <Bar
                dataKey="score"
                fill="#0284FF"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
        <div className="mt-6 space-y-4 flex gap-6 flex-col lg:flex-row">
          <div className="lg:w-[50%]">

          <TopicBreakdown />
          </div>
          <div className="lg:w-[50%]">

          <ReflectionNotes />
          </div>
       
        </div>
    </div>
  );
};

export default PastPaperProgressTracker;
