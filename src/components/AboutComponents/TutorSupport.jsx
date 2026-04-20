import React from "react";
import {
  Lightbulb,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";

const BeliefCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 lg:p-8 
  rounded-2xl border border-slate-200 dark:border-slate-700
  shadow-sm hover:shadow-lg transition-all duration-300 
  flex flex-col h-full group">

    <div className="flex items-start gap-4 mb-5">
      <div
        className="bg-blue-50 dark:bg-slate-800 
        p-3 rounded-xl 
        group-hover:scale-110 transition-transform duration-300"
      >
        <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight">
        {title}
      </h3>
    </div>

    <div className="h-px bg-slate-200 dark:bg-slate-700 w-full mb-5" />

    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const WhatWeBelieve = () => {
  const beliefs = [
    {
      icon: Lightbulb,
      title: "Clarity builds confidence",
      description:
        "Students make better progress when explanations are simple, structured, and easy to return to.",
    },
    {
      icon: Zap,
      title: "Clarity builds confidence",
      description:
        "Students make better progress when explanations are simple, structured, and easy to return to.",
    },
    {
      icon: MessageSquare,
      title: "Support should not stop after the lesson",
      description:
        "Students need guidance when they get stuck, not just during a scheduled session.",
    },
    {
      icon: Users,
      title: "Support should not stop after the lesson",
      description:
        "Students need guidance when they get stuck, not just during a scheduled session.",
    },
    {
      icon: BarChart3,
      title: "Progress comes from consistency",
      description:
        "Small, supported steps over time lead to stronger understanding and better exam performance.",
    },
    {
      icon: ShieldCheck,
      title: "Progress comes from consistency",
      description:
        "Small, supported steps over time lead to stronger understanding and better exam performance.",
    },
  ];

  return (
    <section className="relative section-padding-x
 dark:bg-slate-950 transition-colors duration-300">

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#3b82f6 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 
          font-extrabold text-[#1a2b4b] dark:text-white mb-6">
            What we believe
          </h2>

          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
              We believe students do best when learning is clear, structured, and supported.
            </p>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Mentis was built to combine the flexibility of online learning with the reassurance of real tutor guidance.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex justify-center items-center mb-12 lg:mb-16">
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700" />
          <div className="absolute w-2.5 h-2.5 rotate-45 
          bg-white dark:bg-slate-900 
          border border-slate-200 dark:border-slate-700" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {beliefs.map((belief, index) => (
            <BeliefCard key={index} {...belief} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;