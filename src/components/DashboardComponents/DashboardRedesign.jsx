import React, { useRef } from "react";
import TodoList from "./TodoList";
import SubjectsList from "./SubjectsList";
import ContinueWatching from "./ContinueWatching";
import ProgressOverview from "./ProgressOverview";
import TutorMessages from "./TutorMessages";
import PastPapersWidget from "./PastPapersWidget";
import ConfidenceWidget from "./ConfidenceWidget";

const DashboardRedesign = ({ dashboardData, onSectionChange, isLoading }) => {
  const data = dashboardData?.data || {};

  const videoRef = useRef(null);
  const vimeoContainerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);

  const continueWatching = data.continue_watching || {};

  const handleTimeUpdate = () => {
    if (
      videoRef.current &&
      continueWatching?.id &&
      !continueWatching?.vimeo_url
    ) {
      localStorage.setItem(
        `video-progress-${continueWatching.id}`,
        videoRef.current.currentTime,
      );
    }
  };

  // Map section tabs to subjects (icons are handled inside SubjectsList by title)
  const displaySubjects =
    data.section_tabs?.map((section) => ({
      id: section.id,
      title: section.title,
      lessons: `${section.total_lessons} Lessons`,
      isActive: section.is_active,
    })) || [];

  const progress = data.progress_overview || {};
  const tutorMessages = data.tutor_messages || {};
  const confidence = data.confidence || {
    topics: [],
    overall_percentage: 0,
    focus_next_needs_work: [],
  };
  const pastPapers = data.past_papers_widget || { years: {} };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[700px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-Primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Subjects List */}
      <SubjectsList
        subjects={displaySubjects}
        onSectionChange={onSectionChange}
        courseId={data.course?.id}
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Middle Column */}
        <div className="lg:col-span-8 space-y-6">
          <ContinueWatching
            continueWatching={continueWatching}
            videoRef={videoRef}
            vimeoContainerRef={vimeoContainerRef}
            vimeoPlayerRef={vimeoPlayerRef}
            handleTimeUpdate={handleTimeUpdate}
          />
          <div className="space-y-6 md:flex md:space-x-6">
            <div className="md:w-1/2">
              <TutorMessages tutorMessages={tutorMessages} />
            </div>
            <div className="md:w-1/2">
              <ProgressOverview progress={progress} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <ConfidenceWidget confidence={confidence} />

          <PastPapersWidget pastPapers={pastPapers} />

          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default DashboardRedesign;
