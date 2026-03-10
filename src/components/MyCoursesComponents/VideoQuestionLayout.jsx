import React, { useState } from "react";
import { Download, BookmarkPlus } from "lucide-react";

const VideoQuestionLayout = () => {
  const [videos] = useState([
    {
      id: 1,
      title: "Q1: Graph Transformation",
      difficulty: "Apprentice",
      videoUrl: "https://example.com/video1.mp4", // Replace with actual video URL
      thumbnail: "", // Optional thumbnail
    },
    {
      id: 2,
      title: "Q2: Graph Transformation",
      difficulty: "Apprentice",
      videoUrl: "https://example.com/video2.mp4", // Replace with actual video URL
      thumbnail: "", // Optional thumbnail
    },
  ]);

  return (
    <div className="mt-10 space-y-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white dark:bg-[#0B1120] dark:border rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Video Area */}
          <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              poster={video.thumbnail}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Content Area */}
          {/* Content Area */}
          <div className="p-4 sm:p-6">
            {/* Title */}
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {video.title}
            </h2>

            {/* Difficulty Level */}
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
              DIFFICULTY LEVEL: {video.difficulty}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-Secondary text-white rounded-full text-sm sm:text-base font-medium transition-colors hover:bg-Secondary/90">
                <Download size={16} className="shrink-0" />
                QUESTION
              </button>

              <button className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-full text-sm sm:text-base font-medium hover:border-gray-400 dark:bg-transparent dark:text-gray-200 dark:border-gray-600 dark:hover:border-gray-500 transition-colors">
                <BookmarkPlus size={16} className="shrink-0" />
                MARK SCHEME
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoQuestionLayout;
