import React, { useState, useEffect } from "react";
import Lessons from "../MyCoursesComponents/Leasons";
import { useApiQuery } from "@/hooks/apiQuery";
import { BsArrowRight, BsClock, BsThreeDots } from "react-icons/bs";
import { ClipboardList } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getSubjectIcon } from "../DashboardComponents/subjectIcons";

const MyCourses = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const location = useLocation();

  const { data, isLoading } = useApiQuery({
    queryKey: ["course-overview", 2],
    url: "/courses/overview/2",
    secure: true,
  });

  const sections = data?.sections || [];
  const activeSection = sections[activeSectionIndex];
  const videos = activeSection?.videos || [];

  // Handle section redirection from dashboard
  useEffect(() => {
    if (location.state?.section_title && sections.length > 0) {
      const index = sections.findIndex(
        (s) =>
          s.title.trim().toLowerCase() ===
          location.state.section_title.trim().toLowerCase(),
      );
      if (index !== -1) {
        setActiveSectionIndex(index);
        // Also set the first video of that section as current
        if (sections[index].videos?.[0]) {
          setCurrentVideo(sections[index].videos[0]);
        }
      }
    }
  }, [location.state, sections]);

  // Determine current, next and after-next videos
  const currentIndex = currentVideo
    ? videos.findIndex((v) => v.id === currentVideo.id)
    : 0;
  const currentVideoToDisplay = currentVideo || videos[0];
  const nextVideo = videos[currentIndex + 1];
  const afterNextVideo = videos[currentIndex + 2];

  // Handle video selection
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinueLearning = () => {
    if (nextVideo) {
      handleVideoSelect(nextVideo);
    } else if (sections[activeSectionIndex + 1]) {
      // If end of section, go to first video of next section
      setActiveSectionIndex(activeSectionIndex + 1);
      const nextSectionVideos = sections[activeSectionIndex + 1].videos || [];
      if (nextSectionVideos[0]) {
        handleVideoSelect(nextSectionVideos[0]);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[700px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4e94ff]"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* <h1 className="text-3xl font-extrabold text-[#1e293b] mb-4 md:mb-6 dark:text-slate-100 ">
        Lessons
      </h1> */}
      {/* Topic Tabs - Responsive Horizontal Scroll */}
      <div className="flex items-start gap-2 sm:gap-4 mb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-2">
        {sections.map((section, index) => {
          const isActive = activeSectionIndex === index;
          const iconConfig = getSubjectIcon(section.title);
          return (
            <div
              key={index}
              className="flex flex-col gap-1.5 min-w-max snap-start"
            >
              <button
                onClick={() => {
                  setActiveSectionIndex(index);
                  const firstVideo = section.videos?.[0];
                  if (firstVideo) {
                    handleVideoSelect(firstVideo);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 md:py-2 rounded-xl text-[13px] font-bold transition-all duration-300 whitespace-nowrap border ${
                  isActive
                    ? "bg-blue-500 border-blue-500 text-white shadow-sm shadow-blue-100"
                    : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 dark:bg-slate-900 dark:border-slate-800"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-md shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : `${iconConfig.bg} ${iconConfig.text}`
                  }`}
                >
                  {iconConfig.icon}
                </div>
                {section.title}
              </button>

              <div className="flex items-center justify-center gap-1.5">
                <span
                  className={`text-[10px] font-black uppercase tracking-tighter ${
                    isActive ? "text-blue-500" : "text-slate-400"
                  }`}
                >
                  {section.videos?.length || 0} Lessons
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  ">
        {/* Main Learning Hub */}
        <div className="md:col-span-8 xl:col-span-9">
          <Lessons
            activeCategory={activeSection?.title}
            lessonsCount={activeSection?.videos?.length || 0}
            currentVideo={currentVideoToDisplay}
          />
        </div>

        {/* Sidebar: Next Lesson & Progress */}
        <div className="md:col-span-4 xl:col-span-3">
          <div className="sticky top-6 space-y-4 ">
            {/* Main Progress Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
                Next Lesson
              </h2>

              {nextVideo ? (
                <div className="space-y-5">
                  {/* Active Lesson Mini-Card */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse"></div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-tight truncate">
                        {nextVideo.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={handleContinueLearning}
                    className="w-full bg-[#4e94ff] hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group  active:scale-[0.98]"
                  >
                    <span className="text-sm">Continue Learning</span>
                    <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Progress Section */}
                  <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                    {afterNextVideo && (
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Up next after that:
                        </p>
                        <p className="font-bold text-slate-700 dark:text-slate-100 text-xs leading-snug line-clamp-1">
                          {afterNextVideo.title}
                        </p>
                      </div>
                    )}

                    <div className="bg-slate-100 dark:bg-slate-800 h-1.5 w-full rounded-full overflow-hidden">
                      <div
                        className="bg-[#4e94ff] h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${((currentIndex + 1) / videos.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-100 uppercase tracking-tight">
                        Progress: {currentIndex + 1}/{videos.length}
                      </p>
                      <p className="text-[10px] font-black text-blue-500 italic">
                        {Math.round(((currentIndex + 1) / videos.length) * 100)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 dark:bg-slate-800 dark:border-slate-800">
                  <div className="text-3xl mb-2">🎉</div>
                  <h3 className="text-md font-bold text-blue-900 leading-tight">
                    Topic Completed!
                  </h3>
                  <p className="text-[11px] text-blue-600/80 mb-4 font-medium dark:text-slate-100">
                    You've mastered this section.
                  </p>
                  {sections[activeSectionIndex + 1] && (
                    <button
                      onClick={handleContinueLearning}
                      className="w-full bg-white text-blue-600 font-bold py-2.5 text-xs rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      Start Next Topic
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Curriculum List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  Curriculum
                </h2>
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg uppercase">
                  {videos.length} Lessons
                </span>
              </div>

              <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2">
                {videos.map((video, index) => {
                  const isActive = currentVideoToDisplay?.id === video.id;

                  return (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`group flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 shadow-sm"
                          : "bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                      }`}
                    >
                      {/* Number/Icon */}
                      <div
                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-[11px] transition-all ${
                          isActive
                            ? "bg-blue-500 text-white shadow-md shadow-blue-200 dark:shadow-none"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
                        }`}
                      >
                        {isActive ? (
                          <div className="flex items-center gap-0.5">
                            <div className="w-0.5 h-2 bg-white animate-[bounce_1s_infinite_0ms]" />
                            <div className="w-0.5 h-3 bg-white animate-[bounce_1s_infinite_200ms]" />
                            <div className="w-0.5 h-1.5 bg-white animate-[bounce_1s_infinite_400ms]" />
                          </div>
                        ) : (
                          String(index + 1).padStart(2, "0")
                        )}
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-bold text-xs truncate transition-colors ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                          }`}
                        >
                          {video.title}
                        </h4>
                        {isActive && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                              Running
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Play/Pause Visual Indicator */}
                      {isActive && (
                        <div className="text-blue-500">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        </div>
                      )}
                      {!isActive && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
