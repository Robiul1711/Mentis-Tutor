import React from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import bannerthumbnail from "../../assets/images/bannerthumb.png";
import { MdArrowOutward } from "react-icons/md";
import VideoButton from "../common/VideoButton";

const Banner = () => {
  return (
    <div className="section-padding-x flex flex-col-reverse lg:flex-row items-center justify-between py-12 lg:py-20 gap-10 lg:gap-16">
      {/* Left Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mt-8 lg:mt-0">
        <Title level="title56">
          No matter your age you can get a grade 9 with me here at{" "}
          <span className="text-Primary">Mentis.</span>
        </Title>

        <Title level="title20" className="text-gray-600 leading-relaxed">
          Master GCSE Maths for less than the cost of one tutoring session. Only
          <span className="font-semibold"> £25/month </span>
          for full course videos, past papers, quizzes, and 1-to-1 support.
        </Title>

        <div className="flex justify-center lg:justify-start">
  <CommonButton variant="secondary" className="mt-6 group "> Start Your 2 Day Free Trial{" "} <span className="rounded-full p-1 bg-black group-hover:bg-Secondary"> {" "} <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" /> </span> </CommonButton>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-4">
        <div className="relative max-w-[550px] w-full">
          <img
            src={bannerthumbnail}
            alt="bannerthumbnail"
            className="w-full h-auto rounded-xl"
          />
          {/* Centered Play Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <VideoButton />
          </div>
        <p className="text-Tertiary text-sm lg:text-base  ">
          Bite-sized videos that teach you the ins and outs of every topic in a quarter of the time.
        </p>
        </div>

      </div>
    </div>
  );
};

export default Banner;
