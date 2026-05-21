import React from "react";
import { getSubjectIcon } from "../DashboardComponents/subjectIcons";

const LessonHeader = ({ showQuiz, setShowQuiz, currentVideo, activeCategory, lessonsCount }) => {
  const iconConfig = getSubjectIcon(activeCategory);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
      <div className="flex flex-col gap-1.5">
        {/* Video / Quiz Title */}
        <div>
          <h3 className="text-sm md:text-lg font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
            {showQuiz
              ? "Task Mode Quiz"
              : currentVideo?.title || "Tutorial: Type of Number and BODMAS"}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Icon Container */}
          {iconConfig && (
            <div className={`flex items-center justify-center w-6 h-6 rounded-md shrink-0 ${iconConfig.bg} ${iconConfig.text}`}>
              {iconConfig.icon}
            </div>
          )}
          <h2 className="font-bold text-slate-700 dark:text-slate-200 tracking-tight">
            {activeCategory}
          </h2>

          <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100 dark:border-blue-500/20">
            {lessonsCount} Lessons
          </span>
        </div>
      </div>

      <div className="w-full md:w-auto inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 backdrop-blur-md">
        {/* Tutorial */}
        <button
          onClick={() => setShowQuiz(false)}
          className={`flex-1 md:flex-none relative md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${
            !showQuiz
              ? "bg-white dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-500 text-black dark:text-white shadow-md"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Tutorial
        </button>

        {/* Quiz */}
        <button
          onClick={() => setShowQuiz(true)}
          className={`flex-1 md:flex-none relative  md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${
            showQuiz
              ? "bg-white dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-500 text-black dark:text-white shadow-md"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <div className="flex flex-col items-center">
            <span>Quiz</span>
            <span className="block text-[8px] md:text-[10px] font-medium opacity-70 leading-none">
              Task Mode
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LessonHeader;
