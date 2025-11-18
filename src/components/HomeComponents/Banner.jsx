import React, { useEffect, useRef } from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import bannerthumbnail from "../../assets/images/bannerthumb.png";
import { MdArrowOutward } from "react-icons/md";
import VideoButton from "../common/VideoButton";
import { gsap } from "gsap";

const Banner = () => {
  const bannerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Animate left section elements sequentially
      tl.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4" // Overlap with previous animation
      )
      .fromTo(buttonRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      );

      // Animate right section elements
      tl.fromTo(imageRef.current,
        { scale: 0.8, opacity: 0, rotationY: 10 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.8 },
        "-=0.5" // Start slightly before left section finishes
      )
      .fromTo(descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    }, bannerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className="section-padding-x  dark:bg-[#0B1120]  py-12 lg:py-20 gap-10 lg:gap-16 overflow-hidden">
    <div 
      ref={bannerRef}
      className="flex flex-col-reverse lg:flex-row items-center justify-between"
    >
      {/* Left Text Section */}
      <div ref={leftSectionRef} className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mt-8 lg:mt-0">
        <div ref={titleRef}>
          <Title level="title48">
           Real Tutor. Real Progress. Real Results.
           
          </Title>
        </div>

        <div ref={subtitleRef}>
          <Title level="title20" className="text-gray-600 dark:text-[#BABABA] leading-relaxed">
           No matter your age you can get a grade 9 with me here at  <span className="text-Primary">Mentis.</span>
          </Title>
        </div>

        <div ref={buttonRef} className="flex justify-center gap-6 lg:justify-start">
          <CommonButton link={'/dashboard'} variant="secondary" className="mt-6 group ">
            {" "}
            Start Your 2 Day Free Trial{" "}
            <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
              {" "}
              <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />{" "}
            </span>{" "}
          </CommonButton>
          <CommonButton link={'/dashboard'} variant="secondary" className="mt-6 group bg-transparent border border-Primary hover:bg-Primary dark:!text-white dark:hover:!text-black !text-black ">
            {" "}
           Start your journey{" "}
            <span className="rounded-full p-1 border border-Secondary group-hover:bg-Secondary ">
              {" "}
              <MdArrowOutward className="text-Secondary text-2xl group-hover:text-white" />{" "}
            </span>{" "}
          </CommonButton>
        </div>
      </div>

      {/* Right Image Section */}
      <div ref={rightSectionRef} className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-4">
        <div className="relative max-w-[550px] w-full">
          <div ref={imageRef}>
            <img
              src={bannerthumbnail}
              alt="bannerthumbnail"
              className="w-full h-auto rounded-xl"
            />
          </div>
          {/* Centered Play Button */}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <VideoButton />
          </div>
          <div ref={descriptionRef}>
            <p className="text-Tertiary dark:text-white text-sm text-center mt-2 lg:text-base">
             Bite-sized videos that teach you the ins and outs of every topic in....
            </p>
          </div>
        </div>
      </div>
    </div>
      <Title level="title48" className="dark:text-white text-center mt-5 sm:mt-8 md:mt-10">
           Affordable hybrid tutoring - 24/7 real support for every CCSE student - add this
          </Title>

    </section>
  );
};

export default Banner;