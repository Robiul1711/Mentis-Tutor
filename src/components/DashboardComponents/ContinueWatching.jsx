import React, { useEffect } from "react";
import Player from "@vimeo/player";

const ContinueWatching = ({
  continueWatching,
  videoRef,
  vimeoContainerRef,
  vimeoPlayerRef,
  handleTimeUpdate,
}) => {
  const videoId = continueWatching?.video_id || continueWatching?.id;

  if (!videoId) return null;

  // Vimeo Logic
  useEffect(() => {
    let player = null;
    const container = vimeoContainerRef.current;

    if (container && continueWatching?.vimeo_url) {
      console.log("Initializing Vimeo Player for:", continueWatching.vimeo_url);
      player = new Player(container, {
        url: continueWatching.vimeo_url,
        responsive: true,
        autoplay: false,
        title: false,
        byline: false,
        portrait: false,
        badge: false,
        logo: false,
      });

      vimeoPlayerRef.current = player;

      const savedTime = localStorage.getItem(`video-progress-${videoId}`);
      if (savedTime) {
        player.setCurrentTime(parseFloat(savedTime)).catch(() => {});
      }

      player.on("timeupdate", (data) => {
        localStorage.setItem(`video-progress-${videoId}`, data.seconds);
      });
    }

    return () => {
      if (player) {
        player.destroy().catch(() => {});
      }
    };
  }, [videoId, continueWatching?.vimeo_url, vimeoContainerRef]);

  // Standard Video Resume Logic
  useEffect(() => {
    if (videoRef.current && videoId && !continueWatching?.vimeo_url) {
      const savedTime = localStorage.getItem(`video-progress-${videoId}`);
      if (savedTime) {
        videoRef.current.currentTime = parseFloat(savedTime);
      }
    }
  }, [videoId, continueWatching?.vimeo_url, videoRef]);

  const onStandardVideoTimeUpdate = () => {
    if (videoRef.current && videoId && !continueWatching?.vimeo_url) {
      localStorage.setItem(
        `video-progress-${videoId}`,
        videoRef.current.currentTime,
      );
    }
    if (handleTimeUpdate) handleTimeUpdate();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Continue Where You Left Off
            </h3>
            <p className="text-sm text-slate-500">
              {continueWatching.video_title} ({continueWatching.section_title})
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {continueWatching.section_title || "Lesson"}
          </div>
        </div>

        <div className="relative group">
          <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            {continueWatching?.vimeo_url ? (
              <div ref={vimeoContainerRef} className="w-full h-full"></div>
            ) : continueWatching?.video_url || continueWatching?.url ? (
              <video
                ref={videoRef}
                onTimeUpdate={onStandardVideoTimeUpdate}
                src={continueWatching.video_url || continueWatching.url}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-slate-400 text-sm italic">
                Video source not found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueWatching;


