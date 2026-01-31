import React, { useEffect, useRef } from "react";
import s1 from "@/assets/images/s1.png";
import s2 from "@/assets/images/s2.png";
import s3 from "@/assets/images/s3.png";
import Title from "../common/Title";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApiQuery } from "@/hooks/apiQuery";

gsap.registerPlugin(ScrollTrigger);

const WhyMentisExist = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const { data, isLoading } = useApiQuery({
    queryKey: ["purpose"],
    url: "/cms/home_page/purpose_section",
  });

  const sectionData = data?.data?.purpose_section || {};
  const { title, description, galleries } = sectionData;

  useEffect(() => {
    if (isLoading) return;

    const elements = [
      titleRef.current,
      subtitleRef.current,
      img1Ref.current,
      img2Ref.current,
      img3Ref.current,
      textRef.current,
    ];

    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      },
    );
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <section
      ref={sectionRef}
      className="section-padding-x py-12 md:py-20 bg-white dark:bg-[#0B1120]"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <div ref={titleRef}>
          <Title level="title48" className="dark:text-white">
            {title}
          </Title>
        </div>

        <div ref={subtitleRef}>
          <Title
            level="title20"
            className="dark:text-gray-300 max-w-[900px] mx-auto mt-4 leading-relaxed"
          >
            <span dangerouslySetInnerHTML={{ __html: description }}></span>
          </Title>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Images */}
        <div className="flex justify-center gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <img
              ref={img1Ref}
              src={galleries?.[0]}
              alt="Student learning"
              className="rounded-xl w-[180px] sm:w-[220px] md:w-[240px] h-[250px] sm:h-[300px] object-cover shadow-md"
            />
            <img
              ref={img3Ref}
              src={galleries?.[2]}
              alt="Student progress"
              className="rounded-xl w-[180px] sm:w-[220px] md:w-[240px] h-[220px] sm:h-[260px] object-cover shadow-md"
            />
          </div>

          <img
            ref={img2Ref}
            src={galleries?.[1]}
            alt="Student success"
            className="rounded-xl w-[190px] sm:w-[240px] md:w-[260px] h-[320px] sm:h-[380px] object-cover shadow-lg mt-10"
          />
        </div>

        {/* Text Content */}
        <div ref={textRef} className="space-y-6 text-center lg:text-left">
          {/* Problem block */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
            <Title
              level="title24"
              className="font-semibold dark:text-white mb-3"
            >
              The Problem
            </Title>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
              Traditional tutoring costs hundreds per month and limits learning
              to just one hour a week — making it inaccessible for many
              families.
            </p>
          </div>

          {/* Solution block */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
            <Title
              level="title24"
              className="font-semibold dark:text-white mb-3"
            >
              Our Solution
            </Title>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
              Mentis gives every student access to real help — anytime, anywhere
              — for just{" "}
              <span className="font-bold text-green-600 dark:text-green-400">
                £25 a month
              </span>
              .
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Access
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                £25
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Per Month
              </div>
            </div>

            <div className="text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                100%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Accessible
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMentisExist;
