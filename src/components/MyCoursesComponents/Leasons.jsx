import React, { useState, useEffect, useRef } from "react";
import Player from '@vimeo/player';
import { BsThreeDots, BsDownload } from "react-icons/bs";
import { FiDownload, FiFileText } from "react-icons/fi";
import { ConfidentIcon, NeedWoekIcon, OKIcon } from "../DashboardIcons/DashIcons";
import Quiz from "./Quiz";

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
      const savedTime = localStorage.getItem(`video-progress-${currentVideo.id}`);
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
      const savedTime = localStorage.getItem(`video-progress-${currentVideo.id}`);
      if (savedTime) {
        player.setCurrentTime(parseFloat(savedTime)).catch(() => {});
      }

      // Save time
      player.on('timeupdate', (data) => {
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
      localStorage.setItem(`video-progress-${currentVideo.id}`, videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (currentVideo && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentVideo]);

  return (
    <div ref={topRef} className="bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9]">
      {/* Category Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-[#1e293b] dark:text-white">{activeCategory}</h2>
          <span className="bg-[#e0f2fe] text-[#4e94ff] text-xs font-bold px-3 py-1 rounded-full uppercase">
            {lessonsCount} Lessons
          </span>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-md justify-end">
          <span className="text-sm font-semibold text-[#64748b]">Progress: <span className="text-[#4e94ff]">45%</span></span>
          <div className="h-2 w-32 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#4e94ff]" style={{ width: "45%" }}></div>
          </div>
          <button className="text-gray-400"><BsThreeDots /></button>
        </div>
      </div>

      {/* Lesson Info & Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#1e293b] dark:text-white mb-2">
            {currentVideo?.title || "Tutorial: Type of Number and BODMAS"}
          </h3>
          {/* <div className="flex items-center gap-4 text-sm text-[#64748b]">
            <span className="flex items-center gap-2">Difficulty: <span className="text-[#1e293b] font-semibold">Apprentice</span></span>
            <span className="text-[#cbd5e1]">|</span>
            <span className="flex items-center gap-2">Duration: <span className="text-[#1e293b] font-semibold">5 mins</span></span>
          </div> */}
        </div>

        <div className="flex p-1 bg-[#f1f5f9] rounded-xl border border-[#e2e8f0]">
          <button
            onClick={() => setShowQuiz(false)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              !showQuiz ? "bg-white text-[#4e94ff] shadow-sm border-b-2 border-[#4e94ff]" : "text-[#64748b] hover:text-[#1e293b]"
            }`}
          >
            Tutorial
          </button>
          <button
            onClick={() => setShowQuiz(true)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all relative ${
              showQuiz ? "bg-white text-[#4e94ff] shadow-sm border-b-2 border-[#4e94ff]" : "text-[#64748b] hover:text-[#1e293b]"
            }`}
          >
            Quiz
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#4e94ff] rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full rounded-2xl overflow-hidden bg-gray-900 mb-8 aspect-video relative group">
        {showQuiz ? (
          <div className="p-6 bg-white dark:bg-gray-800 h-full overflow-y-auto">
            <Quiz quizData={currentVideo?.quizzes || []} />
          </div>
        ) : (
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
                   <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-lg font-medium opacity-60">Select a lesson to start learning</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Section */}
<div className="bg-[#f8fafc] dark:bg-gray-800/50 rounded-2xl p-5 md:p-6 mb-8 text-center">
  <p className="text-[#64748b] dark:text-gray-400 font-semibold text-sm mb-4">
    How do you feel about this lesson?
  </p>
  
  {/* Grid Layout: 
      - 1 column on tiny screens 
      - 3 columns (or flex) on larger screens 
  */}
  <div className="grid grid-cols-1 sm:flex sm:flex-wrap justify-center gap-3 md:gap-4">
    
    {/* Confident Button */}
    <button className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl border border-[#e2e8f0] dark:border-gray-700 hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group">
      <ConfidentIcon className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
      <span className="font-bold text-sm text-[#475569] dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400">
        Confident
      </span>
    </button>

    {/* Okay Button */}
    <button className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl border border-[#e2e8f0] dark:border-gray-700 hover:border-yellow-200 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all group">
      <OKIcon className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
      <span className="font-bold text-sm text-[#475569] dark:text-gray-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-400">
        Okay
      </span>
    </button>

    {/* Needs Work Button */}
    <button className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl border border-[#e2e8f0] dark:border-gray-700 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group">
      <NeedWoekIcon className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
      <span className="font-bold text-sm text-[#475569] dark:text-gray-300 group-hover:text-red-700 dark:group-hover:text-red-400 whitespace-nowrap">
        Needs Work
      </span>
    </button>
    
  </div>
</div>

      {/* Bottom Tabs */}
      <div className="border-t border-[#f1f5f9] pt-6">
        <div className="flex gap-8 mb-6 border-b border-[#f1f5f9]">
          <button
            onClick={() => setActiveTab("resources")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "resources" ? "text-[#1e293b] border-b-2 border-[#4e94ff]" : "text-[#94a3b8] hover:text-[#64748b]"
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "comments" ? "text-[#1e293b] border-b-2 border-[#4e94ff]" : "text-[#94a3b8] hover:text-[#64748b]"
            }`}
          >
            Comments
          </button>
        </div>

        {activeTab === "resources" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] hover:bg-white hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <FiDownload className="text-[#4e94ff] text-xl" />
                <span className="font-bold text-[#1e293b]">Template Notes Set</span>
              </div>
              <svg className="w-4 h-4 text-[#94a3b8] group-hover:text-[#4e94ff] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="flex-1 flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] hover:bg-white hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <FiFileText className="text-[#4e94ff] text-xl" />
                <span className="font-bold text-[#1e293b]">Question Packs</span>
              </div>
              <svg className="w-4 h-4 text-[#94a3b8] group-hover:text-[#4e94ff] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
