import React from "react";
import Title from "../common/Title";
import why from "../../assets/images/why.png";
import { BookIcon, EarnIcon, HatIcon } from "../SVG/Icons";

const WhyChoose = () => {
  return (
    <div className="section-padding-x py-16 bg-bg-custom1 dark:bg-[#0B1120] transition-colors duration-300">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <Title level="title48" className="dark:text-white">
          Why Choose Mentis for Your GCSE Maths Success?
        </Title>
        <Title level="title20" className="text-gray-700 dark:text-gray-300">
          Personalized support, engaging lessons, and proven methods designed to
          help you achieve top grades with confidence.
        </Title>
      </div>

      <div className="mt-14 flex flex-col lg:flex-row gap-10 justify-between w-full">
        {/* Left Section */}
        <div className="w-full lg:w-[60%]">
          <div className="bg-[#F1FDFF] dark:bg-[#1B2A41] rounded-tr-[100px] p-8 flex flex-col gap-4 hover:shadow-xl transition-all duration-300">
            <p className="p-3 bg-[#1BCBE3] rounded-full w-fit">
              <HatIcon className="w-6 h-6 text-white" />
            </p>
            <Title level="title24" className="font-semibold text-gray-900 dark:text-white">
              Expert Tutors
            </Title>
            <Title
              level="title16"
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
            >
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Title>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row items-start gap-6">
            <div className="bg-[#EDEAFF] dark:bg-[#2A2345] rounded-r-full p-5 flex items-start gap-6 hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-[#5751E1] rounded-full flex items-center justify-center">
                <BookIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-3">
                <Title level="title24" className="font-semibold text-gray-900 dark:text-white">
                  Effective Courses
                </Title>
                <Title
                  level="title16"
                  className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Title>
              </div>
            </div>

            <div className="bg-[#FFF7E2] dark:bg-[#4A3E1F] rounded-2xl p-5 flex flex-col gap-4 hover:shadow-xl transition-all duration-300">
              <p className="p-3 bg-[#FFC224] rounded-full w-fit">
                <EarnIcon className="w-6 h-6 text-white" />
              </p>
              <Title level="title24" className="font-semibold text-gray-900 dark:text-white">
                Earn Certificate
              </Title>
              <Title
                level="title16"
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Title>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-end gap-4">
          <img
            src={why}
            alt="bannerthumbnail"
            className="w-full h-auto rounded-xl shadow-lg dark:brightness-90"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
