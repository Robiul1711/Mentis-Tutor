import React, { useState } from 'react';

export default function ConfidenceMeter() {
  const [confident, setConfident] = useState(30);
  const [ok, setOk] = useState(40);
  const [needWork, setNeedWork] = useState(30);

  // Calculate total and percentages
  const total = confident + ok + needWork;
  const confidentPercent = Math.round((confident / total) * 100);
  const okPercent = Math.round((ok / total) * 100);
  const needWorkPercent = Math.round((needWork / total) * 100);

  // Calculate angles for the donut chart
  const confidentAngle = (confident / total) * 360;
  const okAngle = (ok / total) * 360;


  // Create SVG path for donut segments
  const createArc = (startAngle, endAngle, radius = 90, thickness = 30) => {
    const innerRadius = radius - thickness;
    const start = polarToCartesian(100, 100, radius, endAngle);
    const end = polarToCartesian(100, 100, radius, startAngle);
    const innerStart = polarToCartesian(100, 100, innerRadius, endAngle);
    const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Confidence Meter</h1>
      
      {/* Stats Display */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-medium">Confident</span>
          <span className="text-green-600 font-semibold">{confidentPercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-medium">Ok</span>
          <span className="text-amber-500 font-semibold">{okPercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-medium">Need Work</span>
          <span className="text-red-500 font-semibold">{needWorkPercent}%</span>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8">
        <svg viewBox="0 0 200 200" className="w-64 h-64">
          {/* Confident segment */}
          <path
            d={createArc(0, confidentAngle)}
            fill="#059669"
            className="transition-all duration-300"
          />
          {/* Ok segment */}
          <path
            d={createArc(confidentAngle, confidentAngle + okAngle)}
            fill="#f59e0b"
            className="transition-all duration-300"
          />
          {/* Need Work segment */}
          <path
            d={createArc(confidentAngle + okAngle, 360)}
            fill="#ef4444"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-600"></div>
          <span className="text-gray-700">Confident</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-gray-700">Ok</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-gray-700">Need Work</span>
        </div>
      </div>

 
    </div>
  );
}