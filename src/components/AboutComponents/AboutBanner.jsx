import React, { useEffect, useRef } from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";
import dashboardImg from "@/assets/images/about.png";
import { FaPlay } from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutBanner = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const playRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none", // Play once, no reverse
        },
      });

      // Title
      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
      });

      // Description
      tl.from(
        descRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Button
      tl.from(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
        "-=0.3"
      );

      // Image
      tl.from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 35,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Play Button
      tl.from(playRef.current, {
        opacity: 0,
        scale: 0.3,
        duration: 0.5,
        ease: "back.out(1.8)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-x  ">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <div ref={titleRef}>
          <Title level="title48" className="">
            About Mentis Learning
          </Title>
        </div>

        <p
          ref={descRef}
          className="text-lg mt-4 leading-relaxed"
        >
          About Mentis Learning Modern tutoring with a mission helping every student unlock the
          confidence and results they deserve. No ceilings. No limits. No student left behind.
        </p>

        {/* Button */}
        <div
          ref={buttonRef}
          className="flex justify-center pt-2 sm:pt-4 lg:pt-6"
        >
          <CommonButton
            variant="secondary"
            className="mt-2 sm:mt-4 lg:mt-6 rounded-full group px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold"
          >
            <span className="flex items-center gap-2 sm:gap-3">
              Start Your 2 Day Free Trial
              <span className="rounded-full p-1 sm:p-1.5 bg-black dark:bg-white group-hover:bg-Secondary transition-colors duration-300">
                <MdArrowOutward className="text-Primary dark:text-black text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
              </span>
            </span>
          </CommonButton>
        </div>
      </div>

      {/* Video Preview Box */}
      <div className="max-w-5xl mx-auto mt-14">
        <div className="relative rounded-2xl overflow-hidden ">
          <img
            ref={imageRef}
            src={dashboardImg}
            alt="Mentis Dashboard"
            className="w-full h-auto"
          />

          {/* Play Button */}
          <button
            ref={playRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white shadow-lg w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition"
          >
            <FaPlay className="text-black text-xl ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
