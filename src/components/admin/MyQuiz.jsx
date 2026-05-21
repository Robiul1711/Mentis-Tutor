import { useApiQuery } from "@/hooks/apiQuery";
import React, { useState } from "react";
import {
  FaRegClock,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaTrophy,
  FaChevronRight,
} from "react-icons/fa";

const MyQuiz = () => {
  const { data: response, isLoading } = useApiQuery({
    queryKey: ["quiz-attempts"],
    url: "/quiz-attempts",
    secure: true,
  });

  const [selectedAttemptId, setSelectedAttemptId] = useState(null);
  const [expandedQuizId, setExpandedQuizId] = useState(null);

  const { data: attemptDetails, isLoading: isDetailsLoading } = useApiQuery({
    queryKey: ["quiz-attempt-details", selectedAttemptId],
    url: `/quiz-attempts/${selectedAttemptId}`,
    secure: true,
    enabled: !!selectedAttemptId,
  });

  const quizzes = response?.quizzes || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={response?.avatar}
            alt={response?.user_name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-50 dark:ring-blue-900/20"
          />
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight leading-tight">
              {response?.user_name}'s Quizzes
            </h2>
            <p className="text-slate-500 text-[11px] font-semibold">
              Completed {quizzes.length} unique quizzes.
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center border border-blue-100 dark:border-blue-900/30 self-start sm:self-center">
          <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Attempts</p>
          <p className="text-lg font-black text-slate-800 dark:text-white">
            {quizzes.reduce((acc, q) => acc + (q.total_attempts || 0), 0)}
          </p>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 gap-4">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.quiz_id}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 transition-all"
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Quiz Thumbnail */}
                <div className="w-full sm:w-36 h-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-inner bg-slate-50 dark:bg-slate-800">
                  <img 
                    src={quiz.quiz_image} 
                    alt={quiz.quiz_title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quiz Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight truncate sm:whitespace-normal">
                        {quiz.quiz_title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Lesson: <span className="text-blue-600 dark:text-blue-400">{quiz.video_title}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-wider">
                        {quiz.total_attempts} Attempts
                      </span>
                      <button 
                        onClick={() => setExpandedQuizId(expandedQuizId === quiz.quiz_id ? null : quiz.quiz_id)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
                      >
                        {expandedQuizId === quiz.quiz_id ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                      </button>
                    </div>
                  </div>

                  {/* Top Attempt Preview */}
                  {quiz.attempts?.[0] && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <FaTrophy className="text-amber-400" size={10} />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Last Score:</span>
                        <span className="font-bold text-slate-800 dark:text-white">
                          {quiz.attempts[0].score}/{quiz.attempts[0].total_marks}
                        </span>
                      </div>
                      <div className="hidden sm:block w-px h-3 bg-slate-100 dark:bg-slate-800"></div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <FaRegClock className="text-slate-400" size={10} />
                        <span className="text-slate-500 text-[11px]">{quiz.attempts[0].attempted_at}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Attempts Table */}
              {expandedQuizId === quiz.quiz_id && (
                <div className="mt-5 overflow-x-auto rounded-xl border border-slate-50 dark:border-slate-800">
                  <table className="w-full text-left min-w-[500px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Score</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                      {quiz.attempts.map((attempt) => (
                        <tr key={attempt.attempt_id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="px-4 py-3 text-xs font-medium text-slate-600 dark:text-slate-400">{attempt.attempted_at}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-xs font-black text-slate-800 dark:text-white">
                              {attempt.score} <span className="text-slate-400 font-normal">/ {attempt.total_marks}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                              attempt.result === 'pass' 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400'
                                : 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400'
                            }`}>
                              {attempt.result}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button 
                              onClick={() => setSelectedAttemptId(attempt.attempt_id)}
                              className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline inline-flex items-center gap-1"
                            >
                              Review <FaChevronRight size={8} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Attempt Details Modal */}
      {selectedAttemptId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
              <div className="min-w-0">
                <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight truncate pr-2">
                  {attemptDetails?.quiz_title || 'Quiz Breakdown'}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mt-0.5">
                  <span>ID: {selectedAttemptId}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{attemptDetails?.attempted_at}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAttemptId(null)}
                className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-400 shrink-0"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 custom-scrollbar space-y-6">
              {isDetailsLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Analyzing...</p>
                </div>
              ) : attemptDetails ? (
                <>
                  {/* Performance Summary Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-2xl border border-blue-100 dark:border-blue-900/20 text-center">
                      <p className="text-xl font-black text-blue-600 dark:text-blue-400">
                        {attemptDetails.score}<span className="text-xs font-bold opacity-50">/{attemptDetails.total_marks}</span>
                      </p>
                      <p className="text-[8px] font-black text-blue-600/60 dark:text-blue-400/60 uppercase tracking-widest">Score</p>
                    </div>
                    <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 text-center">
                      <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{attemptDetails.correct_answers}</p>
                      <p className="text-[8px] font-black text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-widest">Correct</p>
                    </div>
                    <div className="bg-rose-50/50 dark:bg-rose-900/10 p-3 rounded-2xl border border-rose-100 dark:border-rose-900/20 text-center">
                      <p className="text-xl font-black text-rose-600 dark:text-rose-400">{attemptDetails.wrong_answers}</p>
                      <p className="text-[8px] font-black text-rose-600/60 dark:text-rose-400/60 uppercase tracking-widest">Wrong</p>
                    </div>
                    <div className="bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                      <p className="text-xl font-black text-slate-800 dark:text-white">
                        {Math.round((attemptDetails.score / attemptDetails.total_marks) * 100)}%
                      </p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Accuracy</p>
                    </div>
                  </div>

                  {/* Per Question Breakdown */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                      Step Analysis
                      <span className="h-0.5 w-8 bg-blue-500 rounded-full"></span>
                    </h4>
                    
                    {attemptDetails.details?.map((detail, idx) => (
                      <div 
                        key={detail.question_id || idx}
                        className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                      >
                        {/* Question Header */}
                        <div className="p-4 bg-slate-50/50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start gap-3">
                          <div className="flex gap-3 min-w-0">
                            <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg text-xs font-black text-slate-400 shadow-sm border border-slate-100 dark:border-slate-800">
                              {idx + 1}
                            </span>
                            <p className="font-bold text-xs text-slate-800 dark:text-slate-100 pt-1 leading-relaxed">
                              {detail.question}
                            </p>
                          </div>
                          <span className={`shrink-0 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                            detail.status === 'correct' 
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                              : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
                          }`}>
                            {detail.status}
                          </span>
                        </div>

                        {/* Marking Breakdown */}
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Step Breakdown</span>
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                              Marks: <span className="text-blue-600 dark:text-blue-400">{detail.obtained_marks}</span> / {detail.total_marks}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {detail.marking_breakdown?.map((mark) => (
                              <div 
                                key={mark.id}
                                className="flex gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-50 dark:border-slate-800 group"
                              >
                                <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black">
                                  {mark.type}
                                </span>
                                <div className="flex-1 space-y-0.5">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Requirement</span>
                                    <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200">Value: {mark.value}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {mark.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-slate-500 italic text-xs">No details found.</div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                onClick={() => setSelectedAttemptId(null)}
                className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuiz;


