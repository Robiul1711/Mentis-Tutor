import React, { useState } from "react";
import Title from "../common/Title";
import { FaCheck } from "react-icons/fa";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import ClipLoader from "react-spinners/ClipLoader";
const Explore = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const { data, isLoading } = useApiQuery({
    queryKey: ["courses-all"],
    url: "/courses/all",
    secure: true,
  });

  const courseData = data?.data?.[0] || {};

  const { mutate, isPending } = useApiMutation({
    url: "/course/checkout",
    method: "POST",
    secure: true,
    onSuccess: (response) => {
      if (response?.url) window.location.href = response.url;
    },
  });

  const handleAction = () => {
    mutate({
      course_id: courseData?.id,
      billing_cycle: billingCycle,
    });
  };



if (isLoading) return (
  <div className="section-padding-x py-16 w-full h-[500px] lg:h-[600px] xl:h-[700px] flex justify-center items-center dark:bg-[#1E293B]">
    <ClipLoader
      color="#3b82f6" 
      loading={isLoading}
      size={50}
      aria-label="Loading Spinner"
    />
  </div>
);

  return (
    <section className="section-padding-x ">
      <div className=" bg-white dark:bg-[#1E293B] rounded-[24px] md:rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-4 sm:p-6 md:p-8  flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        
        {/* Left Side */}
        <div className="w-full lg:w-[50%] flex flex-col">
          <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-bold text-[#1e293b] leading-[1.1] dark:text-white mb-4">
            Explore Our GCSE <span className="text-Primary">Maths Course</span>  
          </h2>
          <p className="text-[14px] sm:text-base md:text-lg text-[#475569] dark:text-[#BABABA] mb-8 ">
            Grade 9 focused learning with tutor support, Task Mode practice and past papers.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-[#f1f5f9] dark:bg-[#334155] rounded-full p-1 mb-6 w-max">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-[14px] md:text-[15px] font-medium transition-all ${
                billingCycle === "monthly" ? "bg-[#4e94ff] text-white shadow-sm" : "text-[#64748b] dark:text-gray-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-[14px] md:text-[15px] font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly" ? "bg-white text-[#1e293b] dark:bg-gray-700 dark:text-white shadow-sm" : "text-[#64748b] dark:text-gray-300"
              }`}
            >
              Yearly <span className={`${billingCycle === "yearly" ? "text-[#10b981]" : "text-[#10b981]"}`}>(2 months free)</span>
            </button>
          </div>

          {/* Prices */}
          <div className="flex  items-start gap-8 sm:gap-16 mb-8">
            <div className={`flex flex-col transition-opacity duration-300 ${billingCycle !== "monthly" ? "opacity-30" : ""}`}>
              <div className="flex items-baseline gap-1">
                <span className="text-[1.75rem] md:text-[2.2rem] font-bold text-[#1e293b] dark:text-white">£30</span>
                <span className="text-[#1e293b] font-medium text-md md:text-lg dark:text-gray-300">/ month</span>
              </div>
            </div>

            <div className={`flex flex-col transition-opacity duration-300 ${billingCycle !== "yearly" ? "opacity-30" : ""}`}>
              <div className="flex items-baseline gap-1">
                <span className="text-[1.75rem] md:text-[2.2rem] font-bold text-[#1e293b] dark:text-white">£300</span>
                <span className="text-[#1e293b] font-medium text-md md:text-lg dark:text-gray-300">/ year</span>
              </div>
              <div className="bg-[#dcfce7] text-[#16a34a] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full w-max mt-1">
                2 months free
              </div>
              <p className="text-[#64748b] text-[13px] md:text-[15px] mt-2 font-medium">Equivalent to £25/month</p>
            </div>
          </div>

          {/* Reviews */}
          {/* <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#fbbf24] text-xl">
              <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
            </div>
            <span className="text-[#475569] dark:text-gray-400 font-medium text-[15px]">(12 reviews)</span>
          </div> */}

          {/* Checklist */}
          <div className="flex flex-col gap-3.5 mb-10">
            {[
              "Grade 9 video lessons (Edexcel/AQA aligned)",
              "Task Mode practice + guided marking (model solutions)",
              "Past paper walkthroughs (2022–2024)",
              "1-to-1 tutor messaging + Zoom when needed",
              "Progress tracking + clear next steps"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <FaCheck className="text-[#10b981] text-[15px] md:text-[18px] flex-shrink-0" strokeWidth={1} />
                <p className="text-[#334155] dark:text-gray-300 text-[13px] md:text-[16px]">{item}</p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex flex-col">
            <button
              onClick={handleAction}
              disabled={isLoading || isPending || !courseData?.id}
              className="bg-[#4e94ff] hover:bg-[#3b82f6] text-white font-semibold py-2 px-8 rounded-xl transition-all text-[13px] md:text-[16px] w-full sm:w-max shadow-sm"
            >
              Start Your 2 Day Free Trial
            </button>
            <p className="text-[#64748b] text-[14px] mt-3 sm:ml-2 text-center sm:text-left">Cancel anytime &bull; Instant access</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[50%] relative flex items-center justify-center mt-6 lg:mt-0">
          <div className="relative w-full">
            <img 
              src={courseData?.thumbnail || "https://placehold.co/800x600/e2e8f0/64748b?text=Course+Mockups"} 
              alt="Course Materials" 
              className="w-full h-auto object-contain drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};



export default Explore;