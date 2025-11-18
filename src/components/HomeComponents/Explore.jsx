import React from "react";
import Title from "../common/Title";
import explore from "../../assets/images/explore.png";
import {
  ExamIcon,
  LeasonsIcon,
  MsgIcon,
  ProgressIcon,
  RattingIcon,
} from "../SVG/Icons";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";

const Explore = () => {
  return (
    <div className="section-padding-x section-padding-y">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <Title level="title48">Explore Our GCSE Maths Course</Title>
        <Title level="title20">
          Everything you need to master GCSE Maths, all in one place.
        </Title>
      </div>

      {/* Content Box */}
      <div className="mt-14 p-6 sm:p-10 border bg-bg-custom1 dark:bg-[#0B1120] rounded-2xl flex flex-col lg:flex-row gap-10">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 max-h-[416px] flex justify-center">
          <img
            src={explore}
            alt="explore"
            className="w-full h-auto max-w-[400px] sm:max-w-full object-cover rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          {/* Price & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-secondaryColor text-3xl lg:text-5xl font-semibold">
              $25 <span className="text-base font-normal">/ month</span>
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <RattingIcon /> <span className="font-semibold dark:text-white">(4.8 Reviews)</span>
            </p>
          </div>

          {/* Title */}
          <Title level="title24" className="mt-5">
            Master Algebra with Confidence — Build Strong Foundations for Exams
          </Title>

          {/* Features */}
          <div className="flex flex-col gap-4 mt-5">
            <p className="flex items-center gap-2 text-tertiaryColor text-lg font-medium">
              <MsgIcon className={"!dark:text-white"}/>
              24/7 one-to-one support
            </p>
            <p className="flex items-center gap-2 text-tertiaryColor text-lg font-medium">
              <LeasonsIcon />
              80+ Video Lessons
            </p>
            <p className="flex items-center gap-2 text-tertiaryColor text-lg font-medium">
              <ProgressIcon />
              Progress trackers
            </p>
            <p className="flex items-center gap-2 text-tertiaryColor text-lg font-medium">
              <ExamIcon />
              Exam techniques
            </p>
          </div>

          {/* Button */}
          <CommonButton link={"/course-details"} variant="secondary" className="mt-6 group w-full sm:w-auto">
            Start Your 2 Day Free Trial
            <span className="rounded-full p-1 bg-black group-hover:bg-secondaryColor ml-2">
              <MdArrowOutward className="text-primaryColor text-2xl group-hover:text-white text-white" />
            </span>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Explore;
