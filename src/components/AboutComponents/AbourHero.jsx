import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Title from "../common/Title";
import dashboard from "@/assets/images/about.png";

import {
  AccesableIcon,
  BaseIcon,
  DesignIcon,
  GuideIcon,
  MessageIcon2,
} from "../SVG/Icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: 1, icon: GuideIcon, text: "Guided Learning Never Alone" },
  { id: 2, icon: AccesableIcon, text: "Accessible & Affordable for All Families" },
  { id: 3, icon: BaseIcon, text: "Based on Real Exam Success Strategies" },
  { id: 4, icon: MessageIcon2, text: "Supportive Human Mentors Behind Every Answer" },
  { id: 5, icon: DesignIcon, text: "Designed to Empower Ambition, Not Define Limits" },
];

const AbourHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const frameRef = useRef(null);
  const imgRef = useRef(null);
  const arrowLeftRef = useRef(null);
  const arrowRightRef = useRef(null);

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Title
      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
      });

      // Subtitle
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Feature Cards - stagger
      tl.from(
        cardRefs.current,
        {
          opacity: 0,
          y: 25,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Tablet frame animation
      tl.from(
        frameRef.current,
        {
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Image zoom-in
      tl.from(
        imgRef.current,
        {
          opacity: 0,
          scale: 1.1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Arrows fade-in
      tl.from(
        [arrowLeftRef.current, arrowRightRef.current],
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.8)",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-x ">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div ref={titleRef}>
          <Title level="title48">What Makes Mentis Different</Title>
        </div>

        <p ref={subtitleRef} className="text-lg mt-3 leading-relaxed">
          A smarter way to learn GCSE Maths combining expert teaching,
          interactive tools, and real progress tracking.
        </p>
      </div>

      {/* Features Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
        {features.map((item) => (
          <div
            key={item.id}
            ref={addCardRef}
            className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100"
          >
            <div className="flex items-center justify-center mb-4">
              {<item.icon />}
            </div>

            <p className="text-gray-800 font-medium text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Dashboard Slider */}
      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          ref={arrowLeftRef}
          className="mentis-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100"
        >
          <svg width="28" height="28" fill="none" stroke="black" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          ref={arrowRightRef}
          className="mentis-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100"
        >
          <svg width="28" height="28" fill="none" stroke="black" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Tablet Background */}
        <div ref={frameRef} className="bg-[#C9C9C9] p-8 rounded-3xl">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".mentis-next",
              prevEl: ".mentis-prev",
            }}
            spaceBetween={20}
            slidesPerView={1}
          >
            <SwiperSlide>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img ref={imgRef} src={dashboard} alt="dashboard" className="w-full h-auto" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AbourHero;
