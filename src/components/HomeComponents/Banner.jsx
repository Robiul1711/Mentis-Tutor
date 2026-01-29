import React, { useEffect, useRef } from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import bannerthumbnail from "../../assets/images/bannerthumb.png";
import { MdArrowOutward } from "react-icons/md";
import VideoButton from "../common/VideoButton";
import { gsap } from "gsap";
import { useApiQuery } from "@/hooks/apiQuery";

const Banner = () => {
  const bannerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const extraTitleRef = useRef(null);
const { data, isLoading } = useApiQuery({
  queryKey: ["banner"], // Just the base key
  url: "/cms/home_page/banner_section",
});
const bannerData = data?.data?.banner_section
// console.log(bannerData)
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
        { y: 0, opacity: 1, duration: 0.8 }
      )
      tl.fromTo(
        extraTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4" // Overlap with previous animation
        )
        .fromTo(
          buttonRef.current,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3"
        );

      // Animate right section elements
      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotationY: 10 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.8 },
        "-=0.5" // Start slightly before left section finishes
      ).fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );
      
    }, bannerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className="section-padding-x py-12 md:py-20  overflow-hidden ">
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
            <Title level="title40">
            {bannerData?.title}
            </Title>
          </div>

          <Title
            ref={extraTitleRef}
            level="title20"
            className="dark:text-white !font-bold"
          >
     <span dangerouslySetInnerHTML={{ __html: bannerData?.description }}></span>
          </Title>
          <div ref={subtitleRef}>
            <Title
              level="title20"
              className="text-gray-600 dark:text-[#BABABA] leading-relaxed"
            >
             <span dangerouslySetInnerHTML={{ __html: bannerData?.sub_description }}></span>{" "}
     
            </Title>
          </div>

          <div
            ref={buttonRef}
            className="flex flex-col xs:flex-row justify-center gap-6 lg:justify-start"
          >
            <CommonButton
              link={"/dashboard"}
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
              link={"/dashboard"}
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
  className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-4"
>
  <div className="relative max-w-[550px] w-full">
    <div ref={imageRef}>
      {/* Check if video exists, otherwise show thumbnail */}
      {bannerData?.video ? (
        <video
          src={bannerData.video}
          poster={bannerData?.image || bannerthumbnail} // Use API image as poster
          controls
          className="w-full h-auto rounded-xl shadow-lg"
        />
      ) : (
        <img
          src={bannerData?.image || bannerthumbnail}
          alt="bannerthumbnail"
          className="w-full h-auto rounded-xl"
        />
      )}
    </div>

    {/* Only show the separate Play Button if you aren't using native video controls */}
    {!bannerData?.video && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <VideoButton />
      </div>
    )}

    <div ref={descriptionRef}>
      {/* Use dangerouslySetInnerHTML because your API returns <p> tags */}
      <div 
        className="text-Tertiary dark:text-white text-sm text-center mt-4 lg:text-base"
        dangerouslySetInnerHTML={{ __html: bannerData?.description }}
      />
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default Banner;
