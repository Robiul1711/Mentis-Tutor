import { useApiQuery } from "@/hooks/apiQuery";
import { Calendar, Clock, BookOpen, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

export default function WeeklySchedule() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const { data: classSchedule, isLoading } = useApiQuery({
    queryKey: ["class-schedule"],
    url: "/class-schedules/get",
    secure: true,
  });

  // Ensure we handle different data formats gracefully
  const rawData = classSchedule?.data || [];
  const batches = Array.isArray(rawData[0])
    ? rawData
    : rawData.length > 0
      ? [rawData]
      : [];

  if (isLoading) {
    return (
      <div className="w-full space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="h-4 w-96 bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
          </div>
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="h-48 bg-slate-100 dark:bg-slate-800/40 rounded-3xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-950/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Calendar className="w-10 h-10 text-indigo-500/60" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">
          No Schedule Yet
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm leading-relaxed">
          The weekly class schedule hasn't been created for this batch. New
          schedules will appear here once published.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-Primary rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Class Schedule
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium ml-12">
            Weekly academic timeline and lesson plans
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl backdrop-blur-sm self-start md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              viewMode === "list"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <List className="w-4 h-4" />
            Table
          </button>
        </div>
      </div>

      {batches.map((batch, batchIdx) => (
        <div key={batchIdx} className="space-y-6">
          {batches.length > 1 && (
            <div className="flex items-center gap-4">
              <div className="h-px grow bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 whitespace-nowrap px-4 py-1 rounded-full border border-slate-100 dark:border-slate-800">
                Batch #{batchIdx + 1} Schedule
              </span>
              <div className="h-px grow bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
            </div>
          )}

          {viewMode === "grid" ? (
            /* Modern Grid Layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {batch.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Background Highlight */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors duration-500"></div>

                  <div className="flex justify-between items-start relative z-10 mb-5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-lg">
                        {item.day}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-colors duration-300">
                      <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.lesson || "No Subject Assigned"}
                  </h4>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60 relative z-10">
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-2xl w-full">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                        {item.start || "N/A"} - {item.end || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Traditional Table Layout (Enhanced) */
            <div className="overflow-hidden rounded-4xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Day
                    </th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Subject / Lesson
                    </th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Time Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {batch.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors group"
                    >
                      <td className="px-8 py-6 font-bold text-slate-800 dark:text-slate-200">
                        {item.day}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {item.lesson}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/40 px-4 py-2 rounded-full w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          {item.start} - {item.end}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
