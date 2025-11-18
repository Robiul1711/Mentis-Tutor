import React from "react";
import Title from "../common/Title";

const Guarantee = () => {
  return (
    <section className="w-full bg-[#e7f3e7] dark:bg-[#0B1120] dark:border-t dark:border-b py-12 px-4">
      <div className="text-center max-w-3xl mx-auto">

        {/* Title */}
        <Title level="title48" className="font-bold ">
          GUARANTEE
        </Title>

        {/* Sub text */}
        <p className="mt-3 leading-relaxed">
          Grade 7–9 Money-Back Guarantee. We believe in our students  
          <br /> and we back it.
        </p>

        {/* Testimonials */}
        <div className="mt-6  space-y-1 italic">
          <p>"Mentis helped me jump from grade 5 to Grade 8 in 3 months"</p>
          <p>"Finally, a tutor who actually replays when you're stuck"</p>
          <p className="not-italic">
            Add Guarantee line Try risk free. Cancel anytime.
          </p>
        </div>

        {/* Note */}
        <p className="mt-6  text-[15px]">
          <span className="font-semibold">Note:</span> Terms apply requires consistent study for 4 months.
        </p>
      </div>
    </section>
  );
};

export default Guarantee;
