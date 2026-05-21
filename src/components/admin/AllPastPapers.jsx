import React, { useState, useEffect } from "react";
import {
  Download,
  Play,
  FileText,
  CheckCircle,
  Lock,
  Upload,
  Check,
  BookOpen,
} from "lucide-react";
import { GiProgression } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";

// ============================
// DYNAMIC CONSTANTS
// ============================
// const YEARS = [ 2023];
const PAPERS = ["P1", "P2", "P3"];
const EXAM_BOARDS = ["Edexcel", "AQA"];

// ============================
// COMPONENTS
// ============================

const PastPapers = ({
  selectedBoard,
  setSelectedBoard,
  selectedYear,
  setSelectedYear,
  selectedPaper,
  setSelectedPaper,
  availableYears,
}) => {
  return (
    <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 xl:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <h2 className="text-slate-900 dark:text-white text-xl font-bold">
          Past Papers
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full flex">
          {EXAM_BOARDS.map((board) => (
            <button
              key={board}
              onClick={() => setSelectedBoard(board)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedBoard === board
                  ? "bg-Secondary text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {board}
            </button>
          ))}
        </div>
      </div>

      {/* YEAR + PAPER BUTTONS */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {availableYears.map((year) => (
          <div
            key={year}
            className="group flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 rounded-xl py-2  px-3 transition-all duration-300 hover:border-Secondary/30"
          >
            <span className="text-slate-700 dark:text-slate-300 font-bold mb-3 sm:mb-0">
              {year}
            </span>

            <div className="flex gap-2">
              {PAPERS.map((paper) => {
                const isActive =
                  selectedYear === String(year) && selectedPaper === paper;
                return (
                  <button
                    key={paper}
                    onClick={() => {
                      setSelectedYear(String(year));
                      setSelectedPaper(paper);
                    }}
                    className={`min-w-[50px] px-3 py-2 rounded-lg font-bold text-xs border transition-all duration-300
                     ${
                       isActive
                         ? "bg-Secondary text-white border-Secondary shadow-lg shadow-Secondary/20 scale-105"
                         : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-Secondary hover:text-Secondary"
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
  selectedBoard,
  selectedYear,
  selectedPaper,
  activePaperData,
  activeQuestion,
  setActiveQuestion,
  isLoading,
}) => {
  // console.log(activePaperData);
  const questions = activePaperData?.question_groups || [];
  const isComingSoon =
    activePaperData?.type === "coming_soon" ||
    (activePaperData && questions.length === 0);

  return (
    <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 xl:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-slate-900 dark:text-white text-lg xl:text-xl font-bold mb-1">
          {selectedYear && selectedPaper
            ? `${selectedBoard} AS LEVEL ${selectedPaper} ${selectedYear}`
            : "Select a Paper"}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {isComingSoon
            ? "This paper is not yet available."
            : "Choose a question to watch the video solution:"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-10 h-10 border-4 border-Secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 animate-pulse">Fetching questions...</p>
        </div>
      ) : !selectedYear || !selectedPaper ? (
        <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
            <FileText size={32} className="text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 italic">
            Select a year & paper from the left to view questions
          </p>
        </div>
      ) : isComingSoon ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-full mb-4">
            <Lock size={32} className="text-amber-500" />
          </div>
          <h3 className="text-amber-600 dark:text-amber-400 font-bold text-lg mb-1">
            Coming Soon
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[200px]">
            We are working on adding questions for this paper.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setActiveQuestion(q)}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-300 text-left hover:bg-Secondary hover:text-white
                
              `}
            >
              <span className="font-bold text-sm tracking-wide">{q.title}</span>
              <div
                className={`p-1.5 rounded-full transition-colors ${activeQuestion?.id === q.id ? "bg-Secondary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-Secondary"}`}
              >
                <Play
                  size={14}
                  fill={activeQuestion?.id === q.id ? "currentColor" : "none"}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Paper Documents Component
const PaperDocuments = ({ activePaperData }) => {
  return (
    <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 xl:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-fit">
      <h2 className="text-slate-900 dark:text-white text-lg xl:text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="text-Secondary dark:text-white" size={24} />
        Paper Documents
      </h2>

      <div className="space-y-3">
        <a
          href={activePaperData?.question_pdf}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-between group py-2 px-3 rounded-xl border transition-all duration-300 
            ${
              activePaperData?.question_pdf
                ? "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-Secondary hover:bg-white dark:hover:bg-[#0B1120] text-slate-700 dark:text-slate-300"
                : "opacity-50 cursor-not-allowed border-dashed bg-slate-100 dark:bg-slate-900/30 text-slate-400"
            }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500">
              <Download size={20} />
            </div>
            <span className="font-semibold text-sm">Question Paper</span>
          </div>
          {activePaperData?.question_pdf && (
            <CheckCircle
              size={16}
              className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </a>

        <a
          href={activePaperData?.mark_scheme_pdf}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-between group py-2 px-3 rounded-xl border transition-all duration-300 
            ${
              activePaperData?.mark_scheme_pdf
                ? "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-Secondary hover:bg-white dark:hover:bg-[#0B1120] text-slate-700 dark:text-slate-300"
                : "opacity-50 cursor-not-allowed border-dashed bg-slate-100 dark:bg-slate-900/30 text-slate-400"
            }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-green-500">
              <Download size={20} />
            </div>
            <span className="font-semibold text-sm">Mark Scheme</span>
          </div>
          {activePaperData?.mark_scheme_pdf && (
            <CheckCircle
              size={16}
              className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </a>

        <Link
          to={`/dashboard/past-paper-progress-tracker`}
          className="w-full flex items-center gap-3 py-2 px-3 rounded-xl border border-Secondary/30 bg-Secondary/5 text-Secondary hover:bg-Secondary hover:text-white transition-all duration-300 shadow-sm"
        >
          <div className="p-2 rounded-lg bg-white/20 dark:bg-slate-800">
            <GiProgression size={20} />
          </div>
          <span className="font-bold text-sm">Progress Tracker</span>
        </Link>
      </div>

      {!activePaperData && (
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 italic">
          Select a paper to unlock documents
        </p>
      )}
    </div>
  );
};

// Video Show Section
const VideoPlayerSection = ({ question, paperId }) => {
  const [marksObtained, setMarksObtained] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const { mutate, isPending } = useApiMutation({
    url: `/past-paper/${paperId}/submit`,
    method: "POST",
    secure: true,
  });

  if (!question || !question.vimeo_url) return null;

  const parts = question.parts || [];

  // Initialize marks state for each part
  const handleMarkChange = (partId, value) => {
    // Prevent negative numbers
    if (value !== "" && Number(value) < 0) return;

    setMarksObtained((prev) => ({
      ...prev,
      [partId]: value,
    }));
  };

  const handleSaveMarks = () => {
    const formData = new FormData();
    parts.forEach((part) => {
      const key = part.submit_keys?.marks_key || `marks[${part.id}]`;
      formData.append(key, marksObtained[part.id] || 0);
    });

    mutate(formData, {
      onSuccess: (response) => {
        setSubmittedData(response?.data);
      },
    });
  };

  return (
    <div className=" bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500 ">
      {/* Header Section */}
      <div className="p-4 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {question.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Difficulty:{" "}
            <span className="text-Secondary font-medium">Apprentice</span>
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="px-4">
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-inner relative group border border-slate-200 dark:border-slate-700">
          <iframe
            src={`${question.vimeo_url.replace(
              "vimeo.com",
              "player.vimeo.com/video",
            )}?title=0&byline=0&portrait=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={question.title}
          ></iframe>
        </div>
      </div>

      {/* Bottom Section - Marks & Buttons */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
          My Marks
        </h3>

        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
          {/* Marks Inputs */}
          <div className="w-full md:w-1/2 space-y-3">
            {parts.map((part) => (
              <div key={part.id} className="flex items-center gap-4">
                <span className="text-slate-700 dark:text-slate-300 font-bold min-w-[40px]">
                  {part.sub_title}
                </span>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input
                    type="number"
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    }}
                    value={marksObtained[part.id] || ""}
                    onChange={(e) => handleMarkChange(part.id, e.target.value)}
                    className="w-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded py-1 font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-Secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex items-center gap-1.5 px-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="text-slate-600 dark:text-slate-400 font-bold">
                      {part.total_marks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <button
                disabled={isPending}
                onClick={handleSaveMarks}
                className="px-4 py-2 bg-Secondary hover:bg-Secondary/80 text-white font-bold rounded-md md:rounded-lg transition-all shadow-sm"
              >
                {isPending ? "Saving..." : "Save Marks"}
              </button>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Total Marks for {question.title}:{" "}
                <span className="text-slate-900 dark:text-white">
                  {submittedData?.obtained !== undefined
                    ? submittedData.obtained
                    : "___"}{" "}
                  / {question.total_marks}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full md:w-auto flex flex-wrap gap-3 text-xs sm:text-sm">
            <a
              href={question.question_image}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#5B89C1] hover:bg-[#4a72a1] text-white font-bold rounded-md md:rounded-lg transition-all shadow-sm"
            >
              <Upload size={18} />
              QUESTION
              {/* <Check size={16} className="ml-2" /> */}
            </a>

            <a
              href={question.mark_scheme_image}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-md md:rounded-lg hover:bg-slate-50 transition-all shadow-sm"
            >
              <BookOpen size={18} />
              MARK SCHEME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AllPastPapers() {
  const [selectedBoard, setSelectedBoard] = useState("Edexcel");
  const [selectedYear, setSelectedYear] = useState(""); // Default year as per user requirements
  const [selectedPaper, setSelectedPaper] = useState(""); // Default paper
  const [activeQuestion, setActiveQuestion] = useState(null);

  const { data: pastPaperResponse, isLoading } = useApiQuery({
    queryKey: ["past-paper", selectedBoard, selectedYear, selectedPaper],
    url: "/past-papers",
    params: {
      exam_board: selectedBoard,
      year: selectedYear,
      paper: selectedPaper,
    },
    secure: true,
  });

  // Fetch all papers for this board to get available years/papers
  const { data: allBoardPapersResponse } = useApiQuery({
    queryKey: ["all-board-papers", selectedBoard],
    url: "/past-papers",
    params: {
      exam_board: selectedBoard,
    },
    secure: true,
  });

  const availableYears = [
    ...new Set((allBoardPapersResponse?.data || []).map((p) => String(p.year))),
  ].sort((a, b) => b - a);

  // Set default year if not selected
  useEffect(() => {
    if (!selectedYear && availableYears.length > 0) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  // Since the API returns an array, we find the one that matches our filter
  // though if the API is working correctly with params, it should only return matched ones.
  const allPapers = pastPaperResponse?.data || [];
  const activePaperData = allPapers.length > 0 ? allPapers[0] : null;

  // Reset active question when paper changes
  useEffect(() => {
    setActiveQuestion(null);
  }, [selectedBoard, selectedYear, selectedPaper]);

  return (
    <div className="mx-auto overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Exam Resources
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Master your subjects with our curated collection of past papers and
          video solutions.
        </p>
      </div>

      {/* ========== GRID ========== */}
      <div className="flex flex-col lg:flex-row w-full gap-4 items-start">
 

        {/* centre column: questions + video */}
        <div className="w-full  h-fit flex flex-col gap-4">
          <QuestionGrid
            selectedBoard={selectedBoard}
            selectedYear={selectedYear}
            selectedPaper={selectedPaper}
            activePaperData={activePaperData}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            isLoading={isLoading}
          />
          <div>
            {activeQuestion ? (
              <VideoPlayerSection
                question={activeQuestion}
                paperId={activePaperData?.id}
              />
            ) : (
              <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full">
                    <Play size={32} className="text-slate-400" />
                  </div>
                  <h2 className="text-slate-900 dark:text-white text-xl font-bold">
                    Select a Question
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[300px]">
                    Choose a question from the grid above to watch the video
                    solution and track your marks.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* right sidebar: documents */}
        <div className="w-full lg:w-2/6 sticky top-8 gap-4 flex flex-col">
              <PastPapers
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedPaper={selectedPaper}
            setSelectedPaper={setSelectedPaper}
            availableYears={availableYears}
          />
          <PaperDocuments activePaperData={activePaperData} />
        </div>
      </div>

      {/* Video Content Section */}

      {/* Visual background decoration */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-Secondary/5 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-Secondary/5 rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}
