import React, { useState } from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward, MdCheckCircle } from "react-icons/md";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";

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

  if (isLoading) return <ExploreSkeleton />;

  return (
    <section className="section-padding-x">
      {/* Header with decorative element */}
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-secondaryColor rounded-full opacity-50" />
        <Title level="title48" className="font-bold tracking-tight dark:text-white">
          {courseData?.title || "Explore Our Premium Content"}
        </Title>
      </div>

      {/* Main Feature Card */}
      <div className="overflow-hidden bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-2xl shadow-gray-200/50 dark:shadow-none flex flex-col lg:flex-row">
        
        {/* Left Side: Visual/Image */}
        <div className="w-full lg:w-5/12 relative group bg-gray-50 dark:bg-gray-900/50 p-6 flex items-center justify-center">
          <div className="relative">
            <img
              src={courseData?.thumbnail}
              alt={courseData?.title}
              className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />

          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-7/12 p-8 lg:p-14 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            {/* Billing Toggle (Professional Style) */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              {["monthly", "yearly"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-6 py-2 text-sm font-bold capitalize rounded-lg transition-all ${
                    billingCycle === cycle
                      ? "bg-white dark:bg-gray-700 text-secondaryColor shadow-md"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>

            {/* Price Display */}
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl lg:text-5xl font-black text-secondaryColor">
                  £{billingCycle === "monthly" ? courseData?.price : (courseData?.price * 10).toFixed(0)}
                </span>
                <span className="text-gray-400 font-medium">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
              </div>
     
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-secondaryColor font-bold text-sm uppercase tracking-widest">
                {courseData?.category || "Category"}
              </span>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">What's included in this course</h3>
            </div>

            <div 
              className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: courseData?.description }}
            />



           
              <CommonButton
                onClick={handleAction}
                disabled={isLoading || isPending || !courseData?.id}
                variant="secondary"
                className="w-full "
              >
                Start Your 2-Day Free Trial
                <MdArrowOutward className="ml-3 text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </CommonButton>
              <p className="mt-4 text-xs text-gray-400 text-center sm:text-left">
                * No commitment required. Cancel anytime during your trial period.
              </p>
          
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- Skeleton Component --- */
const ExploreSkeleton = () => (
  <div className="section-padding-x py-16 animate-pulse">
    <div className="h-12 bg-gray-200 dark:bg-gray-800 w-1/2 mx-auto rounded-xl mb-16" />
    <div className="max-w-6xl mx-auto h-[600px] bg-gray-100 dark:bg-gray-900 rounded-[2.5rem]" />
  </div>
);

export default Explore;