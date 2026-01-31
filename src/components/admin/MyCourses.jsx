import React, { useState } from "react";
import Leasons from "../MyCoursesComponents/Leasons";
import Overview from "../MyCoursesComponents/Overview";
import Quiz from "../MyCoursesComponents/Quiz";
import Resource from "../MyCoursesComponents/Resource";
import Comment from "../MyCoursesComponents/Comment";
import Topic from "../DashboardComponents/Topic";
import { useApiQuery } from "@/hooks/apiQuery";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentVideo, setCurrentVideo] = useState(null);

  // Handle video selection from Topic component
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Common button style
  const tabButton = (tab) =>
    `md:py-3 md:px-8 sm:py-2 sm:px-4 py-0.5 px-4 rounded-full border transition duration-300 ${
      activeTab === tab
        ? "bg-Secondary text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`;

  const { data, isLoading } = useApiQuery({
    queryKey: ["course-overview"], // Just the base key
    url: "/courses/overview/3",
    secure: true,
  });

  return (
    <div>
      <Leasons currentVideo={currentVideo} />
      <div className="flex flex-wrap gap-4 md:gap-6 my-4 md:py-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={tabButton("overview")}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("resource")}
          className={tabButton("resource")}
        >
          Resource
        </button>
        {/* <button onClick={() => setActiveTab('quiz')} className={tabButton('quiz')}>Quiz</button> */}
        <button
          onClick={() => setActiveTab("comments")}
          className={tabButton("comments")}
        >
          Comments
        </button>
      </div>

      <div>
        {activeTab === "overview" && (
          <Overview data={data} onVideoSelect={handleVideoSelect} />
        )}
        {activeTab === "resource" && <Resource />}
        {/* {activeTab === 'quiz' && <Quiz />} */}
        {activeTab === "comments" && <Comment />}
      </div>
    </div>
  );
};

export default MyCourses;
