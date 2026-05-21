import React from "react";
import { HelpCircle } from "lucide-react";
import { useApiQuery } from "@/hooks/apiQuery";

const confidenceColors = [
  "stroke-emerald-500",
  "stroke-amber-500",
  "stroke-rose-500",
  "stroke-blue-500",
  "stroke-purple-500",
  "stroke-yellow-500",
  "stroke-pink-500",
];
const confidenceBgColors = [
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-pink-500",
];

const ConfidenceWidget = () => {
  const { data: response, isLoading } = useApiQuery({
    queryKey: ["confidence"],
    url: `/quiz/confidence`,
    secure: true,
  });

  const confidenceData = response?.data || {};
  const sections = confidenceData.sections || [];
  const overallPercentage = confidenceData.overall_confidence_percentage || 0;

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-Primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Confidence
          <HelpCircle size={14} className="text-slate-400" />
        </h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-6 font-poppins">
          <svg
            viewBox="0 0 36 36"
            className="w-full h-full transform -rotate-90"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="3"
            ></circle>
            {sections.map((section, i) => {
              // Calculate cumulative percentage for rotation
              // This assumes sections are part of a 100% whole.
              // If they are independent, we might need a different visualization,
              // but we'll stick to the current design for now.
              const totalBefore = sections
                .slice(0, i)
                .reduce(
                  (acc, s) => acc + s.confidence_percentage / sections.length,
                  0,
                );

              const dashArray = `${section.confidence_percentage / sections.length} 100`;
              const dashOffset = `-${totalBefore}`;

              return (
                <circle
                  key={i}
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={confidenceColors[i % confidenceColors.length]}
                  strokeWidth="3"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                ></circle>
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {overallPercentage}%
            </span>
            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
              Overall Confidence
            </span>
          </div>
        </div>

        <div className="w-full space-y-3">
          {sections.map((section, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${confidenceBgColors[i % confidenceBgColors.length]}`}
                ></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {section.section_title}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {section.confidence_percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Focus Next section removed if no data is provided by current API structure */}
        {confidenceData.focus_next_needs_work &&
          confidenceData.focus_next_needs_work.length > 0 && (
            <div className="w-full mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-slate-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
                Focus Next (Needs Work):
              </h4>

              {confidenceData.focus_next_needs_work.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-200"></div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {item}
                    </span>
                  </div>
                  <HelpCircle
                    size={14}
                    className="text-slate-300 group-hover:text-Primary"
                  />
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default ConfidenceWidget;
