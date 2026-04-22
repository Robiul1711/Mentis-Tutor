import React, { useState } from "react";
import Leasons from "../MyCoursesComponents/Leasons";
import Overview from "../MyCoursesComponents/Overview";
import Quiz from "../MyCoursesComponents/Quiz";
import Resource from "../MyCoursesComponents/Resource";
import Comment from "../MyCoursesComponents/Comment";
import Topic from "../DashboardComponents/Topic";
import { useApiQuery } from "@/hooks/apiQuery";
import { BsThreeDots } from "react-icons/bs";

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
  const currentIndex = currentVideo ? videos.findIndex(v => v.id === currentVideo.id) : 0;
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

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-[#1e293b] mb-6">Lessons</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={() => {
                setActiveSectionIndex(index);
                setCurrentVideo(null); // Reset current video to show first of new section
              }}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSectionIndex === index
                  ? "bg-[#4e94ff] text-white shadow-md"
                  : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
              }`}
            >
              {section.title}
            </button>
            <span className="text-[10px] text-[#94a3b8] mt-1 uppercase font-bold">
              {section.videos?.length || 0} Lessons
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <Leasons 
            activeCategory={activeSection?.title} 
            lessonsCount={activeSection?.videos?.length || 0}
            currentVideo={currentVideo || videos[0]} 
          />
          
          {/* Lesson List for the active section */}
          <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9]">
            <h2 className="text-xl font-bold text-[#1e293b] dark:text-white mb-6">Course Content</h2>
            {activeSection && <Topic data={[activeSection]} onVideoSelect={handleVideoSelect} />}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9]">
            <h2 className="text-lg font-bold text-[#1e293b] mb-4">Next Lesson</h2>
            {nextVideo ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#e0f2fe] flex items-center justify-center">
                    <img src="https://api.iconify.design/heroicons:academic-cap-20-solid.svg?color=%234e94ff" className="w-6 h-6" alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e293b] text-sm line-clamp-1">{nextVideo.title}</h3>
                    <p className="text-xs text-[#64748b]">Duration: {nextVideo.duration || '5'} mins</p>
                  </div>
                </div>
                <button 
                  onClick={handleContinueLearning}
                  className="w-full bg-[#4e94ff] hover:bg-[#3b82f6] text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 mb-4"
                >
                  Continue Learning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="p-4 bg-gray-50 rounded-xl mb-4 text-center">
                <p className="text-sm text-gray-500 font-medium">Category Completed! 🎉</p>
              </div>
            )}
            
            <div className="space-y-2 pt-4 border-t border-[#f1f5f9]">
              {afterNextVideo && (
                <>
                  <p className="text-sm font-medium text-[#64748b]">Up next after that:</p>
                  <p className="font-bold text-[#1e293b] text-sm line-clamp-1">{afterNextVideo.title} <span className="text-[#64748b] font-normal">({afterNextVideo.duration || '4'} mins)</span></p>
                </>
              )}
              <p className="text-sm text-[#64748b] pt-2 font-medium">Your progress: {currentIndex + 1} / {videos.length} completed</p>
            </div>
          </div>

          {/* Secondary card if needed, or remove duplicate */}
          {!nextVideo && sections[activeSectionIndex + 1] && (
            <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9]">
               <h2 className="text-lg font-bold text-[#1e293b] mb-4">Start Next Topic</h2>
               <div className="bg-[#f8fafc] rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e0f2fe] flex items-center justify-center">
                     <img src="https://api.iconify.design/heroicons:academic-cap-20-solid.svg?color=%230284c7" className="w-6 h-6" alt="" />
                  </div>
                  <div>
                     <h3 className="font-bold text-[#1e293b] text-sm">{sections[activeSectionIndex + 1].title}</h3>
                     <p className="text-xs text-[#64748b]">{sections[activeSectionIndex + 1].videos?.length} Lessons</p>
                  </div>
               </div>
               <button 
                onClick={handleContinueLearning}
                className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg font-bold text-sm"
               >
                 Start Topic
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
