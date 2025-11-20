import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "@/assets/images/Overview.png";
import img2 from "@/assets/images/Schedule.png";
import img3 from "@/assets/images/Overview.png";
import img4 from "@/assets/images/Schedule.png";
import Title from "../common/Title";

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

  const features = [
    {
      id: 1,
      img: img1,
      text: "Real Tutor Support (7/24 messaging)",
    },
    {
      id: 2,
      img: img2,
      text: "All-in-one Platform (videos, quizzes, papers)",
    },
    {
      id: 3,
      img: img3,
      text: "Affordable for Every Family (£25/month)",
    },
    {
      id: 4,
      img: img4,
      text: "Confidence & Mindset Coaching",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        {
          y: 50,
          opacity: 0
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
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        {
          y: 30,
          opacity: 0
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
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards staggered animation
      gsap.fromTo(cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9
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
            toggleActions: "play none none reverse"
          }
        }
      );


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full section-padding-x">
      {/* Heading */}
      <div className="text-center mb-14">
        <div ref={headingRef}>
          <Title level="title48" className="text-black dark:text-white">
            WHY MENTIS WORKS
          </Title>
        </div>

        <div ref={subtitleRef}>
          <Title
            level="title20"
            className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mt-4"
          >
            Discover how Mentis empowers every student with personalized learning,
            progress tracking, and expert guidance that truly delivers results.
          </Title>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={item.id}
            ref={addToCardsRef}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-xl transition-all cursor-pointer"
          >
            <img
              src={item.img}
              alt="feature"
              className="w-full h-40 object-cover rounded-xl mb-6"
            />

            <div className="flex items-center gap-2">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
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