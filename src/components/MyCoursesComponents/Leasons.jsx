"use client";
import React, { useState, useEffect, useRef } from "react";
import Title from "../common/Title";
import { BsDownload } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ConfidentIcon,
  NeedWoekIcon,
  OKIcon,
} from "../DashboardIcons/DashIcons";
import Quiz from "./Quiz";

const Lessons = ({ currentVideo }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    if (currentVideo && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentVideo]);

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  const handleSelectChange = (value) => {
    switch (value) {
      case "practice":
        handleDownload("/pdfs/practice-questions.pdf");
        break;
      case "extra":
        handleDownload("/pdfs/extra-questions.pdf");
        break;
      default:
        break;
    }
  };

  return (
    <div ref={topRef} className="flex flex-col w-full">
      {/* Header */}
      <Title level="title32" className="text-xl sm:text-2xl lg:text-3xl">
        Lessons
      </Title>

      {/* Action Buttons Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 py-4 sm:py-6">
        {/* Tutorial/Quiz Toggle */}
        <div className="flex gap-2 sm:gap-4 w-full lg:w-auto">
          <button
            onClick={() => setShowQuiz(false)}
            className={`flex-1 lg:flex-none py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl border font-semibold text-sm sm:text-base transition duration-300
              ${
                !showQuiz
                  ? "bg-[#008000]/10 text-[#008000] border-[#008000]/20"
                  : "border-[#008000]/10 text-[#008000] hover:bg-[#008000]/5"
              }`}
          >
            Tutorial
          </button>
          <button
            onClick={() => setShowQuiz(true)}
            className={`flex-1 lg:flex-none py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl border font-semibold text-sm sm:text-base transition duration-300
              ${
                showQuiz
                  ? "bg-[#008000]/10 text-[#008000] border-[#008000]/20"
                  : "border-[#008000]/10 text-[#008000] hover:bg-[#008000]/5"
              }`}
          >
            Quiz
          </button>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          <button className="flex items-center justify-center gap-2 py-2 sm:py-1.5 px-4 rounded-lg border transition duration-300 border-Secondary text-sm sm:text-base hover:bg-Secondary hover:text-white">
            <BsDownload className="text-sm sm:text-base" />
            <span className="whitespace-nowrap">Template Notes Set</span>
          </button>

          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-Secondary py-2 sm:py-3 !text-white border-Secondary outline-none text-sm sm:text-base">
              <SelectValue placeholder="Question Packs" />
            </SelectTrigger>
            <SelectContent className="bg-Secondary text-white">
              <SelectGroup>
                <SelectItem
                  value="practice"
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <BsDownload />
                  Practice Questions Set
                </SelectItem>
                <SelectItem
                  value="extra"
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <BsDownload />
                  Extra Question Pack
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 transition-all duration-300">
        {showQuiz ? (
          <div className="p-4 sm:p-6">
            <Quiz quizData={currentVideo?.quizzes || []} />
          </div>
        ) : (
          <div className="w-full h-auto min-h-[200px] flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg sm:text-xl font-medium">
            {currentVideo?.url ? (
              <video
                src={currentVideo.url}
                controls
                className="w-full h-full max-h-[600px] object-contain"
                poster={currentVideo.thumbnail || ""}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="py-20">Select a lesson to view content</div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Section */}
      {currentVideo?.title  &&
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 py-4 sm:py-6">
        <Title
          level="title24"
          className="text-lg sm:text-xl lg:text-2xl text-center lg:text-left"
        >
          {currentVideo?.title }
        </Title>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
          {/* Confident Option */}
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <input
              type="radio"
              name="lesson-feeling"
              className="w-4 h-4 text-Secondary focus:ring-Secondary"
            />
            <span className="text-sm sm:text-base whitespace-nowrap">
              Confident
            </span>
            <ConfidentIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </label>

          {/* Okay Option */}
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <input
              type="radio"
              name="lesson-feeling"
              className="w-4 h-4 text-Secondary focus:ring-Secondary"
            />
            <span className="text-sm sm:text-base whitespace-nowrap">Okay</span>
            <OKIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </label>

          {/* Needs Work Option */}
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <input
              type="radio"
              name="lesson-feeling"
              className="w-4 h-4 text-Secondary focus:ring-Secondary"
            />
            <span className="text-sm sm:text-base whitespace-nowrap">
              Needs Work
            </span>
            <NeedWoekIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </label>
        </div>
      </div>
      }


    </div>  
    
  );
};

export default Lessons;
