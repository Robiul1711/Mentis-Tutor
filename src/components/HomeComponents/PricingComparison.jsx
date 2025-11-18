import React from "react";
import { HiCheck, HiX } from "react-icons/hi";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";

const PricingComparison = () => {
  return (
        <section className="section-padding-x ">
          {/* Heading */}
          <div className="text-center mb-10">
            <Title level="title48" className="dark:text-white">
      Same Grade 9. 90% cheaper.
            </Title>
            <Title level="title20" className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4">
             Get high-quality Grade 9 education without breaking the bank.
            </Title>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        
        {/* PRIVATE TUTOR CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-[22px] font-semibold text-black">Private Tutor</h2>

          <div className="mt-4">
            <p className="text-[32px] font-bold text-[#0047ab]">
              £ 200–400 <span className="text-[14px] font-medium text-gray-500">/ per month</span>
            </p>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-4 text-[16px]">
            <div className="flex justify-between">
              <span>Total learning</span>
              <span>: 4–8 hrs</span>
            </div>

            <div className="flex justify-between">
              <span>Support outside lessons</span>
              <span className="flex items-center gap-2">: <HiX className="text-red-500 text-xl" /></span>
            </div>

            <div className="flex justify-between">
              <span>Past papers included</span>
              <span className="flex items-center gap-2">: <HiX className="text-red-500 text-xl" /></span>
            </div>

            <div className="flex justify-between">
              <span>Grade 7–9 guarantee</span>
              <span className="flex items-center gap-2">: <HiX className="text-red-500 text-xl" /></span>
            </div>
          </div>
        </div>

        {/* MENTIS CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-[22px] font-semibold text-black">Mentis</h2>

          <div className="mt-4 flex items-center gap-3">
            <p className="text-[32px] font-bold text-[#0047ab]">
              £ 25 <span className="text-[14px] font-medium text-gray-500">/ per month</span>
            </p>

            {/* Fake Switch */}
            <label className="flex items-center gap-2 text-[14px] text-gray-600 cursor-pointer">
              <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                <div className="absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white shadow"></div>
              </div>
              Yearly saves 2 months
            </label>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-4 text-[16px]">
            <div className="flex justify-between">
              <span>Total learning</span>
              <span>: Unlimited</span>
            </div>

            <div className="flex justify-between">
              <span>Support outside lessons</span>
              <span className="flex items-center gap-2">: <HiCheck className="text-green-500 text-xl" /></span>
            </div>

            <div className="flex justify-between">
              <span>Past papers included</span>
              <span className="flex items-center gap-2">: <HiCheck className="text-green-500 text-xl" /></span>
            </div>

            <div className="flex justify-between">
              <span>Grade 7–9 guarantee</span>
              <span className="flex items-center gap-2">: <HiCheck className="text-green-500 text-xl" /></span>
            </div>
          </div>

          {/* BUTTON */}
         <CommonButton link={'/dashboard'} variant="secondary" className="mt-6 group ">
            {" "}
            Start Your 2 Day Free Trial{" "}
            <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
              {" "}
              <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />{" "}
            </span>{" "}
          </CommonButton>
        </div>

      </div>
    </section>
  );
};

export default PricingComparison;
