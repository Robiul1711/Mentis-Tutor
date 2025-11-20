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
  { id: 1, icon: GuideIcon, text: "Guided Learning Never Alone", img: dashboard1 },
  { id: 2, icon: AccesableIcon, text: "Accessible & Affordable for All Families", img: dashboard2 },
  { id: 3, icon: BaseIcon, text: "Based on Real Exam Success Strategies", img: dashboard3 },
  { id: 4, icon: MessageIcon2, text: "Supportive Human Mentors Behind Every Answer", img: dashboard4 },
  { id: 5, icon: DesignIcon, text: "Designed to Empower Ambition, Not Define Limits", img: dashboard5 },
];

const AboutHero = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const imgRef = useRef(null);



  return (
    <section ref={sectionRef} className="section-padding-x">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div ref={titleRef}>
          <Title level="title48">What Makes Mentis Different</Title>
        </div>

        <p ref={subtitleRef} className="text-lg mt-3 leading-relaxed">
          A smarter way to learn GCSE Maths combining expert teaching,
          interactive tools, and real progress tracking.
        </p>
      </div>

      {/* Feature Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
        {features.map((item, index) => (
          <div
            key={item.id}
        
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer bg-white rounded-2xl p-6 shadow-sm text-center border 
              transition-all duration-300 ${
                activeTab === index
                  ? "border-Secondary shadow-md scale-[1.03]"
                  : "border-gray-100"
              }`}
          >
            <div className="flex items-center justify-center mb-4">
              <item.icon />
            </div>
            <p className="text-gray-800 font-medium text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Dashboard Slider */}
      <div className="relative max-w-6xl mx-auto">
       
        {/* Tablet Frame */}
        <div className="md:bg-[#C9C9C9] md:p-8 rounded-3xl">

              <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] sm:h-[400px] md:h-[500px]">
                <img
                  ref={imgRef}
                  key={activeTab}
                  src={features[activeTab].img}
                  alt="dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
        
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
