import React, { useEffect, useRef, useState } from "react";
import Title from "../common/Title";
import dashboard1 from "@/assets/images/about.png";
import dashboard2 from "@/assets/images/about1.png";
import dashboard3 from "@/assets/images/about2.png";
import dashboard4 from "@/assets/images/about3.png";
import dashboard5 from "@/assets/images/about.png";

import {
  AccesableIcon,
  BaseIcon,
  DesignIcon,
  GuideIcon,
  MessageIcon2,
} from "../SVG/Icons";

// =========================
// FEATURES WITH TAB IMAGES
// =========================
const features = [
  {
    id: 1,
    icon: GuideIcon,
    text: "Guided Learning Never Alone",
    img: dashboard1,
  },
  {
    id: 2,
    icon: AccesableIcon,
    text: "Accessible & Affordable for All Families",
    img: dashboard2,
  },
  {
    id: 3,
    icon: BaseIcon,
    text: "Based on Real Exam Success Strategies",
    img: dashboard3,
  },
  {
    id: 4,
    icon: MessageIcon2,
    text: "Supportive Human Mentors Behind Every Answer",
    img: dashboard4,
  },
  {
    id: 5,
    icon: DesignIcon,
    text: "Designed to Empower Ambition, Not Define Limits",
    img: dashboard5,
  },
];

const AboutHero = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRef = useRef(null);

  return (
    <section ref={sectionRef} className="section-padding-x py-8">
      {/* Heading - More Compact */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        {" "}
        <div ref={titleRef}>
          {" "}
          <Title level="title48">What Makes Mentis Different</Title>{" "}
        </div>{" "}
        <p ref={subtitleRef} className="text-lg mt-3 leading-relaxed">
          {" "}
          A smarter way to learn GCSE Maths combining expert teaching,
          interactive tools, and real progress tracking.{" "}
        </p>{" "}
      </div>

      {/* Feature Tabs - More Compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer bg-white rounded-xl p-4 shadow-sm text-center border 
              transition-all duration-200 ${
                activeTab === index
                  ? "border-Secondary shadow-sm scale-[1.02]"
                  : "border-gray-100 hover:border-gray-200"
              }`}
          >
            <div className="flex items-center justify-center mb-2">
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-gray-800 font-medium text-xs leading-tight">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Dashboard Slider - More Compact */}
      <div className="relative max-w-4xl mx-auto">
        {/* Tablet Frame */}
        <div className="md:bg-[#C9C9C9] md:p-6 rounded-2xl">
          <div className="rounded-xl overflow-hidden shadow-md h-[200px] sm:h-[250px] md:h-[350px]">
            <img
              ref={imgRef}
              key={activeTab}
              src={features[activeTab].img}
              alt="dashboard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
