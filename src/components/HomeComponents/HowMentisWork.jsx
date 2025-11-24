import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../common/Title";
import learn from "@/assets/images/learn.jpg";
import practice from "@/assets/images/practice.jpg";
import support from "@/assets/images/support.jpg";
import achive from "@/assets/images/achive.jpg";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: 1,
    title: "Learn",
    description: "Watch structured GCSE videos",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    number: 2,
    title: "Practise",
    description: "Complete smart quizzes",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    number: 3,
    title: "Get support",
    description: "Ask questions anytime.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    number: 4,
    title: "Achieve",
    description: "Track your growth to Grade 9",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

const  HowMentisWork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const timelineRef = useRef(null);
  const circlesRef = useRef([]);
  const arrowsRef = useRef([]);
  const cardsRef = useRef([]);

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
    const ctx = gsap.context(() => {
      // Main timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });

      // Heading animation
      mainTl.fromTo(headingRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Subtitle animation
      mainTl.fromTo(subtitleRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.5"
      );

      // Timeline circles animation
      mainTl.fromTo(circlesRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.3,
          ease: "back.out(1.8)"
        },
        "-=0.3"
      );

      // Arrows animation - draw in effect
      mainTl.fromTo(arrowsRef.current,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center"
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        },
        "-=0.4"
      );

      // Cards animation with individual rotations
      cardsRef.current.forEach((card, index) => {
        const rotation = index === 0 ? -4 : index === 1 ? -2 : index === 2 ? 2 : 4;
        
        gsap.fromTo(card,
          {
            y: 80,
            opacity: 0,
            rotation: rotation + 10,
            scale: 0.8
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
              toggleActions: "play none none reverse"
            }
          }
        );
      });


      // Store timeline reference
      timelineRef.current = mainTl;

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-x dark:bg-[#0B1120] ">
      {/* Heading */}
      <div className="text-center mb-10">
        <div ref={headingRef}>
          <Title level="title48" className="dark:text-white">
            HOW MENTIS WORKS
          </Title>
        </div>
        <div ref={subtitleRef}>
          <Title
            level="title20"
            className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4"
          >
            Learn smarter, track your progress, and get guidance whenever you need
            it that's how Mentis makes learning easy.
          </Title>
        </div>
      </div>

      {/* Timeline with circles and arrows */}
      <div className="md:flex items-center hidden justify-center my-12 relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
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
            {index < steps.length - 1 && (
              <div 
                ref={addToArrowsRef}
                className="relative mx-24 w-32 h-12"
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
                  <polygon points="210,25 122,21 122,29" fill="#60A5FA" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
        {steps.map((step, index) => {
          const rotationClass = 
            step.number === 1 ? "-rotate-4" :
            step.number === 2 ? "-rotate-2" :
            step.number === 3 ? "rotate-2" :
            step.number === 4 ? "rotate-4" : "";
          
          return (
            <div
              key={step.number}
              ref={addToCardsRef}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer ${rotationClass}`}
            >
              {/* Icon illustration area */}
              <div
                className={`${step.bgColor} rounded-xl p-8 mb-4 flex items-center justify-center h-48 lg:h-56 overflow-hidden`}
              >
                <img
                  src={
                    step.number === 1
                      ? learn
                      : step.number === 2
                      ? practice
                      : step.number === 3
                      ? support
                      : achive
                  }
                  alt={step.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white my-2 text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowMentisWork;