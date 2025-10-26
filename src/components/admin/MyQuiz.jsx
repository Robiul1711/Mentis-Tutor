import React from "react";
import { FaRegClock } from "react-icons/fa";

const quizData = [
  {
    id: 1,
    title: "Strengthen Your Basics in Numbers Prime Factors, Fractions & Decimals",
    author: "Ekramul Haque",
    date: "July 11, 2025",
    avatar: "https://i.pravatar.cc/40?img=3",
    questions: 12,
    totalMarks: 12,
    correct: 11,
    incorrect: 1,
    result: "Pass",
  },
  {
    id: 2,
    title: "Strengthen Your Basics in Numbers Prime Factors, Fractions & Decimals",
    author: "Ekramul Haque",
    date: "July 11, 2025",
    avatar: "https://i.pravatar.cc/40?img=3",
    questions: 12,
    totalMarks: 12,
    correct: 11,
    incorrect: 1,
    result: "Fail",
  },
  {
    id: 3,
    title: "Strengthen Your Basics in Numbers Prime Factors, Fractions & Decimals",
    author: "Ekramul Haque",
    date: "July 11, 2025",
    avatar: "https://i.pravatar.cc/40?img=3",
    questions: 12,
    totalMarks: 12,
    correct: 11,
    incorrect: 1,
    result: "Pass",
  },
  {
    id: 4,
    title: "Strengthen Your Basics in Numbers Prime Factors, Fractions & Decimals",
    author: "Ekramul Haque",
    date: "July 11, 2025",
    avatar: "https://i.pravatar.cc/40?img=3",
    questions: 12,
    totalMarks: 12,
    correct: 11,
    incorrect: 1,
    result: "Fail",
  },
];

const MyQuiz = () => {
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
            {quizData.map((quiz, idx) => (
              <tr
                key={quiz.id}
                className={`border-b text-sm ${
                  idx % 2 === 0 
                    ? "bg-white dark:bg-[#0B1120]" 
                    : "bg-[#FAF7F5] dark:bg-[#0B1120]"
                }`}
              >
                {/* Quiz info */}
                <td className="p-4">
                  <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                    {quiz.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400 text-xs">
                    <img
                      src={quiz.avatar}
                      alt={quiz.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{quiz.author}</span>
                    <FaRegClock className="text-gray-400" />
                    <span>{quiz.date}</span>
                  </div>
                </td>

                {/* Question */}
                <td className="p-4">{quiz.questions}</td>
                {/* Total Marks */}
                <td className="p-4">{quiz.totalMarks}</td>
                {/* Correct */}
                <td className="p-4">{quiz.correct}</td>
                {/* Incorrect */}
                <td className="p-4">
                  {quiz.incorrect < 10 ? `0${quiz.incorrect}` : quiz.incorrect}
                </td>
                {/* Result */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      quiz.result === "Pass"
                        ? "text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20"
                        : "text-red-600 border-red-400 bg-red-50 dark:bg-red-900/20"
                    }`}
                  >
                    {quiz.result}
                  </span>
                </td>
                {/* Details */}
                <td className="p-4">
                  <button className="text-blue-600 font-medium hover:underline dark:text-blue-400">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (shown on mobile and tablet) */}
      <div className="lg:hidden space-y-4">
        {quizData.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white dark:bg-[#0B1120] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4"
          >
            {/* Quiz Header */}
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                {quiz.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400 text-xs">
                <img
                  src={quiz.avatar}
                  alt={quiz.author}
                  className="w-5 h-5 rounded-full"
                />
                <span>{quiz.author}</span>
                <FaRegClock className="text-gray-400" />
                <span>{quiz.date}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
                <div className="font-semibold text-gray-900 dark:text-white">{quiz.questions}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Marks</div>
                <div className="font-semibold text-gray-900 dark:text-white">{quiz.totalMarks}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
                <div className="font-semibold text-green-600 dark:text-green-400">{quiz.correct}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Incorrect</div>
                <div className="font-semibold text-red-600 dark:text-red-400">
                  {quiz.incorrect < 10 ? `0${quiz.incorrect}` : quiz.incorrect}
                </div>
              </div>
            </div>

            {/* Result and Action */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${
                  quiz.result === "Pass"
                    ? "text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20"
                    : "text-red-600 border-red-400 bg-red-50 dark:bg-red-900/20"
                }`}
              >
                {quiz.result}
              </span>
              <button className="text-blue-600 font-medium hover:underline text-sm dark:text-blue-400">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet View (medium screens) */}
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
              {quizData.map((quiz, idx) => (
                <tr
                  key={quiz.id}
                  className={`border-b text-sm ${
                    idx % 2 === 0 
                      ? "bg-white dark:bg-[#0B1120]" 
                      : "bg-[#FAF7F5] dark:bg-[#0B1120]"
                  }`}
                >
                  <td className="p-3">
                    <p className="font-medium text-gray-900 dark:text-white text-xs line-clamp-2">
                      {quiz.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400 text-xs">
                      <img
                        src={quiz.avatar}
                        alt={quiz.author}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="truncate">{quiz.author}</span>
                      <FaRegClock className="text-gray-400 flex-shrink-0" />
                      <span className="text-xs">{quiz.date}</span>
                    </div>
                  </td>
                  <td className="p-3">{quiz.questions}</td>
                  <td className="p-3">{quiz.totalMarks}</td>
                  <td className="p-3">{quiz.correct}</td>
                  <td className="p-3">
                    {quiz.incorrect < 10 ? `0${quiz.incorrect}` : quiz.incorrect}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        quiz.result === "Pass"
                          ? "text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20"
                          : "text-red-600 border-red-400 bg-red-50 dark:bg-red-900/20"
                      }`}
                    >
                      {quiz.result}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 font-medium hover:underline text-sm dark:text-blue-400">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyQuiz;