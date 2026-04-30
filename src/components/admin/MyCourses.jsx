import React, { useState } from "react";
import Lessons from "../MyCoursesComponents/Leasons";
import { useApiQuery } from "@/hooks/apiQuery";
import { BsArrowRight, BsClock, BsThreeDots } from "react-icons/bs";
import { ClipboardList } from "lucide-react";

const MyCourses = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);

  const { data, isLoading } = useApiQuery({
    queryKey: ["course-overview", 2],
    url: "/courses/overview/2",
    secure: true,
  });

  const sections = data?.sections || [];
  const activeSection = sections[activeSectionIndex];
  const videos = activeSection?.videos || [];

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4e94ff]"></div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-extrabold text-[#1e293b] mb-4 md:mb-6 ">
        Lessons
      </h1>
      {/* Topic Tabs - Responsive Horizontal Scroll */}
      <div className="flex items-start gap-4 mb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
        {sections.map((section, index) => {
          const isActive = activeSectionIndex === index;
          return (
            <div
              key={index}
              className="flex flex-col gap-1.5 min-w-max snap-start"
            >
              <button
                onClick={() => {
                  setActiveSectionIndex(index);
                  setCurrentVideo(null);
                }}
                className={`px-3 py-1.5 sm:px-5 md:py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 whitespace-nowrap border-2 ${
                  isActive
                    ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-100"
                    : "bg-white border-slate-50 text-slate-500 hover:border-slate-200"
                }`}
              >
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Learning Hub */}
        <div className="lg:col-span-9">
          <Lessons
            activeCategory={activeSection?.title}
            lessonsCount={activeSection?.videos?.length || 0}
            currentVideo={currentVideoToDisplay}
          />
        </div>

        {/* Sidebar: Next Lesson & Progress */}
        <div className="lg:col-span-3">
          <div className="sticky top-6 space-y-4">
            {/* Main Progress Card */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-black text-slate-800 mb-4 tracking-tight">
                Next Lesson
              </h2>

              {nextVideo ? (
                <div className="space-y-5">
                  {/* Active Lesson Mini-Card */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse"></div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 text-sm leading-tight truncate">
                        {nextVideo.title}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider mt-0.5">
                        <BsClock size={10} /> {nextVideo.duration || "6"} mins
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleContinueLearning}
                    className="w-full bg-[#4e94ff] hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-md shadow-blue-50 active:scale-[0.98]"
                  >
                    <span className="text-sm">Continue Learning</span>
                    <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Progress Section */}
                  <div className="pt-4 border-t border-slate-50">
                    {afterNextVideo && (
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Up next after that:
                        </p>
                        <p className="font-bold text-slate-700 text-xs leading-snug line-clamp-1">
                          {afterNextVideo.title}{" "}
                          <span className="text-slate-400 font-medium">
                            ({afterNextVideo.duration || "4"}m)
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="bg-slate-100 h-1.5 w-full rounded-full overflow-hidden">
                      <div
                        className="bg-[#4e94ff] h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${((currentIndex + 1) / videos.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
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
                <div className="text-center py-8 px-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <div className="text-3xl mb-2">🎉</div>
                  <h3 className="text-md font-bold text-blue-900 leading-tight">
                    Topic Completed!
                  </h3>
                  <p className="text-[11px] text-blue-600/80 mb-4 font-medium">
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

            {/* Secondary Card: Upcoming */}
            {nextVideo && (
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Upcoming
                  </h3>
                  <BsThreeDots className="text-slate-300 cursor-pointer hover:text-slate-500" />
                </div>
                <div className="flex items-center gap-3 p-2 bg-slate-50/50 rounded-xl border border-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <ClipboardList size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-700 text-xs truncate">
                      Multiples & Factors
                    </h4>
                    <p className="text-[9px] font-bold text-slate-400">
                      Section 2 • 6 mins
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
