import React from "react";
import Title from "../common/Title";
import { TiqIcon } from "../SVG/Icons";
import tutor from "../../assets/images/tutor.png";

const MeetYourTutor = () => {
  return (
    <div className="section-padding-x py-8 sm:py-10 md:py-16">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <Title level="title48">Meet Your Tutor</Title>
        <Title level="title20">
          Learn directly from the founder and your personal mentor.
        </Title>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:justify-between mt-12 gap-8">
        {/* Left Card */}
        <div className="lg:w-1/2 bg-bg-custom1 dark:bg-[#0B1120] dark:border p-8 lg:p-10 rounded-3xl flex flex-col lg:flex-row items-center lg:items-start gap-6 shadow-md">
          <img
            src={tutor}
            alt="Tutor"
            className="w-48 h-48 object-cover rounded-2xl"
          />
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <p className="text-2xl lg:text-3xl font-semibold">Mr. Iyad </p>
            <p className="text-lg  font-medium text-Tertiary dark:text-white">Founder & Lead Tutor of Mentis</p>
            <p className="text-2xl lg:text-3xl font-semibold mt-2">Bio:</p>
            <p className="text-base  font-medium leading-relaxed text-Tertiary dark:text-white">
              Hi, I’m Iyad, your GCSE Maths mentor. I achieved a Grade 9 in
              GCSE Maths and I’m now a medical student, passionate about helping
              others reach their full potential in exams.
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:w-1/2 bg-bg-custom1 dark:bg-[#0B1120] dark:border p-8 lg:p-10 rounded-3xl shadow-md">
          <ul className="flex flex-col gap-4 text-lg lg:text-xl font-medium text-Tertiary dark:text-white">
            <li className="flex items-center gap-3">
              <TiqIcon /> Achieved Grade 9 in GCSE Maths
            </li>
            <li className="flex items-center gap-3">
              <TiqIcon /> Current Medical Student (strong academic background)
            </li>
            <li className="flex items-center gap-3">
              <TiqIcon /> Over 80+ hours of structured video lessons created
            </li>
            <li className="flex items-center gap-3">
              <TiqIcon /> Hundreds of GCSE-style practice questions & quizzes
            </li>
            <li className="flex items-center gap-3">
              <TiqIcon /> 1-to-1 support through chat & live sessions
            </li>
          </ul>
        </div>
      </div>
      <Title level="title20" className="mt-4 text-Tertiary dark:text-white">My goal is to make Maths clear, fast, and enjoyable. I break down complex topics into simple explanations that save time and build confidence. Whether you’re struggling with algebra, geometry, or exam techniques, I’ll guide you step by step.</Title>
    </div>
  );
};

export default MeetYourTutor;
