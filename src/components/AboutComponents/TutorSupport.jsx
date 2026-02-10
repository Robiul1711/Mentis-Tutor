import React from "react";
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
    icon: MessageIcon,
    title: "Unlimited Help & Support",
    desc: "Get instant answers to your questions anytime. Our tutors are always ready to support your learning journey.",
    img: v1,
  },
  {
    id: 2,
    icon: CameraIcon,
    title: "Feedback & Zoom Sessions",
    desc: "Receive personalized feedback and schedule one-on-one video sessions with expert tutors.",
    img: v1,
  },
  {
    id: 3,
    icon: CalendarIcon,
    title: "Revision Planning",
    desc: "Stay organized with custom study schedules and revision plans tailored to your goals.",
    img: v1,
  },
  {
    id: 4,
    icon: QustionIcon,
    title: "Stress & Mindset Coaching",
    desc: "Build confidence and manage exam stress with dedicated mindset coaching support.",
    img: v1,
  },
];

const TutorSupport = () => {
  return (
    <section className="section-padding-x  relative">
      {/* Heading */}
      <div className="text-center mb-10">
        <Title level="title48" className="dark:text-white">
          Tutor Support Section
        </Title>
        <Title
          level="title20"
          className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4"
        >
          Your journey. Personalised. Mentis tutors adapt to your strengths and
          struggles.
        </Title>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#111827] border border-[#d7e8f9] rounded-3xl p-6 h-full transition"
          >
            {/* ICON */}
            <div className="lg:w-16 lg:h-16 size-12 md:size-14 rounded-full bg-Primary flex items-center justify-center mb-4">
              {<item.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto text-white" />}
            </div>

            {/* Title */}
            <h3 className="text-[20px] font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-white text-[15px] mt-2 leading-relaxed line-clamp-2">
              {item.desc}
            </p>

            {/* Image Preview */}
            <img
              src={item.img}
              className="w-full mt-6 rounded-xl border-2 border-[#cfe5ff]"
              alt="preview"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TutorSupport;
