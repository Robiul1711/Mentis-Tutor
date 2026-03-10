import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../common/Title";
import { useApiQuery } from "@/hooks/apiQuery";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyMentisWork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const { data, isLoading } = useApiQuery({
    queryKey: ["why-mentis-works"],
    url: "/cms/home_page/why_mentis_works_section",
  });

  const sectionData = data?.data?.why_mentis_works_section || {};
  const header = sectionData?.item_1 || {};

  // Filter out item_1 and convert the rest to an array for the grid
  const features = Object.entries(sectionData)
    .filter(([key]) => key.startsWith("item_") && key !== "item_1")
    .map(([key, value]) => ({
      id: key,
      img: value.image,
      text: value.title,
    }));

  useEffect(() => {
    if (isLoading || !features.length) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards staggered animation
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, features.length]);

  if (isLoading) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full section-padding-x py-12 md:py-20"
    >
      {/* Heading */}
      <div className="text-center mb-14">
        <div ref={headingRef}>
          <Title
            level="title48"
            className="text-black dark:text-white uppercase"
          >
            {header.title || "WHY MENTIS WORKS"}
          </Title>
        </div>

        <div ref={subtitleRef}>
          <div
            className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mt-4 [&>h4]:text-lg sm:[&>h4]:text-xl md:[&>h4]:text-2xl [&>h4]:font-medium [&>p]:mt-2"
            dangerouslySetInnerHTML={{ __html: header.description }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item) => (
          <div
            key={item.id}
            ref={addToCardsRef}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
          >
            <div className="w-full h-48 overflow-hidden rounded-xl mb-6">
              <img
                src={item.img}
                alt={item.text}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <p className="text-gray-800 dark:text-gray-200 lg:text-lg font-semibold leading-tight">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyMentisWork;
