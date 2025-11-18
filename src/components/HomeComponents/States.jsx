import React from 'react';
import CountUp from "react-countup";
import { CourseIcon, QAIcon, StarIcon } from '../SVG/Icons';
import Title from '../common/Title';

const States = () => {
  const data = [
    {
      title: 22225222,
      subtitle: "Students",
      icon: <CourseIcon className={"size-8 sm:size-10 md:size-auto"} />,
      suffix: "",
    },
    {
      title: 500,
      subtitle: "5 Star Review",
      icon: <StarIcon className={"size-8 sm:size-10 md:size-auto"} />,
      suffix: "+",
    },
    {
      title: 50000,
      subtitle: "Question Answers",
      icon: <QAIcon className={"size-8 sm:size-10 md:size-auto"} />,
      suffix: "+",
    },
  ];

  return (
    <div className='section-padding-x bg-[#FFF] dark:bg-[#0B1120] dark:border-t dark:border-b gap-12 py-16 grid grid-cols-2 md:grid-cols-3'>

      {data.map((item, i) => (
        <div key={i} className='flex gap-4 items-center'>
          {item.icon}

          <div className='flex flex-col'>
            {/* Count animation */}
            <Title level="title32" className="!font-bold">
              <CountUp 
                end={item.title}     // number to count up to
                duration={2}         // speed
                separator=","        // formatting like 50,000
              />
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
