import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Algebra", value: 25, color: "#C79BFF" },       // purple
  { name: "Geometry", value: 60, color: "#1F6BFF" },      // blue
  { name: "Probability", value: 15, color: "#FF9534" },   // orange
];

export default function TopicBreakdown() {
  return (
    <div className=" p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Topic Breakdown</h2>

      <div className="flex flex-col sm:flex-row items-center">

        {/* PIE CHART */}
        <div className="sm:w-1/2 w-full  h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={0}
                outerRadius={90}
                paddingAngle={1}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <div className="w-1/2 flex flex-col gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              {/* Dot + Label */}
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className=" text-[16px]">{item.name}</span>
              </div>

              {/* Percentage */}
              <span className="text-[16px] font-semibold ">
                {item.value}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
