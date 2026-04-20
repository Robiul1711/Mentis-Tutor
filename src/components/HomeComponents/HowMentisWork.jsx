import React from "react";
import { useApiQuery } from "@/hooks/apiQuery";
import Title from "../common/Title";

// Import images
import learnImg from "../../assets/images/learn.jpg";
import practiceImg from "../../assets/images/practice.jpg";
import supportImg from "../../assets/images/support.jpg";
import achieveImg from "../../assets/images/achive.jpg";

const HowMentisWork = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["how-mentis-works"],
    url: "/cms/home_page/how_mentis_works_section",
  });

  const sectionData = data?.data?.how_mentis_works_section || {};
  const header = sectionData?.item_1 || {};
console.log(sectionData)
  const steps = [
    {
      id: "learn",
      number: 1,
      title: "Learn",
      badge: "Lessons",
      description: "Watch GCSE topic lessons (Edexcel / AQA aligned).",
      image: learnImg,
    },
    {
      id: "practise",
      number: 2,
      title: "Practise",
      badge: "Task Mode",
      description: "Do past-paper style questions. Mark as you go.",
      image: practiceImg,
    },
    {
      id: "support",
      number: 3,
      title: "Get support",
      badge: "Tutor Support",
      description: "Message your tutor anytime. Zoom if needed.",
      image: supportImg,
    },
    {
      id: "achieve",
      number: 4,
      title: "Achieve",
      badge: "Progress Tracker",
      description:
        "Track weak topics + past paper scores. Clear next step.",
      image: achieveImg,
    },
  ];

  if (isLoading) return null;

  return (
    <section className="section-padding-x py-16 md:py-24 bg-[#F8FAFC] dark:bg-[#0B1120]">
      {/* Header */}
      <div className="text-center mb-16">
        <Title level="title48" className="text-[#1E293B] font-bold uppercase tracking-tight">
          {header.title || "HOW MENTIS WORKS"}
        </Title>
        <p className="mt-4 text-[#475569] text-base md:text-lg">
          A simple loop: <span className="font-bold">Learn</span> →{" "}
          <span className="font-bold">Practise</span> →{" "}
          <span className="font-bold">Get support</span> →{" "}
          <span className="font-bold">Repeat</span>.
        </p>
      </div>

      {/* Progress Numbers */}
      <div className="hidden md:flex items-center justify-center mb-16 ">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                {step.number}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center justify-center px-4 min-w-[80px] lg:min-w-[150px]">
                <div className="h-[2px] bg-[#BFDBFE] w-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#BFDBFE] rotate-45"></div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative ">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col group h-full">
            {/* Small Horizontal Arrow between cards (Desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-[180px] -right-8 z-20">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#60A5FA]"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col items-center h-full border border-gray-100 dark:border-gray-700 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.04)]">
              {/* Card Title */}
              <h3 className="text-[20px] lg:text-[24px] font-bold text-[#1E293B] dark:text-white mb-6">
                {step.title}
              </h3>

              {/* Image Container with Badge */}
              <div className="relative w-full mb-8">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge Overlay */}
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-[13px] font-bold px-5 py-1.5 rounded-md shadow-[0_4px_10px_rgba(59,130,246,0.4)] z-10 whitespace-nowrap">
                  {step.badge}
                </div>
              </div>

              {/* Description */}
              <p className="text-center text-[#475569] dark:text-gray-400 text-[14px] lg:text-[15px] leading-relaxed grow">
                {step.description}
              </p>

              {/* Bottom Label/Button UI */}

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowMentisWork;


