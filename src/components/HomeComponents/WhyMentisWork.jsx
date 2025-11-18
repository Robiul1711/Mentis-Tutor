import React from "react";
import img1 from "@/assets/images/Overview.png";
import img2 from "@/assets/images/Schedule.png";
import img3 from "@/assets/images/Overview.png";
import img4 from "@/assets/images/Schedule.png";
import Title from "../common/Title";

const WhyMentisWork = () => {
  const features = [
    {
      id: 1,
      img: img1,
      text: "Real Tutor Support (7/24 messaging)",
    },
    {
      id: 2,
      img: img2,
      text: "All-in-one Platform (videos, quizzes, papers)",
    },
    {
      id: 3,
      img: img3,
      text: "Affordable for Every Family (£25/month)",
    },
    {
      id: 4,
      img: img4,
      text: "Confidence & Mindset Coaching",
    },
  ];

  return (
    <section className="w-full section-padding-x py-8 sm:py-10 md:py-14">
      {/* Heading */}
      <div className="text-center mb-14">
        <Title level="title48" className="text-black dark:text-white">
          WHY MENTIS WORKS
        </Title>

        <Title
          level="title20"
          className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mt-4"
        >
          Discover how Mentis empowers every student with personalized learning,
          progress tracking, and expert guidance that truly delivers results.
        </Title>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-xl transition-all"
          >
            <img
              src={item.img}
              alt="feature"
              className="w-full h-40 object-cover rounded-xl mb-6"
            />

            {/* Bullet point */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-Primary"></span>
              <p className="text-gray-800 dark:text-white text-lg font-medium">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyMentisWork;
