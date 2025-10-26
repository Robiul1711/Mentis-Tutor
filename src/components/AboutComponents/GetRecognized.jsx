import React from "react";
import Title from "../common/Title";
import {
  BookIcon,
  EarnIcon,
  HatIcon,
  Star1Icon,
  Star2Icon,
  Star3Icon,
} from "../SVG/Icons";

const GetRecognized = () => {
  // Array of card data
  const cards = [
    {
      id: 1,
      star: <Star1Icon />,
      icon: <HatIcon />,
      title: "Expert Tutors",
      background: "bg-[#F1FDFF]",
      description:
        "Learn directly from expert tutors who achieved top grades and know the proven strategies for success.",
      bg: "bg-[#1BCBE3]",
    },
    {
      id: 2,
      star: <Star2Icon />,
      icon: <BookIcon />,
      title: "Effective Courses",
         background: "bg-[#EDEAFF]",
      description:
        "when an unknown printer took a galley offe type and scrambled makes.",
      bg: "bg-[#5751E1]",
    },
    {
      id: 3,
      star: <Star3Icon />,
      icon: <EarnIcon />,
      title: "Earn Certificate",
         background: "bg-[#FFF7E2]",
      description:
        "When an unknown printer took a galley offe type and scrambled makes.",
      bg: "bg-[#FFC224]",
    },
  ];

  return (
    <div className="section-padding-x py-16 bg-bg-custom1 dark:bg-[#0B1120]">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[1200px] mx-auto text-center">
        <Title level="title48">Get Recognized With Your Achievements</Title>
        <Title level="title20">
          Complete our GCSE Maths courses and earn certificates to showcase your
          skills and dedication.
        </Title>
      </div>

      {/* Cards Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 ${card.background}`}
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <p className={`p-3 rounded-full w-fit ${card.bg}`}>
                  {card.icon}
                </p>
                <Title level="title24" className="font-semibold text-gray-900">
                  {card.title}
                </Title>
              </div>
              <p className="">{card.star}</p>
            </div>

            {/* Description */}
            <Title
              level="title16"
              className="text-gray-600 leading-relaxed text-sm sm:text-base"
            >
              {card.description}
            </Title>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetRecognized;
