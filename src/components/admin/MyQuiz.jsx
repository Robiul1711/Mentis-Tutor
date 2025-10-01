import React from "react";
import { FaRegClock } from "react-icons/fa";

const quizData = [
  {
    id: 1,
    title: "Strengthen Your Basics in Numbers Prime Factors, Fractions & Decimals",
    author: "Ekramul Haque",
    date: "July 11, 2025",
    avatar: "https://i.pravatar.cc/40?img=3", // replace with your own avatar
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
    <div className=" ">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">My Quiz Attempts</h2>
        <p className="text-Tertiary text-lg">
          Track your quiz performance and revisit your attempts.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
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
                  idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F5]"
                }`}
              >
                {/* Quiz info */}
                <td className="p-4">
                  <p className="font-medium text-gray-900">{quiz.title}</p>
                  <div className="flex items-center gap-2 mt-2 text-gray-600 text-xs">
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
                        ? "text-green-600 border-green-400 bg-green-50"
                        : "text-red-600 border-red-400 bg-red-50"
                    }`}
                  >
                    {quiz.result}
                  </span>
                </td>
                {/* Details */}
                <td className="p-4">
                  <button className="text-blue-600 font-medium hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyQuiz;
