import React, { useEffect, useRef, useContext, useState } from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import bannerthumbnail from "../../assets/images/bannerthumb.png";
import { MdArrowOutward } from "react-icons/md";
import VideoButton from "../common/VideoButton";
import { gsap } from "gsap";
import { useApiQuery } from "@/hooks/apiQuery";
import { AuthContext } from "@/context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Banner = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const extraTitleRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data, isLoading } = useApiQuery({
    queryKey: ["banner"], // Just the base key
    url: "/cms/home_page/banner_section",
  });

  const bannerData = data?.data?.banner_section;

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      toast.error("Please login first to start your journey!");
    }
  };

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
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Animate left section elements sequentially
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      );
      tl.fromTo(
        extraTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4", // Overlap with previous animation
        )
        .fromTo(
          buttonRef.current,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3",
        );

      // Animate right section elements
      tl.fromTo(
        rightSectionRef.current,
        { x: 100, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
        "-=1",
      );

      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotationY: 15 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1 },
        "-=0.7",
      ).fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      );
    }, bannerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className="section-padding-x py-8 sm:py-12 md:py-20  overflow-hidden ">
      <div
        ref={bannerRef}
        className="flex flex-col-reverse lg:flex-row items-center justify-between"
      >
        {/* Left Text Section */}
        <div
          ref={leftSectionRef}
          className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mt-8 lg:mt-0"
        >
          <div ref={titleRef}>
            <Title level="title40">{bannerData?.title}</Title>
          </div>

          <Title
            ref={extraTitleRef}
            level="title20"
            className="dark:text-white !font-bold"
          >
            <span
              dangerouslySetInnerHTML={{ __html: bannerData?.description }}
            ></span>
          </Title>
          <div ref={subtitleRef}>
            <Title
              level="title20"
              className="text-gray-600 dark:text-[#BABABA] leading-relaxed"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: bannerData?.sub_description,
                }}
              ></span>{" "}
            </Title>
          </div>

          <div
            ref={buttonRef}
            className="flex flex-col xs:flex-row justify-center gap-6 lg:justify-start"
          >
            <CommonButton
              onClick={handleDashboardClick}
              variant="secondary"
              className=" group "
            >
              {" "}
              {bannerData?.button_text}
              <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
                {" "}
                <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />{" "}
              </span>{" "}
            </CommonButton>
            <CommonButton
              onClick={handleDashboardClick}
              variant="secondary"
              className=" group bg-transparent border border-Primary hover:bg-Primary dark:!text-white dark:hover:!text-black !text-black "
            >
              {" "}
              {bannerData?.sub_button_text}
              <span className="rounded-full p-1 border border-Secondary group-hover:bg-Secondary ">
                {" "}
                <MdArrowOutward className="text-Secondary text-2xl group-hover:text-white" />{" "}
              </span>{" "}
            </CommonButton>
          </div>
        </div>

        {/* Right Image/Video Section */}
        <div
          ref={rightSectionRef}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-end "
        >
          <div className="relative w-full max-w-[600px] group">
            {/* Artistic Background Glow */}
            <div className="absolute -inset-4 bg-linear-to-r from-Primary/20 to-Secondary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>

            <div
              ref={imageRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900 z-10"
            >
              {bannerData?.video ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={bannerData.video}
                    poster={bannerData?.image || bannerthumbnail}
                    className="w-full h-full object-cover"
                    onEnded={() => setIsPlaying(false)}
                    onClick={toggleVideo}
                  />

                  {/* Overlay Play Button */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-300">
                      <VideoButton onClick={toggleVideo} />
                    </div>
                  )}

                  {/* Pause Button Visible on Hover when Playing */}
                  {isPlaying && isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-all duration-300">
                      <button
                        onClick={toggleVideo}
                        className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 transition-all scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={bannerData?.image || bannerthumbnail}
                    alt="bannerthumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <VideoButton />
                  </div>
                </div>
              )}
            </div>

            {/* Description / Caption Under Video */}
            <div
              ref={descriptionRef}
              className="mt-8 text-right relative z-10 pr-4"
            >
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-Primary/50"></div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 font-Inter tracking-wide uppercase">
                  {bannerData?.sub_title || "Watch how we work"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
