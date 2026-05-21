import React from "react";
import { ConfidentIcon, NeedWoekIcon, OKIcon } from "../DashboardIcons/DashIcons";

const ConfidenceMeter = ({ optimisticFeedback, onFeedback }) => {
  return (
    <div className="bg-[#f8fafc] dark:bg-gray-800/50 rounded-xl p-2 md:p-4 mb-8 text-center border border-[#f1f5f9] dark:border-gray-700">
      <p className="text-[#64748b] dark:text-gray-400 font-bold text-[11px] md:text-sm uppercase tracking-wider mb-2 md:mb-4">
        How do you feel about this lesson?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
        {/* Confident */}
        <button
          type="button"
          onClick={() => onFeedback("confident")}
          className={`flex items-center sm:flex-col lg:flex-row justify-center gap-2 px-3 py-3 md:py-4 rounded-xl border transition-all group active:scale-95
            ${
              optimisticFeedback === "confident"
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/10"
            }`}
        >
          <ConfidentIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <span className="font-bold text-xs md:text-sm text-[#475569] dark:text-gray-300">
            Confident
          </span>
        </button>

        {/* Okay */}
        <button
          type="button"
          onClick={() => onFeedback("okay")}
          className={`flex items-center sm:flex-col lg:flex-row justify-center gap-2 px-3 py-3 md:py-4 rounded-xl border transition-all group active:scale-95
            ${
              optimisticFeedback === "okay"
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                : "border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-yellow-200 hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
            }`}
        >
          <OKIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <span className="font-bold text-xs md:text-sm text-[#475569] dark:text-gray-300">
            Okay
          </span>
        </button>

        {/* Needs Work */}
        <button
          type="button"
          onClick={() => onFeedback("needs_work")}
          className={`flex items-center sm:flex-col lg:flex-row justify-center gap-2 px-3 py-3 md:py-4 rounded-xl border transition-all group active:scale-95
            ${
              optimisticFeedback === "needs_work"
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : "border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10"
            }`}
        >
          <NeedWoekIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <span className="font-bold text-xs md:text-sm text-[#475569] dark:text-gray-300">
            Needs Work
          </span>
        </button>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
