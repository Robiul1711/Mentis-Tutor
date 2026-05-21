import React from "react";
import {
  Hash,
  TrendingUp,
  PieChart,
  Triangle,
  BarChart3,
  Calculator,
} from "lucide-react";

// Subject icon config to match the exact design
export const subjectIconMap = {
  Number: {
    icon: <Calculator size={16} strokeWidth={2.5} />,
    bg: "bg-blue-50",
    text: "text-blue-500",
  },
  Algebra: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="13" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="serif" fontStyle="italic">x</text>
        <text x="9" y="8" fontSize="7" fontWeight="700" fill="currentColor" fontFamily="sans-serif">2</text>
      </svg>
    ),
    bg: "bg-red-50",
    text: "text-red-500",
  },
  Graphs: {
    icon: <TrendingUp size={16} strokeWidth={2.5} />,
    bg: "bg-pink-50",
    text: "text-pink-500",
  },
  Ratio: {
    icon: <PieChart size={16} strokeWidth={2.5} />,
    bg: "bg-green-50",
    text: "text-green-500",
  },
  Geometry: {
    icon: <Triangle size={16} strokeWidth={2.5} />,
    bg: "bg-sky-50",
    text: "text-sky-500",
  },
  Trigonometry: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 14L2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 14L13 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 14L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0"/>
        <path d="M5.5 14C5.5 12 4 10 2.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  Statistics: {
    icon: <BarChart3 size={16} strokeWidth={2.5} />,
    bg: "bg-indigo-50",
    text: "text-indigo-500",
  },
};

// Fallback icon config
export const defaultIconConfig = {
  icon: <Hash size={16} strokeWidth={2.5} />,
  bg: "bg-slate-100",
  text: "text-slate-500",
};

/**
 * Get icon config for a subject title
 * @param {string} title - The subject title
 * @returns {object} - { icon, bg, text }
 */
export const getSubjectIcon = (title) => {
  return subjectIconMap[title] || defaultIconConfig;
};
