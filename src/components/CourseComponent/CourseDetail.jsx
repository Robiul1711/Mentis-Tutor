import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaUserFriends, FaBook, FaChartLine } from "react-icons/fa";
import explore from "../../assets/images/explore.png";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";
import {
  ExamIcon,
  LeasonsIcon,
  MsgIcon,
  ProgressIcon,
  TiqIcon,
} from "../SVG/Icons";
import AllChaptes from "./AllChaptes";
const CourseDetail = () => {
  return (
    <div className="">
      {/* Top Section */}
      <div className="lg:flex lg:gap-8">
        {/* Image */}
        <div className="lg:w-2/3">
          <img
            src={explore} // replace with actual image path
            alt="Course"
            className="w-full h-[480px] rounded-lg shadow-lg"
          />
          <div className="mt-3 flex items-center text-gray-500">
            <AiOutlineClockCircle className="mr-2" />
            <span>July 11, 2025</span>
          </div>
          <h1 className="text-2xl  font-semibold mt-2">
            Master Algebra with Confidence Build Strong Foundations for Exams
          </h1>
          <button className="mt-4 px-6 py-2 bg-Secondary text-white rounded-full hover:bg-blue-700 transition-all">
            Overview
          </button>
          {/* Course Description */}
          <div className="mt-10 border p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Course Description</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              What you'll learn in this course?
            </h3>
            <ul className="flex flex-col gap-3 text-[#5751E1]">
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

            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="mt-10">
            <AllChaptes/>
          </div>
        </div>
        {/* Sidebar */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <div className=" text-white ">
            <div className="bg-Secondary  p-6 flex flex-col gap-6 rounded-[20px]">
              <p className="text-gray-300 text-sm sm:text-base lg:text-xl">
                This Course Fee:
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">
                $25
              </p>
            </div>
            <div className=" mt-5 bg-white p-6 flex flex-col gap-6 rounded-[20px]">
              <p className="flex items-center gap-2 text-Tertiary text-lg font-medium">
                <MsgIcon />
                24/7 one-to-one support
              </p>
              <p className="flex items-center gap-2 text-Tertiary text-lg font-medium">
                <LeasonsIcon />
                80+ Video Lessons
              </p>
              <p className="flex items-center gap-2 text-Tertiary text-lg font-medium">
                <ProgressIcon />
                Progress trackers
              </p>
              <p className="flex items-center gap-2 text-Tertiary text-lg font-medium">
                <ExamIcon />
                Exam techniques
              </p>
            </div>

            <CommonButton variant="secondary" className="mt-6 group w-full ">
              {" "}
              Explore The Course{" "}
              <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
                {" "}
                <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />{" "}
              </span>{" "}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
