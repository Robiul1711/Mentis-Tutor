import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Title from "../common/Title";

const sections = [
  {
    title: "Section One - Number",
    list: [
      "Type of Number and BODMAS",
      "Multiple, Factors and Prime Factors",
      "LCM and HCF",
      "Fractions",
      "Fractions: Decimals and Percentages",
      "Fractions and Recurring Decimals",
      "Rounding Numbers",
      "Estimating",
      "Bounds",
      "Standard Form",
      "Revision Questions for Section One",
    ],
  },
  {
    title: "Section Two - Algebra",
    list: [
      "Algebra Basics",
      "Powers and Roots",
      "Multiplying Out Brackets",
      "Factorising",
      "Manipulating Surds",
      "Solving Equations",
      "Rearranging Formulas",
      "The Quadratic Formula",
      "Completing the Square",
      "Algebraic Fractions",
      "Sequences",
    ],
  },
  {
    title: "Section Three - Graphs",
    list: [
      "Straight Lines and Gradients",
      "y = mx + c",
      "Drawing Straight Line Graphs",
      "Coordinates and Ratio",
      "Parallel and Perpendicular Lines",
      "Quadratic Graphs",
      "Harder Graphs",
      "Solving Equations Using Graphs",
      "Graph Transformations",
      "Real-Life Graphs",
      "Gradients of Real-Life Graphs",
    ],
  },
  {
    title: "Section Four - Ratio",
    list: [
      "Straight Lines and Gradients",
      "y = mx + c",
      "Drawing Straight Line Graphs",
      "Coordinates and Ratio",
      "Parallel and Perpendicular Lines",
      "Quadratic Graphs",
      "Harder Graphs",
      "Solving Equations Using Graphs",
      "Graph Transformations",
      "Real-Life Graphs",
      "Gradients of Real-Life Graphs",
    ],
  },
  {
    title: "Section Five - Geometry",
    list: [
      "Algebra Basics",
      "Powers and Roots",
      "Multiplying Out Brackets",
      "Factorising",
      "Manipulating Surds",
      "Solving Equations",
      "Rearranging Formulas",
      "The Quadratic Formula",
      "Completing the Square",
      "Algebraic Fractions",
      "Sequences",
    ],
  },
  {
    title: "Section Six - Statistics",
    list: [
      "Algebra Basics",
      "Powers and Roots",
      "Multiplying Out Brackets",
      "Factorising",
      "Manipulating Surds",
      "Solving Equations",
      "Rearranging Formulas",
      "The Quadratic Formula",
      "Completing the Square",
      "Algebraic Fractions",
      "Sequences",
    ],
  },
];

const CurriculumTable = () => {
  return (
    <section className="section-padding-x">
      {/* Heading */}
      <div className="text-center mb-12">
        <Title level="title48" className="">
          Curriculum Table
        </Title>
        <p className=" max-w-[700px] mx-auto mt-2 text-[18px]">
          A structured roadmap showing every topic you’ll master step by step,
          from basics to Grade 9.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Left Arrow */}
        <button className="curriculum-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="black"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button className="curriculum-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="black"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".curriculum-next",
            prevEl: ".curriculum-prev",
          }}
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {sections.map((sec, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 shadow-sm h-full border border-[#d7e8f9]">
                <h3 className="text-[20px] font-semibold text-black dark:text-white mb-4">
                  {sec.title}
                </h3>

                <ul className="text-gray-700 dark:text-white text-[15px] space-y-1">
                  {sec.list.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span>{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CurriculumTable;
