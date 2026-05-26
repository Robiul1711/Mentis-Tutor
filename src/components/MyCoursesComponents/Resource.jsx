import React from "react";
import Title from "../common/Title";
import Topic from "../DashboardComponents/Topic";
import { PdfIcon } from "../DashboardIcons/DashIcons";

const Resource = () => {
  return (
    <div className="space-y-4">
      <Title level="title24">
        Master Algebra with Confidence Build Strong GCSE Maths for Exams
      </Title>
      <Title level="title18">
        Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do
        eiusmod tempor incididunt ut labore et dolore magna aliqua..
      </Title>
      <div className="w-full flex flex-col lg:flex-row gap-10 mt-8 ">
        <div className="lg:w-[40%] w-full">
          <Topic />
        </div>
        <div className="lg:w-[60%]">
          <div className="p-5 bg-bg-custom1 dark:bg-[#0B1120] dark:border rounded-2xl">
            <Title level="title24">Documents</Title>
            <div className="bg-white dark:bg-[#0B1120] dark:border flex gap-4 rounded-2xl mt-7 p-6">
              <button className="py-3 px-4 rounded-2xl border transition duration-300 bg-[#64B5F6]/10 text-black dark:text-white hover:dark:text-black hover:bg-gray-100 flex gap-2">
                <PdfIcon className="w-6 h-6 text-black dark:text-white" /> Book-Brochure.pdf
              </button>
              <button className="py-3 px-4 rounded-2xl border transition duration-300 bg-[#64B5F6]/10 text-black dark:text-white hover:dark:text-black hover:bg-gray-100 flex gap-2">
                <PdfIcon className="w-6 h-6 text-black dark:text-white" /> Book-Brochure.pdf
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
