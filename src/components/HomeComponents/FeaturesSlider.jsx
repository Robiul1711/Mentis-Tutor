import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import v1 from "@/assets/images/bannerthumb.png";
// Dummy images/icons

import {
  CalendarIcon,
  CameraIcon,
  MessageIcon,
  QustionIcon,
} from "../SVG/Icons";
import Title from "../common/Title";

const data = [
  {
    id: 1,
    icon: CameraIcon,
    title: "Full GCSE Video Library",
    desc: "Access every GCSE Maths topic in one place: clear, structured, and taught by expert tutors.",
    img: v1,
  },
  {
    id: 2,
    icon: QustionIcon,
    title: "Interactive Quizzes & Smart Feedback",
    desc: "Test your understanding instantly and get personalised feedback that guides your next steps.",
    img: v1,
  },
  {
    id: 3,
    icon: CalendarIcon,
    title: "Past Paper Solutions",
    desc: "Master exam technique with step-by-step solutions for every past paper question.",
    img: v1,
  },
  {
    id: 4,
    icon: MessageIcon,
    title: "One-to-One Tutor Messaging",
    desc: "Get personalised guidance from real tutors whenever you're stuck—fast, friendly, and reliable.",
    img: v1,
  },
  {
    id: 5,
    icon: CalendarIcon,
    title: "Revision + Mindset Guidance",
    desc: "Build stronger study habits and develop the right mindset to stay focused, confident, and exam-ready.",
    img: v1,
  },
];

const FeaturesSlider = () => {
  return (
    <section className="section-padding-x  relative">
      {/* Heading */}
      <div className="text-center mb-10">
        <Title level="title48" className="dark:text-white">
          WHAT INSIDE MENTIS
        </Title>
        <Title
          level="title20"
          className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4"
        >
          Your journey. Personalised. Mentis tutors adapt to your strengths and
          struggles.
        </Title>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="features-slider-prev bg-Primary text-white p-3 rounded-full hover:bg-Primary/90 transition-colors shadow-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="features-slider-next bg-Primary text-white p-3 rounded-full hover:bg-Primary/90 transition-colors shadow-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        modules={[Navigation]}
        navigation={{
          nextEl: ".features-slider-next",
          prevEl: ".features-slider-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white border border-[#d7e8f9] rounded-3xl p-6 h-full transition">
              {/* ICON */}
              <div className="w-16 h-16 rounded-full bg-Primary flex items-center justify-center mb-4">
                {<item.icon />}
              </div>

              {/* Title */}
              <h3 className="text-[20px] font-semibold text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[15px] mt-2 leading-relaxed line-clamp-2">
                {item.desc}
              </p>

              {/* Image Preview */}
              <img
                src={item.img}
                className="w-full mt-6 rounded-xl border-2 border-[#cfe5ff]"
                alt="preview"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturesSlider;