import React from "react";
import about1 from "../../assets/images/about1.png";
import about2 from "../../assets/images/about2.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";

const AboutBanner = () => {
  return (
    <div className="w-full section-padding-x py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative max-w-2xl">
            {/* Image Container with responsive sizing */}
            <div className="flex gap-4 sm:gap-6 lg:gap-7 relative">
              {/* First Image - slides down on hover */}
              <div className="relative group">
                <img
                  src={about2}
                  alt="Student learning GCSE maths"
                  className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[345px] h-auto rounded-xl transform translate-y-3 lg:translate-y-4 transition-all duration-500 ease-out group-hover:translate-y-4 lg:group-hover:translate-y-6 shadow-lg"
                />
                {/* Optional decorative element */}
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-Primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Second Image - slides up on hover */}
              <div className="relative group self-end">
                <img
                  src={about1}
                  alt="GCSE maths tutoring session"
                  className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[345px] h-auto rounded-xl transform -translate-y-3 lg:-translate-y-4 transition-all duration-500 ease-out group-hover:-translate-y-4 lg:group-hover:-translate-y-6 shadow-lg"
                />
                {/* Optional decorative element */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-Secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            
            {/* Background decorative element for larger screens */}
            <div className="hidden lg:block absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-Primary/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Right Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-4 sm:space-y-6 text-center lg:text-left">
          {/* Title with responsive sizing */}
          <Title 
            level="title48" 
            className="leading-tight sm:leading-tight lg:leading-tight"
          >
            Shaping the Future of GCSE Maths Learning
          </Title>
          
          {/* Description with responsive text sizing */}
          <Title 
            level="title20" 
            className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed sm:leading-relaxed dark:text-gray-300"
          >
            Mentis combines expert tutors, smart tools, and personalized study plans to help every student achieve exam success with confidence.
          </Title>
          
          {/* Button with responsive sizing */}
          <div className="flex justify-center lg:justify-start pt-2 sm:pt-4 lg:pt-6">
            <CommonButton 
              variant="secondary" 
              className="mt-2 sm:mt-4 lg:mt-6 group px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold"
            >
              <span className="flex items-center gap-2 sm:gap-3">
                Start Your 2 Day Free Trial
                <span className="rounded-full p-1 sm:p-1.5 bg-black dark:bg-white group-hover:bg-Secondary transition-colors duration-300">
                  <MdArrowOutward className="text-Primary dark:text-black text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
                </span>
              </span>
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;