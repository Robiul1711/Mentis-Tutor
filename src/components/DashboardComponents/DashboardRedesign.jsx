import React, { useState } from "react";
import {
  DashboardIcon,
  MessageIcon,
  PastPapersIcon,
  MyCourseIcon,
  MyQuizIcon,
  HelpIcon,
} from "@/components/DashboardIcons/DashIcons";
import {
  Cloud,
  Circle,
  ChevronRight,
  Plus,
  Play,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";

const DashboardRedesign = ({ dashboardData, onSectionChange, isLoading }) => {
  const data = dashboardData?.data || {};
  const [selectedBoard, setSelectedBoard] = useState("Edexcel");
  const [isPlaying, setIsPlaying] = useState(false);

  // Map section tabs to subjects if they exist
  const displaySubjects =
    data.section_tabs?.map((section, index) => ({
      id: section.id,
      title: section.title,
      lessons: `${section.total_lessons} Lessons`,
      isActive: section.is_active,
      color: section.is_active ? "bg-Primary" : "bg-slate-100 dark:bg-slate-800",
      textColor: section.is_active ? "text-white" : "text-slate-600",
      icon:
        section.title === "Number" ? (
          <Cloud size={18} fill="currentColor" />
        ) : section.title === "Algebra" ? (
          <Plus size={18} />
        ) : section.title === "Ratio" ? (
          <Circle size={10} fill="currentColor" className="text-Primary" />
        ) : section.title === "Graphs" ? (
          <Circle size={10} fill="currentColor" className="text-yellow-400" />
        ) : null,
    })) || [];

  const continueWatching = data.continue_watching || {};
  const progress = data.progress_overview || {};
  const tutorMessages = data.tutor_messages || {};
  const confidence = data.confidence || {
    topics: [],
    overall_percentage: 0,
    focus_next_needs_work: [],
  };
  const pastPapers = data.past_papers_widget || { years: {} };

  const confidenceColors = [
    "stroke-emerald-400",
    "stroke-yellow-400",
    "stroke-Primary",
    "stroke-orange-400",
  ];
  const confidenceBgColors = [
    "bg-emerald-400",
    "bg-yellow-400",
    "bg-Primary",
    "bg-orange-400",
  ];
  const confidenceCheckColors = [
    "text-emerald-500",
    "text-yellow-500",
    "text-Primary",
    "text-orange-500",
  ];

  return (
    <div
      className={`space-y-6 transition-opacity duration-300 ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {data.welcome_text || "Welcome Back!"}
        </h1>
      </div>

      {/* Top Subjects List */}
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {displaySubjects.map((subject) => (
          <div
            key={subject.id}
            className="flex flex-col items-center min-w-[120px]"
            onClick={() =>
              onSectionChange({
                section_title: subject.title,
                course_id: data.course?.id,
              })
            }
          >
            <div
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 ${subject.color} ${subject.textColor} cursor-pointer hover:shadow-md transition-shadow active:scale-95`}
            >
              {subject.icon && <span>{subject.icon}</span>}
              <span className="font-semibold dark:text-slate-100">{subject.title}</span>
            </div>
            {subject.lessons && (
              <span className="text-xs text-slate-500 mt-2 whitespace-nowrap">
                {subject.lessons}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Middle Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Topic Select / Resume Learning */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Quick Topic Select
              </h2>
              <button className="text-slate-400 hover:text-slate-600">
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Continue Where You Left Off
                </h3>
                <p className="text-sm text-slate-500">
                  {continueWatching.video_title} (
                  {continueWatching.section_title})
                </p>
              </div>

              <div className="relative group">
                <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl">
         
                      <iframe
                        src={continueWatching?.vimeo_url?.replace(
                          "vimeo.com",
                          "player.vimeo.com/video",
                        )}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  {continueWatching.section_title || "Lesson"}
                </div>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-Primary hover:opacity-90 text-white px-6 py-2 rounded-xl font-semibold transition-colors active:scale-95 shadow-lg shadow-Primary/20"
                >
                  {continueWatching.resume_label || "Resume"}
                </button>
              </div>
{/* 
              <p className="text-sm text-Primary font-medium">
                Recommended next step:{" "}
                <span className="text-slate-500">After this lesson → </span>
                <span className="hover:underline cursor-pointer font-bold">
                  {continueWatching.recommended_next_step}
                </span>
              </p> */}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Progress Overview
            </h2>
            <div className="space-y-3">
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
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tutor Messages */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                Tutor Messages
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#E7F7F1] rounded-xl flex items-center justify-center text-[#4FC29C]">
                  <MessageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Message from {tutorMessages.sender_name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {tutorMessages.humanize_date}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{tutorMessages.message}"
              </p>

              <Link to="/dashboard/message" className="w-full block text-center bg-Secondary hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-Secondary/20">
                {tutorMessages.open_messages_label || "Open Messages"}
              </Link>
            </div>
          </div>

          {/* Past Papers */}
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

          {/* Confidence Widget */}
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
                  {confidence.topics?.map((topic, i) => {
                    const totalBefore = confidence.topics
                      .slice(0, i)
                      .reduce((acc, t) => acc + t.percentage, 0);
                    const dashArray = `${topic.percentage} 100`;
                    const dashOffset = `-${totalBefore}`;
                    return (
                      <circle
                        key={i}
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={
                          confidenceColors[i % confidenceColors.length]
                        }
                        strokeWidth="3"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                      ></circle>
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    {confidence.overall_percentage}%
                  </span>
                </div>
              </div>

              <div className="w-full space-y-3">
                {confidence.topics?.map((topic, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${confidenceBgColors[i % confidenceBgColors.length]}`}
                      ></div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {topic.title}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {topic.percentage}%
                    </span>
                  </div>
                ))}
              </div>

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

                {confidence.focus_next_needs_work?.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${confidenceCheckColors[idx % confidenceCheckColors.length]}`}
                      ></div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {item}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-slate-300 group-hover:text-Primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default DashboardRedesign;
