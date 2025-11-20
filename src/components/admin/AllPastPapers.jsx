import React, { useState } from "react";
import { Download } from "lucide-react";
import { GiProgression } from "react-icons/gi";
import { Link } from "react-router-dom";
import VideoQuestionLayout from "../MyCoursesComponents/VideoQuestionLayout";

// ============================
// DYNAMIC DATA
// ============================
const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
const PAPERS = ["P1", "P2", "P3"];

// Example questions data (API can replace this later)
const QUESTIONS_DATA = {
  "2017-P1": Array.from({ length: 20 }, (_, i) => i + 1),
  "2017-P2": Array.from({ length: 15 }, (_, i) => i + 1),
  "2017-P3": Array.from({ length: 12 }, (_, i) => i + 1),
  // Add more dynamically later…
};


// Pasr paper selection component
const PastPapers = ({
  selectedYear,
  setSelectedYear,
  selectedPaper,
  setSelectedPaper,
}) => {
  return (
    <div className="bg-Secondary dark:bg-[#0B1120] dark:border rounded-lg p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Past Papers</h2>

      {/* Exam Board Tabs */}
      <div className="flex gap-2 mb-6">
        {["Edexcel", "AQA", "OCR"].map((board) => (
          <button
            key={board}
            className="px-6 py-2 rounded-full font-medium bg-slate-600 text-white hover:bg-slate-500"
          >
            {board}
          </button>
        ))}
      </div>

      {/* YEAR + PAPER BUTTONS */}
      <div className="space-y-3">
        {YEARS.map((year) => (
          <div
            key={year}
            className="flex items-center justify-between bg-white dark:bg-[#0B1120] dark:border rounded-lg p-4"
          >
            <span className="text-slate-800 dark:text-white font-semibold">
              {year}
            </span>

            <div className="flex gap-2">
              {PAPERS.map((paper) => {
                const isActive =
                  selectedYear === year && selectedPaper === paper;

                return (
                  <button
                    key={paper}
                    onClick={() => {
                      setSelectedYear(year);
                      setSelectedPaper(paper);
                    }}
                    className={`px-4 py-1.5 rounded font-medium text-sm border transition-all duration-300
                     ${
                       isActive
                         ? "bg-Secondary text-white border-Secondary"
                         : "hover:bg-Secondary hover:text-white"
                     }
                    `}
                  >
                    {paper}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// Question Grid Component
const QuestionGrid = ({
  selectedYear,
  selectedPaper,
  questions,
  setActiveQuestion,
  setShowModal
}) => {

  const key = `${selectedYear}-${selectedPaper}`;
  const questionList = questions[key] || [];

  return (
    <div className="bg-white dark:bg-[#0B1120] dark:border rounded-lg p-6">
      <h2 className="text-slate-800 dark:text-white text-xl font-semibold mb-2">
        {selectedYear && selectedPaper
          ? `Edexcel AS LEVEL ${selectedPaper} ${selectedYear}`
          : "Select a year & paper"}
      </h2>

      {!selectedYear || !selectedPaper ? (
        <p className="text-slate-500 dark:text-gray-400 italic">
          Select a paper to view questions.
        </p>
      ) : (
        <>
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-6">
            Choose a question below:
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {questionList.map((num) => (
              <button
                key={num}
                onClick={() => {
                  setActiveQuestion(num);
                  setShowModal(true);
                }}
                className="px-4 py-2 rounded border cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-gray-200 text-left"
              >
                QUESTION {num}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


// Paper Documents Component
const PaperDocuments = () => {
  return (
    <div className="bg-white dark:bg-[#0B1120] dark:border rounded-lg p-6">
      <h2 className="text-slate-800 text-xl font-semibold mb-4 dark:text-white">
        PAPER DOCUMENTS
      </h2>

      <div className="space-y-3">
        <button className="w-full flex items-center gap-2 hover:bg-Secondary dark:text-white hover:text-white border border-Secondary text-slate-800 py-3 px-6 rounded-lg font-medium transition-colors">
          <Download size={20} /> Practice Questions Set
        </button>

        <button className="w-full flex items-center gap-2 hover:bg-Secondary dark:text-white hover:text-white border border-Secondary text-slate-800 py-3 px-6 rounded-lg font-medium transition-colors">
          <Download size={20} /> Mark Scheme
        </button>

        <Link
          to={`/dashboard/past-paper-progress-tracker`}
          className="w-full flex items-center gap-2 hover:bg-Secondary dark:text-white hover:text-white border border-Secondary text-slate-800 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          <GiProgression size={20} /> Progress Tracker
        </Link>
      </div>
    </div>
  );
};


// qustion modal component 
import { useEffect, useRef } from "react";

const QuestionModal = ({
  show,
  setShow,
  questionNumber,
  selectedYear,
  selectedPaper,
}) => {
  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, setShow]);

  if (!show) return null;

  const exampleQuestion = `This is the example question text for ${selectedPaper} - ${selectedYear}, Question ${questionNumber}.`;
  const options = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] px-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#0B1120] rounded-xl shadow-xl w-full max-w-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 dark:text-gray-300 dark:hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
          QUESTION {questionNumber}
        </h2>

        <p className="text-slate-700 dark:text-gray-300 mb-6">{exampleQuestion}</p>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <input type="radio" name="option" className="w-4 h-4" />
              <span className="text-slate-800 dark:text-gray-200">{opt}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          onClick={() => setShow(false)}
          className="w-full mt-6 bg-Secondary text-white py-3 rounded-lg font-medium hover:opacity-90"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};


export default function MyQuiz() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
const [activeQuestion, setActiveQuestion] = useState(null);
const [showModal, setShowModal] = useState(false);


  return (
    <div className="">

      {/* ========== GRID ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Past Papers */}
        <PastPapers
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedPaper={selectedPaper}
          setSelectedPaper={setSelectedPaper}
        />

        {/* Question Grid */}
<QuestionGrid
  selectedYear={selectedYear}
  selectedPaper={selectedPaper}
  questions={QUESTIONS_DATA}
  setActiveQuestion={setActiveQuestion}
  setShowModal={setShowModal}
/>

<QuestionModal
  show={showModal}
  setShow={setShowModal}
  questionNumber={activeQuestion}
  selectedYear={selectedYear}
  selectedPaper={selectedPaper}
/>


        {/* Paper Documents */}
        <PaperDocuments />
      </div>

      {/* Video Layout */}
      <VideoQuestionLayout />
    </div>
  );
}
