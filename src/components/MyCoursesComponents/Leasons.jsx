import React, { useState, useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { BsThreeDots } from "react-icons/bs";
import { FiDownload, FiFileText } from "react-icons/fi";
import {
  ConfidentIcon,
  NeedWoekIcon,
  OKIcon,
} from "../DashboardIcons/DashIcons";
import TaskModeQuiz from "./TaskModeQuiz";

const Lessons = ({ currentVideo, activeCategory, lessonsCount }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState("resources");
  const topRef = useRef(null);

  const videoRef = useRef(null);
  const vimeoContainerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);

  // Restore time for standard video
  useEffect(() => {
    if (videoRef.current && currentVideo?.id && !currentVideo?.vimeo_url) {
      const savedTime = localStorage.getItem(
        `video-progress-${currentVideo.id}`,
      );
      if (savedTime) {
        videoRef.current.currentTime = parseFloat(savedTime);
      }
    }
  }, [currentVideo, showQuiz]);

  // Handle Vimeo Player
  useEffect(() => {
    let player = null;

    if (vimeoContainerRef.current && currentVideo?.vimeo_url && !showQuiz) {
      // Initialize Vimeo Player
      player = new Player(vimeoContainerRef.current, {
        url: currentVideo.vimeo_url,
        responsive: true,
        autoplay: false,
      });

      vimeoPlayerRef.current = player;

      // Restore time
      const savedTime = localStorage.getItem(
        `video-progress-${currentVideo.id}`,
      );
      if (savedTime) {
        player.setCurrentTime(parseFloat(savedTime)).catch(() => {});
      }

      // Save time
      player.on("timeupdate", (data) => {
        localStorage.setItem(`video-progress-${currentVideo.id}`, data.seconds);
      });
    }

    return () => {
      if (player) {
        player.destroy().catch(() => {});
        vimeoPlayerRef.current = null;
      }
    };
  }, [currentVideo, showQuiz]);

  // Save time for standard video
  const handleTimeUpdate = () => {
    if (videoRef.current && currentVideo?.id && !currentVideo?.vimeo_url) {
      localStorage.setItem(
        `video-progress-${currentVideo.id}`,
        videoRef.current.currentTime,
      );
    }
  };

  useEffect(() => {
    if (currentVideo && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentVideo]);

  return (
    <div ref={topRef} className="space-y-6">
      {/* Category Header Card */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl md:rounded-[24px] p-5 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left Side: Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                {activeCategory}
              </h2>
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-500 text-[10px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-wider border border-blue-100 dark:border-blue-500/20">
                  {lessonsCount} Lessons
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  Curriculum V2
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Progress & Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-slate-800">
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  Overall Progress
                </span>
                <span className="text-sm font-black text-blue-500">45%</span>
              </div>
              <div className="h-1.5 w-32 md:w-40 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>

            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-90">
              <BsThreeDots size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9]">
        {/* Lesson Title & Switch */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#1e293b] dark:text-white mb-2">
              {showQuiz
                ? "Task Mode Quiz"
                : currentVideo?.title || "Tutorial: Type of Number and BODMAS"}
            </h3>
            {!showQuiz && (
              <div className="flex items-center gap-4 text-xs font-bold text-[#94a3b8]">
                <span className="flex items-center gap-2 uppercase">
                  Difficulty:{" "}
                  <span className="text-[#1e293b] dark:text-white">
                    Apprentice
                  </span>
                </span>
                <span className="text-[#cbd5e1]">|</span>
                <span className="flex items-center gap-2 uppercase">
                  Duration:{" "}
                  <span className="text-[#1e293b] dark:text-white">5 mins</span>
                </span>
              </div>
            )}
          </div>

          <div className="flex p-1 bg-[#f1f5f9] dark:bg-gray-800 rounded-xl border border-[#e2e8f0] dark:border-gray-700">
            <button
              onClick={() => setShowQuiz(false)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                !showQuiz
                  ? "bg-white dark:bg-[#1e293b] text-[#4e94ff] shadow-sm"
                  : "text-[#64748b] hover:text-[#1e293b]"
              }`}
            >
              Tutorial
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all relative ${
                showQuiz
                  ? "bg-white dark:bg-[#1e293b] text-[#4e94ff] shadow-sm"
                  : "text-[#64748b] hover:text-[#1e293b]"
              }`}
            >
              Quiz
              <span className="text-[10px] block font-normal leading-none opacity-60">
                Task Mode
              </span>
            </button>
          </div>
        </div>

        {showQuiz ? (
          <TaskModeQuiz />
        ) : (
          <>
            {/* Video Player */}
            <div className="w-full rounded-2xl overflow-hidden bg-black mb-8 aspect-video relative group border border-[#f1f5f9]">
              <div className="w-full h-full flex items-center justify-center">
                {currentVideo?.url || currentVideo?.vimeo_url ? (
                  currentVideo?.url ? (
                    <video
                      ref={videoRef}
                      onTimeUpdate={handleTimeUpdate}
                      src={currentVideo.url}
                      controls
                      className="w-full h-full object-contain"
                      poster={currentVideo.thumbnail || ""}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div
                      ref={vimeoContainerRef}
                      className="w-full h-full"
                    ></div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-4 text-white">
                    <div className="w-16 h-16 rounded-full bg-[#4e94ff] flex items-center justify-center animate-pulse">
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium opacity-60">
                      Select a lesson to start learning
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Confidence Meter Section */}
            <div className="bg-[#f8fafc] dark:bg-gray-800/50 rounded-xl p-2 md:p-4 mb-8 text-center border border-[#f1f5f9] dark:border-gray-700">
              <p className="text-[#64748b] dark:text-gray-400 font-bold text-[11px] md:text-sm uppercase tracking-wider mb-2">
                How do you feel about this lesson?
              </p>

              {/* flex-nowrap is the key here */}
              <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-4">
                {/* Confident */}
                <button className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 px-2 py-2 md:px-6 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-[#e2e8f0] dark:border-gray-700 hover:border-green-200 hover:bg-green-50 transition-all group active:scale-95">
                  <ConfidentIcon className="w-5 h-5 md:w-6 md:h-6 grayscale group-hover:grayscale-0 transition-all shrink-0" />
                  <span className="font-bold text-[10px] md:text-sm text-[#475569] dark:text-gray-300 truncate">
                    Confident
                  </span>
                </button>

                {/* Okay */}
                <button className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 px-2 py-2 md:px-6 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-[#e2e8f0] dark:border-gray-700 hover:border-yellow-200 hover:bg-yellow-50 transition-all group active:scale-95">
                  <OKIcon className="w-5 h-5 md:w-6 md:h-6 grayscale group-hover:grayscale-0 transition-all shrink-0" />
                  <span className="font-bold text-[10px] md:text-sm text-[#475569] dark:text-gray-300 truncate">
                    Okay
                  </span>
                </button>

                {/* Needs Work */}
                <button className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 px-2 py-2 md:px-6 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-[#e2e8f0] dark:border-gray-700 hover:border-red-200 hover:bg-red-50 transition-all group active:scale-95">
                  <NeedWoekIcon className="w-5 h-5 md:w-6 md:h-6 grayscale group-hover:grayscale-0 transition-all shrink-0" />
                  <span className="font-bold text-[10px] md:text-sm text-[#475569] dark:text-gray-300 truncate">
                    Needs Work
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Tabs: Resources & Comments */}
            <div className="border-t border-[#f1f5f9] dark:border-gray-700 pt-6">
              <div className="flex gap-8 mb-6 border-b border-[#f1f5f9] dark:border-gray-700">
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`pb-4 text-sm font-bold transition-all relative ${
                    activeTab === "resources"
                      ? "text-[#1e293b] dark:text-white border-b-2 border-[#4e94ff]"
                      : "text-[#94a3b8] hover:text-[#64748b]"
                  }`}
                >
                  Resources
                </button>
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`pb-4 text-sm font-bold transition-all relative ${
                    activeTab === "comments"
                      ? "text-[#1e293b] dark:text-white border-b-2 border-[#4e94ff]"
                      : "text-[#94a3b8] hover:text-[#64748b]"
                  }`}
                >
                  Comments
                </button>
              </div>

              {activeTab === "resources" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* Resource Button 1 */}
                  <button className="flex items-center justify-between p-3 md:p-4 bg-[#f8fafc] dark:bg-gray-800/50 rounded-xl md:rounded-2xl border border-slate-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all group active:scale-[0.98]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <FiDownload className="text-lg md:text-xl" />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white truncate w-full">
                          Template Notes Set
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
                          PDF • 2.4 MB
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Resource Button 2 */}
                  <button className="flex items-center justify-between p-3 md:p-4 bg-[#f8fafc] dark:bg-gray-800/50 rounded-xl md:rounded-2xl border border-slate-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all group active:scale-[0.98]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <FiFileText className="text-lg md:text-xl" />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white truncate w-full">
                          Question Packs
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
                          Quiz • 120 Qs
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-[#f8fafc] dark:bg-gray-800 rounded-2xl border border-[#f1f5f9] dark:border-gray-700">
                  <div className="flex gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="bg-white dark:bg-gray-700 border border-[#e2e8f0] dark:border-gray-600 rounded-xl p-3">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className="w-full bg-transparent outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-8 text-[#94a3b8]">
                    <p className="text-sm">
                      No comments yet. Be the first to ask a question!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Lessons;
