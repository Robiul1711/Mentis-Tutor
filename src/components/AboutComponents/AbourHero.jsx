import React from "react";
import about1 from "../../assets/images/about3.png";

import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";
import { TiqIcon } from "../SVG/Icons";

const AbourHero = () => {
  return (
    <div className="flex w-full gap-5 sm:gap-10 flex-col lg:flex-row section-padding-x py-6 md:py-10 bg-bg-custom1 dark:bg-[#0B1120]">
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center gap-4 relative">
        <img src={about1} alt="" />
      </div>

      {/* Right Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mt-8 lg:mt-0">
        <Title level="title56">Unlock Your Potential, Master GCSE Maths</Title>
        <Title level="title20" className="text-gray-600 leading-relaxed dark:text-white">
          At Mentis, we make learning engaging, effective, and fun. Our courses
          are designed to help students conquer challenges, boost confidence,
          and achieve their academic goals — all with guidance from expert
          tutors and interactive lessons.
        </Title>
        <div className="flex justify-center lg:justify-start">
          <ul className="flex flex-col gap-3 text-Secondary dark:text-Primary text-xl font-semibold">
            <li className="flex items-center gap-2">
              <TiqIcon /> The Most World Class Instructors
            </li>
            <li className="flex items-center gap-2">
              <TiqIcon /> Flexible Course Plan
            </li>
            <li className="flex items-center gap-2">
              <TiqIcon /> Access Your Class anywhere
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AbourHero;
