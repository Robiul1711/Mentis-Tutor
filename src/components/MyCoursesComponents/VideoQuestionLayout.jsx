import React, { useState } from 'react';
import { Download, BookmarkPlus } from 'lucide-react';

const VideoQuestionLayout = () => {
  const [videos] = useState([
    {
      id: 1,
      title: "Q1: Graph Transformation",
      difficulty: "Apprentice",
      videoUrl: "https://example.com/video1.mp4", // Replace with actual video URL
      thumbnail: "" // Optional thumbnail
    },
    {
      id: 2,
      title: "Q2: Graph Transformation",
      difficulty: "Apprentice",
      videoUrl: "https://example.com/video2.mp4", // Replace with actual video URL
      thumbnail: "" // Optional thumbnail
    }
  ]);

  return (
   
      <div className="mt-10 space-y-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Video Area */}
            <div className="w-full h-180 bg-gray-200 flex items-center justify-center">
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
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {video.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                DIFFICULTY LEVEL: {video.difficulty}
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-Secondary text-white rounded-full text-sm font-medium  transition-colors">
                  <Download size={16} />
                  QUESTION
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  <BookmarkPlus size={16} />
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