import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../common/Title";
import { useApiQuery } from "@/hooks/apiQuery";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HowMentisWork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const timelineRef = useRef(null);
  const circlesRef = useRef([]);
  const arrowsRef = useRef([]);
  const cardsRef = useRef([]);

  const { data, isLoading } = useApiQuery({
    queryKey: ["how-mentis-works"],
    url: "/cms/home_page/how_mentis_works_section",
  });

  const sectionData = data?.data?.how_mentis_works_section || {};
  const header = sectionData?.item_1 || {};

  const features = Object.entries(sectionData)
    .filter(([key]) => key.startsWith("item_") && key !== "item_1")
    .map(([key, value], index) => ({
      id: key,
      number: index + 1,
      title: value.title,
      description: value.description,
      img: value.image,
      bgColor: ["bg-amber-50", "bg-orange-50", "bg-purple-50", "bg-blue-50"][
        index % 4
      ],
      iconColor: [
        "text-amber-600",
        "text-orange-600",
        "text-purple-600",
        "text-blue-600",
      ][index % 4],
    }));

  // Refs collection functions
  const addToCirclesRef = (el) => {
    if (el && !circlesRef.current.includes(el)) {
      circlesRef.current.push(el);
    }
  };

  const addToArrowsRef = (el) => {
    if (el && !arrowsRef.current.includes(el)) {
      arrowsRef.current.push(el);
    }
  };

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (isLoading || !features.length) return;

    // Reset refs if data changes
    circlesRef.current = [];
    arrowsRef.current = [];
    cardsRef.current = [];

    const ctx = gsap.context(() => {
      // Main timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // Heading animation
      mainTl.fromTo(
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
        },
      );

      // Subtitle animation
      mainTl.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );

      // Timeline circles animation
      if (circlesRef.current.length > 0) {
        mainTl.fromTo(
          circlesRef.current,
          {
            scale: 0,
            opacity: 0,
            rotation: 180,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: "back.out(1.8)",
          },
          "-=0.3",
        );
      }

      // Arrows animation - draw in effect
      if (arrowsRef.current.length > 0) {
        mainTl.fromTo(
          arrowsRef.current,
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }

      // Cards animation with individual rotations
      cardsRef.current.forEach((card, index) => {
        const rotation =
          index === 0 ? -4 : index === 1 ? -2 : index === 2 ? 2 : 4;

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            rotation: rotation + 10,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotation: rotation,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Store timeline reference
      timelineRef.current = mainTl;
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, features.length]);

  if (isLoading) return null;

  return (
    <section
      ref={sectionRef}
      className="section-padding-x py-12 md:py-20 bg-white dark:bg-[#0B1120]"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <div ref={headingRef}>
          <Title level="title48" className="dark:text-white uppercase">
            {header.title || "HOW MENTIS WORKS"}
          </Title>
        </div>
        <div ref={subtitleRef}>
          <div
            className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4 [&>h2]:text-lg sm:[&>h2]:text-xl md:[&>h2]:text-2xl [&>h2]:font-medium [&>p]:mt-2"
            dangerouslySetInnerHTML={{ __html: header.description }}
          />
        </div>
      </div>

      {/* Timeline with circles and arrows */}
      <div className="md:flex items-center hidden justify-center my-12 relative">
        {features.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Circle with number */}
            <div className="flex flex-col items-center z-10">
              <div
                ref={addToCirclesRef}
                className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              >
                {step.number}
              </div>
            </div>

            {/* Connecting arrow */}
            {index < features.length - 1 && (
              <div
                ref={addToArrowsRef}
                className="relative mx-12 lg:mx-24 w-20 lg:w-32 h-12"
              >
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 130 50"
                  fill="none"
                >
                  <path
                    d="M 0 25 Q 65 5, 130 25"
                    stroke="#60A5FA"
                    strokeWidth="3"
                    fill="none"
                  />
                  <polygon points="130,25 122,21 122,29" fill="#60A5FA" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
        {features.map((step, index) => {
          const rotationClass =
            index === 0
              ? "-rotate-4"
              : index === 1
                ? "-rotate-2"
                : index === 2
                  ? "rotate-2"
                  : index === 3
                    ? "rotate-4"
                    : "";

          return (
            <div
              key={step.id}
              ref={addToCardsRef}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer ${rotationClass}`}
            >
              {/* Icon illustration area */}
              <div
                className={`${step.bgColor} rounded-xl p-8 mb-4 flex items-center justify-center h-48 lg:h-56 overflow-hidden`}
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white my-2 text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 text-center leading-relaxed [&>p]:my-1 [&>p>strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowMentisWork;
