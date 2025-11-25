import React, { useRef, useEffect } from "react";
import { CountUp } from "countup.js"; // using the JS version
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CourseIcon, QAIcon, StarIcon } from "../SVG/Icons";
import Title from "../common/Title";

gsap.registerPlugin(ScrollTrigger);

const States = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  const data = [
    { title: 22225222, subtitle: "Students", icon: <CourseIcon className="size-8 sm:size-10 md:size-auto text-[#2A4C67] dark:text-white" />, suffix: "" },
    { title: 500, subtitle: "5 Star Review", icon: <StarIcon className="size-8 sm:size-10 md:size-auto text-[#2A4C67] dark:text-white" />, suffix: "+" },
    { title: 50000, subtitle: "Question Answers", icon: <QAIcon className="size-8 sm:size-10 md:size-auto text-[#2A4C67] dark:text-white" />, suffix: "+" },
  ];

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        countersRef.current.forEach((counter, i) => {
          const countUp = new CountUp(counter, data[i].title, {
            duration: 2,
            separator: ",",
          });
          if (!countUp.error) countUp.start();
        });
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section-padding-x bg-white dark:bg-[#0B1120] dark:border-t dark:border-b gap-12 py-16 grid grid-cols-2 md:grid-cols-3"
    >
      {data.map((item, i) => (
        <div key={i} className="flex gap-4 items-center">
          {item.icon}

          <div className="flex flex-col">
            <Title level="title32" className="!font-bold">
              <span
                ref={(el) => (countersRef.current[i] = el)}
                className="inline-block"
              >
                0
              </span>
              {item.suffix}
            </Title>

            <Title level="title20" className="!font-bold">
              {item.subtitle}
            </Title>
          </div>
        </div>
      ))}
    </div>
  );
};

export default States;
