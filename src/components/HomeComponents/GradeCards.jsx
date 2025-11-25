import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../common/Title";

import { Grade1Icon, Grade2Icon, Grade3Icon } from "../SVG/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const gradeData = [
  {
    id: 1,
    bg: "bg-[#fbf9c8]",
    border: "border-[#d6d15d]",
    shadow: "shadow-[0px_8px_20px_rgba(210,210,120,0.4)]",
    icon: Grade1Icon,
    gradeBg: "bg-[#ebea32]",
    grade: "Grade 2–4",
    title: "Build Strong Foundations",
    desc: "Regain your confidence and strengthen your basics with guided video lessons.",
    offset: "translate-y-20",
  },
  {
    id: 2,
    bg: "bg-[#f3dfd2]",
    border: "border-[#dba991]",
    shadow: "shadow-[0px_8px_20px_rgba(255,180,150,0.4)]",
    icon: Grade2Icon,
    gradeBg: "bg-[#f9a14a]",
    grade: "Grade 5–6",
    title: "Break the Grade 7 Barrier",
    desc: "Master problem solving skills and move from understanding to application.",
    offset: "",
  },
  {
    id: 3,
    bg: "bg-[#dceafd]",
    border: "border-[#78a9e9]",
    shadow: "shadow-[0px_8px_20px_rgba(120,160,255,0.4)]",
    icon: Grade3Icon,
    gradeBg: "bg-[#4ca4ff]",
    grade: "Grade 7–8+",
    title: "Achieve Grade 9 Mastery",
    desc: "Push beyond limits and refine your exam technique with advanced practice.",
    offset: "-translate-y-20",
  },
];

const GradeCards = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);
  
  // Create individual refs for each card
  const cardRefs = useRef([]);
  cardRefs.current = gradeData.map((_, i) => cardRefs.current[i] ?? React.createRef());

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop Animation (large screens)
        "(min-width: 768px)": function () {
          console.log("Desktop animation setup");
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none none",
              markers: false, // Set to true to debug trigger zones
            },
          });

          tl.from(headingRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });

          tl.from(
            subtitleRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          );

          tl.from(
            cardRefs.current.map(ref => ref.current),
            {
              y: 80,
              opacity: 0,
              scale: 0.95,
              stagger: 0.25,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.2"
          );
        },

        // Mobile Animation
        "(max-width: 767px)": function () {
          console.log("Mobile animation setup");
          
          gsap.from([headingRef.current, subtitleRef.current], {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "bottom 70%",
              toggleActions: "play none none none",
              markers: false, // Set to true to debug trigger zones
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out",
          });

          gsap.from(cardRefs.current.map(ref => ref.current), {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none none",
              markers: false, // Set to true to debug trigger zones
            },
            y: 60,
            opacity: 0,
            scale: 0.97,
            stagger: 0.2,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-x bg-white dark:bg-[#0B1120] py-12 md:py-20  ">
      {/* Heading */}
      <div className="text-center ">
        <div ref={headingRef}>
          <Title level="title48" className="dark:text-white">
            Everyone Can Reach Grade 9
          </Title>
        </div>
        <div ref={subtitleRef}>
          <Title
            level="title20"
            className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4"
          >
            Wherever you start, Mentis helps you climb higher step by step.
          </Title>
        </div>
      </div>

      {/* Cards Container */}
      <div ref={containerRef} className="flex flex-col md:flex-row justify-center items-center gap-10 py-12">
        {gradeData.map((card, index) => (
          <div
            key={card.id}
            ref={cardRefs.current[index]}
            className={`
              ${card.bg} ${card.border} ${card.shadow}
              border rounded-3xl p-6 w-full md:w-[380px] min-h-[220px]
              transition-all duration-300 cursor-pointer hover:scale-105
              ${card.offset}
              relative
            `}
            style={{ 
              opacity: 1, // Ensure cards are visible initially
              transform: 'translateY(0)' // Override any initial transform
            }}
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <card.icon />
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold text-black ${card.gradeBg}`}
              >
                {card.grade}
              </span>
            </div>

            {/* Text Content */}
            <div className="mt-5">
              <Title level="title24" className="text-black font-semibold">
                {card.title}
              </Title>

              <p className="text-gray-700 mt-2 text-[15px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GradeCards;