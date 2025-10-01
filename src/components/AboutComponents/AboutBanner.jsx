import React from "react";
import about1 from "../../assets/images/about1.png";
import about2 from "../../assets/images/about2.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";

const AboutBanner = () => {
  return (
    <div className="flex w-full gap-16 flex-col lg:flex-row section-padding-x py-16">
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-4 relative">
        <div className="flex gap-7 w-full relative">
          {/* Image sliding slightly down */}
          <img
            src={about2}
            alt="bannerthumbnail"
            className="w-[345px] h-auto rounded-xl transform translate-y-4 transition-transform duration-500 hover:translate-y-6"
          />
          {/* Image sliding slightly up */}
          <img
            src={about1}
            alt="bannerthumbnail"
            className="w-[345px] h-auto rounded-xl transform -translate-y-4 transition-transform duration-500 hover:-translate-y-6"
          />
        </div>
      </div>

      {/* Right Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mt-8 lg:mt-0">
        <Title level="title56">Shaping the Future of GCSE Maths Learning</Title>
        <Title level="title20" className="text-gray-600 leading-relaxed">
          Mentis combines expert tutors, smart tools, and personalized study plans to help every student achieve exam success with confidence.
        </Title>
        <div className="flex justify-center lg:justify-start">
          <CommonButton variant="secondary" className="mt-6 group">
            Start Your 2 Day Free Trial
            <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
              <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />
            </span>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
