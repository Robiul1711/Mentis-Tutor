import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { FaAngleRight, FaAngleLeft, FaStar } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Title from "../common/Title";

const testimonials = [
  {
    id: 1,
    name: "Sarah",
    role: "Parent of Year 11 student",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    rating: 5,
    msg: "“The mix of videos and direct support made a huge difference. My daughter felt more confident going into her exams.”",
    tag: "Grade 5 to Grade 8",
    tagColor: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    name: "Ayaan",
    role: "GCSE Maths student",
    avatar: "https://thumbs.dreamstime.com/b/kid-boy-happy-portrait-classroom-learning-knowledge-academic-development-student-child-smile-elementary-423231038.jpg?w=576",
    rating: 5,
    msg: "“The explanations were clear and I liked that I could go back over topics properly instead of rushing in class.”",
    tag: "Improved confidence",
    tagColor: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    name: "Jessica",
    role: "Year 10 Student",
    avatar: "https://thumbs.dreamstime.com/b/child-girl-schoolgirl-elementary-school-student-123686003.jpg?w=992",
    rating: 5,
    msg: "“It didn't feel like just another course. The support side is what made it worth it. I finally understand fractions!”",
    tag: "Clearer exam technique",
    tagColor: "bg-rose-50 text-rose-600",
  },
  {
    id: 4,
    name: "David",
    role: "GCSE Student",
    avatar: "https://thumbs.dreamstime.com/b/student-5181236.jpg?w=992",
    rating: 5,
    msg: "“The step-by-step past paper solutions are a game changer. It's like having a tutor available 24/7.”",
    tag: "Mastered Past Papers",
    tagColor: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 5,
    name: "Emma",
    role: "Parent of Year 11",
    avatar: "https://thumbs.dreamstime.com/b/kid-boy-happy-portrait-classroom-learning-knowledge-academic-development-student-child-smile-elementary-423231038.jpg?w=576",
    rating: 5,
    msg: "“My son actually enjoys practicing now. The structure Mentis provides is exactly what was missing from school.”",
    tag: "Top Grade Consistency",
    tagColor: "bg-purple-50 text-purple-600",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full  dark:bg-[#0B1120] pb-16 md:pb-24 section-padding-x overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Title level="title48" className="text-[#1a2b4b] dark:text-white">
          What Our Students & Parents Say
        </Title>
        <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
          Trusted by students and parents preparing for GCSE Maths
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Custom Navigation Buttons */}
        <button className="prevBtn absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hidden md:flex">
          <FaAngleLeft className="text-gray-600 dark:text-gray-300" />
        </button>

        <button className="nextBtn absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hidden md:flex">
          <FaAngleRight className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Swiper Implementation */}
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation={{
            prevEl: ".prevBtn",
            nextEl: ".nextBtn",
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={24}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14 px-2"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className=" dark:bg-gray-800 rounded-[2rem] p-8 flex flex-col h-full border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-2">
                {/* Header: Avatar and Identity */}
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-50"
                  />
                  <div>
                    <h4 className="font-bold text-[#1a2b4b] dark:text-white text-lg leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 flex-grow">
                  {item.msg}
                </p>

                {/* Bottom Pill Tag */}
                <div className="mt-auto">
                  <span
                    className={`inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;