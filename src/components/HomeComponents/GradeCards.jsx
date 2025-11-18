import React from "react";
import Title from "../common/Title";
import { Grade1Icon, Grade2Icon, Grade3Icon } from "../SVG/Icons";

// Dummy icons



const gradeData = [
  {
    id: 1,
    bg: "bg-[#fbf9c8]",
    border: "border-[#d6d15d]",
    shadow: "shadow-[0px_8px_20px_rgba(210,210,120,0.4)]",
    icon: Grade1Icon,
    gradeBg: "bg-[#ebea32]",
    grade: "Grade 2–4",
    title: "Build Strong Foundations",
    desc: "Regain your confidence and strengthen your basics with guided video lessons.",
    offset: "translate-y-20",
  },
  {
    id: 2,
    bg: "bg-[#f3dfd2]",
    border: "border-[#dba991]",
    shadow: "shadow-[0px_8px_20px_rgba(255,180,150,0.4)]",
    icon: Grade2Icon,
    gradeBg: "bg-[#f9a14a]",
    grade: "Grade 5–6",
    title: "Break the Grade 7 Barrier",
    desc: "Master problem solving skills and move from understanding to application.",
    offset: "",
  },
  {
    id: 3,
    bg: "bg-[#dceafd]",
    border: "border-[#78a9e9]",
    shadow: "shadow-[0px_8px_20px_rgba(120,160,255,0.4)]",
    icon: Grade3Icon,
    gradeBg: "bg-[#4ca4ff]",
    grade: "Grade 7–8+",
    title: "Achieve Grade 9 Mastery",
    desc: "Push beyond limits and refine your exam technique with advanced practice.",
    offset: "-translate-y-20",
  },
];

const GradeCards = () => {
  return (
        <section className="section-padding-x section-padding-y">
          {/* Heading */}
          <div className="text-center mb-44">
            <Title level="title48" className="dark:text-white">
          Everyone Can Reach Grade 9
            </Title>
            <Title level="title20" className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4">
            Wherever you start, Mentis helps you climb higher step by step.
            </Title>
          </div>
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {gradeData.map((card) => (
          <div
            key={card.id}
            className={`
              ${card.bg} ${card.border} ${card.shadow}
              border rounded-3xl p-6 w-full md:w-[380px]
              transition-all duration-300
              ${card.offset}
            `}
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
               {<card.icon />}
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold text-black ${card.gradeBg}`}
              >
                {card.grade}
              </span>
            </div>

            {/* Text */}
            <div className="mt-5">
              <Title level="title24" className="text-black font-semibold">
                {card.title}
              </Title>

              <p className="text-gray-700 mt-2 text-[15px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GradeCards;
