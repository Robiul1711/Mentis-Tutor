import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaAngleRight, FaAngleLeft, FaQuoteLeft, FaStar } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import img1 from "@/assets/images/tutor.png";
import img2 from "@/assets/images/s1.png";
import img3 from "@/assets/images/tutor.png";
import img4 from "@/assets/images/s1.png";
import img5 from "@/assets/images/tutor.png";

const testimonials = [
  {
    id: 1,
    msg: "The tutors at Mentis completely transformed my approach to GCSE Maths. Their personalized guidance helped me go from struggling to achieving top grades!",
    name: "Tom Anderson",
    role: "GCSE Student",
    avatar: img3,
    rating: 5,
  },
  {
    id: 2,
    msg: "As a parent, I've seen remarkable improvement in my child's confidence and grades. The one-to-one messaging feature is incredibly helpful for quick questions.",
    name: "James Wilson",
    role: "Parent",
    avatar: img1,
    rating: 5,
  },
  {
    id: 3,
    msg: "The video library and interactive quizzes made learning engaging and effective. I finally understand topics that confused me for months!",
    name: "Sophia Martinez",
    role: "A-Level Student",
    avatar: img2,
    rating: 4,
  },
  {
    id: 4,
    msg: "The step-by-step past paper solutions are game-changing. It's like having a tutor available 24/7 to walk you through every problem.",
    name: "Mia Chen",
    role: "GCSE Student",
    avatar: img4,
    rating: 5,
  },
  {
    id: 5,
    msg: "The mindset guidance combined with academic support created a holistic learning experience that truly sets Mentis apart.",
    name: "Chris Johnson",
    role: "Parent",
    avatar: img5,
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="w-full dark:bg-[#0B1120] py-20 section-padding-x relative">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
          What Our Students & Parents Say
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Don't just take our word for it - hear from the Mentis community
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Navigation Arrows */}
        <button className="prevBtn absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:scale-110">
          <FaAngleLeft className="text-xl text-gray-700 dark:text-gray-300" />
        </button>

        <button className="nextBtn absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:scale-110">
          <FaAngleRight className="text-xl text-gray-700 dark:text-gray-300" />
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".prevBtn",
            nextEl: ".nextBtn",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          className="pb-12"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center px-4">
                {/* Main Testimonial Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 max-w-4xl w-full text-center relative  border border-gray-100 dark:border-gray-700">



                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-light italic">
                    "{item.msg}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-full border-4 border-blue-100 dark:border-blue-900 shadow-md"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>


              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="swiper-pagination-bullet w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
    </section>
  );
};

export default Testimonials;