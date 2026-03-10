import { useApiQuery } from "@/hooks/apiQuery";
import React from "react";
import {
  FaRegClock,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const MyQuiz = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["quiz-attempts"],
    url: "/quiz-attempts",
    secure: true,
  });
  console.log(data?.quizzes)
  const [selectedAttemptId, setSelectedAttemptId] = React.useState(null);

  const { data: attemptDetails, isLoading: isDetailsLoading } = useApiQuery({
    queryKey: ["quiz-attempt-details", selectedAttemptId],
    url: `/quiz-attempts/${selectedAttemptId}`,
    secure: true,
    enabled: !!selectedAttemptId,
  });

  const quizAttempts = React.useMemo(() => {
    if (!data?.quizzes) return [];
    return data.quizzes.flatMap((quiz) =>

   

      (quiz.attempts || []).map((attempt) => ({
        id: attempt.attempt_id,
        quizId: quiz.quiz_id,
        title: quiz.quiz_title,
        author: quiz.user_name,
        totalAttempts: quiz.total_attempts,
        date: attempt.attempted_at,
        avatar: quiz.avatar, // Placeholder as API doesn't provide avatar
        questions: attempt.total_questions,
        score: attempt.score,
        correct: attempt.correct_answers,
        incorrect: attempt.wrong_answers,
        result: attempt.result, // "fail" or "pass"`
      })),
    );
  }, [data]);

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          My Quiz Attempts
        </h2>
        <p className="text-Tertiary text-base sm:text-lg dark:text-gray-400 mt-2">
          Track your quiz performance and revisit your attempts.
        </p>
      </div>

      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden lg:block overflow-x-auto bg-white dark:bg-[#0B1120] rounded-lg shadow">
        <table className="w-full text-left border-collapse dark:border">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0B1120] dark:text-white text-gray-700 text-sm">
              <th className="p-4 font-medium">Quiz info</th>
              <th className="p-4 font-medium">Question</th>
              <th className="p-4 font-medium">Total Marks</th>
              <th className="p-4 font-medium">Correct Answer</th>
              <th className="p-4 font-medium">Incorrect Answer</th>
              <th className="p-4 font-medium">Result</th>
              <th className="p-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : quizAttempts.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No attempts found.
                </td>
              </tr>
            ) : (
              quizAttempts.map((attempt, idx) => (
                <tr
                  key={attempt.id}
                  className={`border-b text-sm ${
                    idx % 2 === 0
                      ? "bg-white dark:bg-[#0B1120]"
                      : "bg-[#FAF7F5] dark:bg-[#0B1120]"
                  }`}
                >
                  {/* Quiz info */}
                  <td className="p-4">
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                      {attempt.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400 text-xs">
                      {/* {console.log(attempt)} */}
                      <img
                        src={attempt.avatar}
                        alt={attempt.author}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{attempt.author}</span>
                      <FaRegClock className="text-gray-400" />
                      <span>{attempt.totalAttempts} Attempts</span>
                    </div>
                  </td>

                  {/* Question */}
                  <td className="p-4">{attempt.questions}</td>
                  {/* Total Marks */}
                  <td className="p-4">{attempt.score}</td>
                  {/* Correct */}
                  <td className="p-4">{attempt.correct}</td>
                  {/* Incorrect */}
                  <td className="p-4">
                    {attempt.incorrect < 10
                      ? `0${attempt.incorrect}`
                      : attempt.incorrect}
                  </td>
                  {/* Result */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border capitalize ${
                        attempt.result?.toLowerCase() === "pass"
                          ? "text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20"
                          : "text-red-600 border-red-400 bg-red-50 dark:bg-red-900/20"
                      }`}
                    >
                      {attempt.result}
                    </span>
                  </td>
                  {/* Details */}
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedAttemptId(attempt.id)}
                      className="text-blue-600 font-medium hover:underline dark:text-blue-400"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (shown on mobile only) */}
      <div className="md:hidden space-y-4">
        {isLoading ? (
          <div className="text-center p-4">Loading...</div>
        ) : quizAttempts.length === 0 ? (
          <div className="text-center p-4">No attempts found.</div>
        ) : (
          quizAttempts.map((attempt) => (
            <div
              key={attempt.id}
              className="bg-white dark:bg-[#0B1120] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4"
            >

              {/* Quiz Header */}
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                  {attempt.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400 text-xs">
                  <img
                    src={attempt.avatar}
                    alt={attempt.author}
                    className="w-5 h-5 rounded-full"
                  />
                  <span>{attempt.author}</span>
                  <FaRegClock className="text-gray-400" />
                  <span>{attempt.date}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Questions
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {attempt.questions}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total Marks
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {attempt.score}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Correct
                  </div>
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {attempt.correct}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Incorrect
                  </div>
                  <div className="font-semibold text-red-600 dark:text-red-400">
                    {attempt.incorrect < 10
                      ? `0${attempt.incorrect}`
                      : attempt.incorrect}
                  </div>
                </div>
              </div>

              {/* Result and Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border capitalize ${
                    attempt.result?.toLowerCase() === "pass"
                      ? "text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20"
                      : "text-red-600 border-red-400 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  {attempt.result}
                </span>
                <button
                  onClick={() => setSelectedAttemptId(attempt.id)}
                  className="text-blue-600 font-medium hover:underline text-sm dark:text-blue-400"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tablet View (medium screens only) */}
      <div className="hidden md:block lg:hidden overflow-x-auto">
        <div className="min-w-[768px] bg-white dark:bg-[#0B1120] rounded-lg shadow">
          <table className="w-full text-left border-collapse dark:border">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#0B1120] dark:text-white text-gray-700 text-sm">
                <th className="p-3 font-medium">Quiz info</th>
                <th className="p-3 font-medium">Ques</th>
                <th className="p-3 font-medium">Marks</th>
                <th className="p-3 font-medium">Correct</th>
                <th className="p-3 font-medium">Incorrect</th>
                <th className="p-3 font-medium">Result</th>
                <th className="p-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center">
                    Loading...
                  </td>
                </tr>
              ) : quizAttempts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center">
                    No attempts found.
                  </td>
                </tr>
              ) : (
                quizAttempts.map((attempt, idx) => (
                  <tr
                    key={attempt.id}
                    className={`border-b text-sm ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-[#0B1120]"
                        : "bg-[#FAF7F5] dark:bg-[#0B1120]"
                    }`}
                  >
                    <td className="p-3">
                      <p className="font-medium text-gray-900 dark:text-white text-xs line-clamp-2">
                        {attempt.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400 text-xs">
                        <img
                          src={attempt.avatar}
                          alt={attempt.author}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="truncate">{attempt.author}</span>
                        <FaRegClock className="text-gray-400 shrink-0" />
                        <span className="text-xs">{attempt.date}</span>
                      </div>
                    </td>
                    <td className="p-3">{attempt.questions}</td>
                    <td className="p-3">{attempt.score}</td>
                    <td className="p-3">{attempt.correct}</td>
                    <td className="p-3">
                      {attempt.incorrect < 10
                        ? `0${attempt.incorrect}`
                        : attempt.incorrect}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${
                          attempt.result?.toLowerCase() === "pass"
                            ? "text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20"
                            : "text-red-600 border-red-400 bg-red-50 dark:bg-red-900/20"
                        }`}
                      >
                        {attempt.result}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedAttemptId(attempt.id)}
                        className="text-blue-600 font-medium hover:underline text-sm dark:text-blue-400"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Quiz Details Modal */}
      {selectedAttemptId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-[#0B1120] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0B1120]">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Quiz Details
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Review your answers and performance
                </p>
              </div>
              <button
                onClick={() => setSelectedAttemptId(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {isDetailsLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p>Loading attempt details...</p>
                </div>
              ) : attemptDetails ? (
                <div className="space-y-8">
                  {/* Summary Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {attemptDetails.score}
                      </div>
                      <div className="text-xs font-medium text-blue-600/70 dark:text-blue-400/70 uppercase tracking-wider">
                        Total Score
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {attemptDetails.total_questions}
                      </div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Questions
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                        {attemptDetails.correct_answers}
                      </div>
                      <div className="text-xs font-medium text-green-600/70 dark:text-green-400/70 uppercase tracking-wider">
                        Correct
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30 text-center">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                        {attemptDetails.wrong_answers}
                      </div>
                      <div className="text-xs font-medium text-red-600/70 dark:text-red-400/70 uppercase tracking-wider">
                        Wrong
                      </div>
                    </div>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                      Detailed Analysis
                    </h4>
                    {attemptDetails.details?.map((detail, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Question Header */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 flex gap-4">
                          <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg text-sm font-bold text-gray-500 dark:text-gray-400 shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                              {detail.question}
                            </p>
                          </div>
                          <div className="shrink-0">
                            {detail.status === "correct" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <FaCheckCircle className="text-xs" /> Correct
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                <FaTimesCircle className="text-xs" /> Wrong
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Answer Section */}
                        <div className="p-4 space-y-3">
                          {detail.status === "wrong" && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 rounded-lg bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 sm:w-24 sm:shrink-0 pt-0.5">
                                Your Answer
                              </span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {detail.your_answer}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                            <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 sm:w-24 sm:shrink-0 pt-0.5">
                              {detail.status === "correct"
                                ? "Your Answer"
                                : "Correct Answer"}
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {detail.status === "correct"
                                ? detail.your_answer
                                : detail.correct_answer}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No details found for this attempt.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0B1120] flex justify-end">
              <button
                onClick={() => setSelectedAttemptId(null)}
                className="px-6 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg transition-colors shadow-sm"
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
