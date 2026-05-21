import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";

const ResourcesTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {/* Resource Button 1 */}
      <button className="flex items-center justify-between p-3 md:p-4 bg-[#f8fafc] dark:bg-gray-800/50 rounded-xl md:rounded-2xl border border-slate-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all group active:scale-[0.98]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
            <FiDownload className="text-lg md:text-xl" />
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white truncate w-full">
              Template Notes Set
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
              PDF • 2.4 MB
            </span>
          </div>
        </div>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Resource Button 2 */}
      <button className="flex items-center justify-between p-3 md:p-4 bg-[#f8fafc] dark:bg-gray-800/50 rounded-xl md:rounded-2xl border border-slate-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all group active:scale-[0.98]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
            <FiFileText className="text-lg md:text-xl" />
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white truncate w-full">
              Question Packs
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
              Quiz • 120 Qs
            </span>
          </div>
        </div>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ResourcesTab;
