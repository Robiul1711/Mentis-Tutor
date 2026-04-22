import React, { useContext, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward, MdStars } from "react-icons/md";
import { AuthContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";

const PricingComparison = () => {
  const { user } = useContext(AuthContext);
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

  return (
    <section id="pricing" className="section-padding-x py-10 sm:py-16 md:py-24 bg-gray-50 dark:bg-[#0f1524]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-Primary uppercase bg-blue-50 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
            Pricing Comparison
          </span>
          <p  className="dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b]">
            Same Grade 9. <span className="text-secondaryColor">90% cheaper.</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            High-quality Grade 9 education designed to be accessible. Choose the path that fits your budget and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* COMPARISON CARD: PRIVATE TUTOR */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col transition-all hover:shadow-md">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Private Tutor</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Traditional high-cost learning</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">£200–400</span>
                <span className="text-gray-500 dark:text-gray-400">/mo</span>
              </div>
            </div>

            <div className="space-y-5 flex-grow">
              <FeatureItem label="Total learning" value="4–8 hrs" />
              <FeatureItem label="Support outside lessons" isAvailable={false} />
              <FeatureItem label="Past papers included" isAvailable={false} />
              <FeatureItem label="Grade 7–9 guarantee" isAvailable={false} />
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-center text-sm text-gray-400">Standard market rates</p>
            </div>
          </div>

          {/* PREMIUM CARD: MENTIS */}
          <div className="relative bg-white dark:bg-gray-900 border border-secondaryColor rounded-3xl p-8 flex flex-col shadow-xl shadow-secondaryColor">
 

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mentis Learning</h3>
                <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      billingCycle === "monthly" ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white" : "text-gray-500"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      billingCycle === "yearly" ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white" : "text-gray-500"
                    }`}
                  >
                    Yearly (Save 15%)
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-4xl font-bold text-secondaryColor">
                  £{billingCycle === "monthly" ? courseData?.price : (courseData?.price * 10).toFixed(0)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
              </div>
            </div>

            <div className="space-y-5 flex-grow">
              <FeatureItem label="Total learning" value="Unlimited" highlight />
              <FeatureItem label="24/7 Priority Support" isAvailable={true} />
              <FeatureItem label="Full Past Paper Library" isAvailable={true} />
              <FeatureItem label="Grade 7–9 guarantee" isAvailable={true} />
            </div>

            <div className="mt-10">
              <CommonButton
                onClick={handleAction}
                disabled={isLoading || isPending || !courseData?.id}
                variant="secondary"
                className="w-full"
              >
                Start Your 2-Day Free Trial
                <MdArrowOutward className="ml-2 text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </CommonButton>
              <p className="text-center text-xs text-gray-400 mt-4">No credit card required to start trial</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Sub-component for cleaner code
const FeatureItem = ({ label, value, isAvailable, highlight }) => (
  <div className="flex justify-between items-center py-1">
    <span className={`text-[15px] ${highlight ? "font-bold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
      {label}
    </span>
    {value ? (
      <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
    ) : isAvailable ? (
      <HiCheck className="text-green-500 text-2xl" />
    ) : (
      <HiX className="text-red-400 text-2xl" />
    )}
  </div>
);

export default PricingComparison;