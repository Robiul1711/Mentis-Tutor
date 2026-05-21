import React, { useState } from "react";

const PastPapersWidget = ({ pastPapers }) => {
  const [selectedBoard, setSelectedBoard] = useState("Edexcel");

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Past Papers
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
          {["Edexcel", "AQA"].map((board) => (
            <button
              key={board}
              onClick={() => setSelectedBoard(board)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                selectedBoard === board
                  ? "bg-Primary text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {board}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {Object.entries(pastPapers.years || {})
            .sort((a, b) => b[0] - a[0])
            .map(([year, boards]) => {
              const activeBoardData = boards.find(
                (b) => b.board === selectedBoard,
              );
              return (
                <div key={year} className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-600 w-10">
                    {year}
                  </span>
                  <div className="flex-1 flex gap-2">
                    {activeBoardData ? (
                      activeBoardData.papers
                        ?.slice(0, 3)
                        .map((paper, pIdx) => (
                          <button
                            key={pIdx}
                            className="flex-1 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-Primary hover:bg-white hover:border-Primary transition-all flex flex-col items-center"
                          >
                            {paper.paper}
                            <span className="text-[8px] text-slate-400 font-normal">
                              {Math.round(paper.percentage)}%
                            </span>
                          </button>
                        ))
                    ) : (
                      <div className="flex-1 py-1.5 text-[10px] text-slate-400 italic text-center">
                        No {selectedBoard} papers
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Overall Progress:{" "}
              {Math.round(pastPapers.overall_progress_percentage || 0)}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-Primary rounded-full shadow-[0_0_10px_rgba(100,181,246,0.5)]"
              style={{
                width: `${pastPapers.overall_progress_percentage || 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastPapersWidget;
