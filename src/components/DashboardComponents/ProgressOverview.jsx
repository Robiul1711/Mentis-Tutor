import React from "react";
import { BookOpen } from "lucide-react";

const ProgressOverview = ({ progress }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 ">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Progress Overview
      </h2>
      <div className="space-y-3">
        {/* Videos Watched */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-Primary/10 rounded-xl flex items-center justify-center text-Primary">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <span className="text-slate-800 dark:text-slate-100 font-semibold">
                Videos Watched
              </span>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {progress.videos_watched?.completed}/
                  {progress.videos_watched?.total}
                </span>
                <span className="text-sm font-bold text-Primary ml-4">
                  {progress.videos_watched?.progress_percentage}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-Primary rounded-full"
                style={{
                  width: `${progress.videos_watched?.progress_percentage || 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Past Papers Attempted */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-Primary/10 rounded-xl flex items-center justify-center text-Primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <span className="text-slate-800 dark:text-slate-100 font-semibold">
                Past Papers Attempted
              </span>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {progress.past_papers_attempted?.completed}/
                  {progress.past_papers_attempted?.total}
                </span>
                <span className="text-sm font-bold text-Primary ml-4">
                  {progress.past_papers_attempted?.progress_percentage}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-Primary rounded-full"
                style={{
                  width: `${progress.past_papers_attempted?.progress_percentage || 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
