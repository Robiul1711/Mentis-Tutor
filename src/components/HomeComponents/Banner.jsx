import React, { useContext, useState, useRef } from "react";
import bannerthumbnail from "@/assets/images/bannerthumb.png";
import { MdArrowForward } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import VideoButton from "../common/VideoButton";
import { useApiQuery } from "@/hooks/apiQuery";
import bannerImg from "@/assets/images/banner.jpg"
import { useAuth } from "@/hooks/useAuth";

// --- SKELETON LOADER COMPONENT ---
const BannerSkeleton = () => (
  <section className="section-padding-x py-8 sm:py-12 md:py-20 h-screen animate-pulse">
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 mt-8 lg:mt-0">
        <div className="h-10 md:h-14 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto lg:mx-0" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-[500px] mx-auto lg:mx-0" />
        <div className="space-y-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-5 w-5 bg-blue-100 dark:bg-blue-900 rounded-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-64" />
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-48" />
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-48" />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="w-full max-w-[600px] h-60 md:h-96  aspect-video bg-gray-200 dark:bg-gray-700 rounded-3xl" />
      </div>
    </div>
  </section>
);

// --- MAIN BANNER COMPONENT ---
const Banner = () => {
  const {user}=useAuth()
  console.log(user);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data, isLoading } = useApiQuery({
    queryKey: ["banner"],
    url: "/cms/home_page/banner_section",
  });

  const bannerData = data?.data?.banner_section;

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) return <BannerSkeleton />;

  return (
    <section className="section-padding-x py-8 sm:py-12 md:py-20 overflow-hidden bg-white  dark:bg-[#0f1524]">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
        
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-5 text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-[1.2]">
            A real GCSE tutor + <br className="hidden lg:block" /> a complete Grade 9 system.
          </h1>

          <p className="sm:text-lg md:text-xl text-[#475569] dark:text-[#BABABA] leading-relaxed max-w-[540px] mx-auto lg:mx-0">
            Mentis is the all-in-one GCSE Maths platform with tutor guidance whenever you need it.
          </p>

          <div className="flex flex-col gap-3.5 text-left mt-2 max-w-[540px] mx-auto lg:mx-0">
            {[
              "Grade 9 video lessons (Edexcel/AQA aligned)",
              "Task Mode practice + guided marking (model solutions)",
              "1-to-1 tutor messaging + Zoom when needed"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <FaCheck className="text-[#5698ff] sm:text-lg flex-shrink-0" />
                <p className="text-[#334155] dark:text-gray-200 text-sm sm:text-base lg:text-lg md:text-[19px]">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center lg:text-left">
            <p className="text-lg sm:text-xl text-[#1e293b] dark:text-white font-semibold">
              £30/month <span className="text-[#64748b] font-normal tracking-wide"> &bull; Cancel anytime</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
            <button
              onClick={() => scrollToSection("pricing")}
              className="bg-[#5a9cff] hover:bg-[#4585f0] text-white font-medium py-3 px-6 rounded-[10px] transition-all text-[17px] shadow-sm w-full sm:w-auto"
            >
              Start 2-Day Free Trial
            </button>
            <button 
              onClick={() => scrollToSection("whatInsideMentis")}
              className="bg-transparent border border-[#cbd5e1] hover:bg-gray-50 text-[#334155] font-medium py-3 px-6 rounded-[10px] transition-all flex items-center justify-center gap-2 text-[17px] shadow-sm w-full sm:w-auto dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
            >
              See what's inside <MdArrowForward className="text-xl" />
            </button>
          </div>

          <div className="mt-1 text-center lg:text-left">
            <p className="text-[15px] text-[#64748b] tracking-wide">
              Edexcel + AQA &bull; GCSE Maths only &bull; Tutor support included
            </p>
          </div>
        </div>

        {/* Right Image/Video Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
          <div className="relative w-full  group">
            {/* <div className="absolute -inset-4 bg-blue-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div> */}

            {/* <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900 z-10"
            > */}
              {/* {bannerData?.video ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={bannerData.video}
                    poster={bannerData?.image || bannerthumbnail}
                    className="w-full h-full object-cover cursor-pointer"
                    onEnded={() => setIsPlaying(false)}
                    onClick={toggleVideo}
                  />

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-300">
                      <VideoButton onClick={toggleVideo} />
                    </div>
                  )}

                  {isPlaying && isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-all duration-300 pointer-events-none">
                      <div className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ) : ( */}
                <div className="relative w-full h-full">
                  <img
                    src={bannerData?.image || bannerImg}
                    alt="banner thumbnail"
              className="w-full h-auto rounded-[30px] object-contain drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500" 
                  />
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <VideoButton />
                  </div> */}
                </div>
              {/* )} */}
            {/* </div> */}

            {/* <div className="mt-8 text-right relative z-10 pr-4">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-[#5a9cff]/50"></div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {bannerData?.sub_title || "Watch how we work"}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;