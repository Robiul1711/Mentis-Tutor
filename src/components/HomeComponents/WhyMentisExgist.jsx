import React from "react";
import s1 from "@/assets/images/s1.png";
import s2 from "@/assets/images/s2.png";
import s3 from "@/assets/images/s3.png";
import Title from "../common/Title";
const WhyMentisExgist = () => {
  return (
    <section className="section-padding-x pb-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <Title level="title48" className="dark:text-white">
          WHY MENTIS EXISTS – <span className="text-black">“Tutoring for Everyone”</span>
        </Title>
        <Title level="title20" className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4">
          We built Mentis to make high-quality GCSE tutoring accessible, affordable, 
          and achievable for every student no matter where they start.
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-14">
        {/* Images */}
        <div className="flex gap-6 justify-center ">
          <img
            src={s1}
            alt="Student"
            className="rounded-lg w-[32%] object-cover h-[350px]"
          />
          <img
            src={s2}
            alt="Student"
           className="rounded-lg w-[32%] object-cover h-[350px] -translate-y-10"

          />
          <img
            src={s3}
            alt="Student"
            className="rounded-lg w-[32%] object-cover h-[350px]"
          />
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-4 md:text-left">
         <Title level="title32" className="font-semibold text-gray-900 dark:text-white">
            Traditional tutoring costs hundreds a month and limits learning
            to one hour a week.
          </Title>

           <Title level="title32" className="font-semibold text-gray-900 dark:text-white">
            Mentis gives every student access to real help — anytime. anywhere —
            for just <span className="font-bold">£25 a month.</span>
          </Title>
        </div>
      </div>
    </section>
  );
};

export default WhyMentisExgist;
