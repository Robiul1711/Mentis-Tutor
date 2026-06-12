import React, { useState, useEffect, useRef } from "react";
import TaskModeQuiz from "./TaskModeQuiz";
import { useApiMutation } from "@/hooks/apiMutation";
import { useApiQuery } from "@/hooks/apiQuery";
import { useAuth } from "@/hooks/useAuth";

// Sub-components
import LessonHeader from "./LessonHeader";
import VideoPlayer from "./VideoPlayer";
import ConfidenceMeter from "./ConfidenceMeter";
import ResourcesTab from "./ResourcesTab";
import CommentsTab from "./CommentsTab";

const Lessons = ({ currentVideo, activeCategory, lessonsCount, isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState("resources");
  const [commentText, setCommentText] = useState("");
  const [optimisticFeedback, setOptimisticFeedback] = useState(null);
  const topRef = useRef(null);

  const videoRef = useRef(null);
  const vimeoContainerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);

  useEffect(() => {
    if (currentVideo && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setOptimisticFeedback(currentVideo?.user_feedback);
  }, [currentVideo]);

  // --- API Integrations ---

  // 1. Video Feedback (Confidence Status)
  const { mutate: saveFeedback } = useApiMutation({
    url: "/video-feedback/save",
    method: "POST",
    secure: true,
    showToast: true,
    invalidateKeys: ["course-overview"],
  });

  const handleFeedback = (status) => {
    if (!currentVideo?.id) return;
    setOptimisticFeedback(status);
    saveFeedback({
      course_video_id: currentVideo.id,
      status: status,
    });
  };

  // 2. Fetch Comments
  const { data: commentsData, isLoading: commentsLoading } = useApiQuery({
    queryKey: ["video-comments", currentVideo?.id],
    url: `/video-comments/${currentVideo?.id}`,
    enabled: !!currentVideo?.id && activeTab === "comments",
    secure: true,
  });

  // 3. Post Comment
  const { mutate: postComment, isPending: isPostingComment } = useApiMutation({
    url: "/video-comments",
    method: "POST",
    secure: true,
    invalidateKeys: ["video-comments"],
    onSuccess: () => {
      setCommentText("");
    },
  });

  const handleCommentSubmit = (e) => {
    if (e.key === "Enter" && commentText.trim() && !isPostingComment) {
      postComment({
        course_video_id: currentVideo.id,
        comment: commentText,
      });
    }
  };

  const handleCommentButtonClick = () => {
    if (commentText.trim() && !isPostingComment) {
      postComment({
        course_video_id: currentVideo.id,
        comment: commentText,
      });
    }
  };

  // 4. Delete Comment
  const { mutate: deleteComment } = useApiMutation({
    url: "/video-comments/delete",
    method: "DELETE", // The user provided "/video-comments/delete/8", usually delete is POST or DELETE. Assuming POST based on common patterns in this project or just providing the ID.
    secure: true,
    invalidateKeys: ["video-comments"],
    showToast: true,
  });

  const handleDeleteComment = (commentId) => {
    deleteComment(
      { id: commentId },
      {
        // If the API expects the ID in the URL, we might need to adjust.
        // But useApiMutation usually handles the URL.
        // If it's literally "/video-comments/delete/{id}", we can pass it in the call.
        url: `/video-comments/delete/${commentId}`,
      },
    );
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && currentVideo?.id && !currentVideo?.vimeo_url) {
      localStorage.setItem(
        `video-progress-${currentVideo.id}`,
        videoRef.current.currentTime,
      );
    }
  };

  return (
    <div ref={topRef} className="space-y-4">
      {/* Main Content Box */}
      <div className="sm:dark:bg-[#1E293B] rounded-xl  sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:border border-[#f1f5f9] dark:border-slate-800">
        <LessonHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          showQuiz={showQuiz}
          setShowQuiz={setShowQuiz}
          currentVideo={currentVideo}
          activeCategory={activeCategory}
          lessonsCount={lessonsCount}
        />

        {showQuiz ? (
          <TaskModeQuiz quizData={currentVideo?.quizzes?.[0]} />
        ) : (
          <>
            <VideoPlayer
              currentVideo={currentVideo}
              videoRef={videoRef}
              vimeoContainerRef={vimeoContainerRef}
              vimeoPlayerRef={vimeoPlayerRef}
              onTimeUpdate={handleTimeUpdate}
              showQuiz={showQuiz}
            />

            <ConfidenceMeter
              optimisticFeedback={optimisticFeedback}
              onFeedback={handleFeedback}
            />

            {/* Bottom Tabs Section */}
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
                <ResourcesTab />
              ) : (
                <CommentsTab
                  user={user}
                  commentsData={commentsData}
                  commentsLoading={commentsLoading}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onCommentSubmit={handleCommentSubmit}
                  onCommentButtonClick={handleCommentButtonClick}
                  isPostingComment={isPostingComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Lessons;
