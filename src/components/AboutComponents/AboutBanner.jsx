import React, { useEffect, useRef } from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";
import dashboardImg from "@/assets/images/about.png";
import { FaPlay } from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApiQuery } from "@/hooks/apiQuery";

gsap.registerPlugin(ScrollTrigger);

const AboutBanner = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const playRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const { data } = useApiQuery({
    queryKey: ["aboutPageBannerSection"],
    url: "/about-page/banner-section",
  });

  const togglePlay = () => {
    if (imageRef.current) {
      if (isPlaying) {
        imageRef.current.pause();
      } else {
        imageRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
        "-=0.4",
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
        "-=0.3",
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
        "-=0.2",
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
            {data?.title}
          </Title>
        </div>

        <p
          ref={descRef}
          className="text-lg mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></p>

        {/* Button */}
        <div
          ref={buttonRef}
          className="flex justify-center pt-2 sm:pt-4 lg:pt-6"
        >
          <CommonButton
          link={"/courses"}
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
      <div className="max-w-5xl mx-auto md:mt-14 mt-8">
        <video
          src={data?.video}
          poster={data?.image} // Use API image as poster
          controls
          className="w-full aspect-video rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default AboutBanner;
