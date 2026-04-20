import React from 'react';
import { Layers3, MessageSquareText, TrendingUp, CalendarCheck } from 'lucide-react';

const MentisDifference = () => {
  // Data structure for the features list
  const features = [
    {
      icon: Layers3,
      title: "More than just video lessons",
      description: "Students learn, practise, and get support in one place."
    },
    {
      icon: MessageSquareText,
      title: "Support between sessions",
      description: "Help is available when students get stuck, not just during a weekly lesson."
    },
    {
      icon: TrendingUp,
      title: "Clear next steps",
      description: "Progress tracking helps students focus on what to improve next."
    },
    {
      icon: CalendarCheck,
      title: "Built for consistency",
      description: "Mentis helps students stay on track outside school and tutoring."
    }
  ];

  return (
    <section className="section-padding-x section-padding-y">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Panel: Feature Text and Icons */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2b4b] tracking-tight">
                Why Mentis feels different
              </h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Mentis is designed to keep students progressing between lessons with the structure, support, and guidance that most courses and tutoring setups leave out.
              </p>
            </div>

            {/* Feature List (Slightly larger icons and spacing) */}
            <div className="space-y-10 border border-slate-100 bg-white p-10 rounded-3xl shadow-sm">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6 items-start group">
                  <div className="bg-[#64b5f6]/10 p-3.5 rounded-2xl border border-[#64b5f6]/20 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-[#64b5f6]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 mt-2 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Layered Card Composition */}
          {/* This container defines the relative context for positioning the detailed image asset */}
          <div className="relative h-[650px] w-full mt-10 md:mt-0 flex items-center justify-center">
            {/* Base layer (Lesson Overview card) */}
            <div className="absolute top-0 right-0 w-[90%] h-[500px] bg-slate-50 border border-slate-100 rounded-[2.5rem] shadow-sm z-0"></div>

            {/* The main composition of detailed cards (Task Mode, Progress Tracker, Tutor Support) */}
            {/* The actual detailed visuals are best handled by a high-resolution image asset here */}
            <img 
              src="https://images.nano-banana.com/v1/auth/image-render?prompt=layered-ui-cards-with-math-equations-and-progress-tracking&style=high-fidelity-ui" 
              alt="Mentis detailed UI composition showing mathematical equations, lesson tracking, and tutor support chat"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[110%] max-w-[700px] z-10 drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MentisDifference;