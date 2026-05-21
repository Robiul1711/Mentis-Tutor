import React from "react";
import Player from "@vimeo/player";
import { useEffect } from "react";

const VideoPlayer = ({
  currentVideo,
  videoRef,
  vimeoContainerRef,
  vimeoPlayerRef,
  onTimeUpdate,
  showQuiz,
}) => {
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
  }, [currentVideo, showQuiz, videoRef]);

  // Handle Vimeo Player
  useEffect(() => {
    let player = null;

    if (vimeoContainerRef.current && currentVideo?.vimeo_url && !showQuiz) {
      player = new Player(vimeoContainerRef.current, {
        url: currentVideo.vimeo_url,
        responsive: true,
        autoplay: false,
        title: false,
        byline: false,
        portrait: false,
        dnt: true,
        badge: false,
        logo: false,
      });

      vimeoPlayerRef.current = player;

      const savedTime = localStorage.getItem(
        `video-progress-${currentVideo.id}`,
      );
      if (savedTime) {
        player.setCurrentTime(parseFloat(savedTime)).catch(() => {});
      }

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
  }, [currentVideo, showQuiz, vimeoContainerRef, vimeoPlayerRef]);

  return (
    <div className="w-full rounded-2xl border border-[#e2e8f0] dark:border-slate-700 overflow-hidden mb-8 aspect-video relative group">
      <div className="w-full h-full flex items-center justify-center">
        {currentVideo?.url || currentVideo?.vimeo_url ? (
          currentVideo?.url ? (
            <video
              ref={videoRef}
              onTimeUpdate={onTimeUpdate}
              src={currentVideo.url}
              controls
              className="w-full h-full object-contain"
              poster={currentVideo.thumbnail || ""}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div ref={vimeoContainerRef} className="w-full h-full"></div>
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
  );
};

export default VideoPlayer;
