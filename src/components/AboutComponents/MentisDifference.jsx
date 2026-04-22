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
    <section className="section-padding-x section-padding-y dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-[1250px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Panel: Feature Text and Icons */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] dark:text-white tracking-tight">
                Why Mentis feels different
              </h2>
              <p className="text-slate-600 dark:text-[#BABABA] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Mentis is designed to keep students progressing between lessons with the structure, support, and guidance that most courses and tutoring setups leave out.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6 sm:space-y-8 border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left group">
                  <div className="bg-[#e0f2fe] dark:bg-[#334155] p-3.5 rounded-2xl border border-blue-100 dark:border-gray-700 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                    <feature.icon className="w-5 h-5 md:w-8 md:h-8 text-[#4e94ff]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-[1.3rem] font-bold text-[#1e293b] dark:text-white leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[#475569] dark:text-[#BABABA] mt-2 text-[15px] md:text-[16px] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Layered Card Composition */}
          <div className="relative w-full mt-6 lg:mt-0 flex items-center justify-center">
            <img 
              src="https://images.nano-banana.com/v1/auth/image-render?prompt=layered-ui-cards-with-math-equations-and-progress-tracking&style=high-fidelity-ui" 
              alt="Mentis detailed UI composition"
              className="w-full max-w-[650px] h-auto object-contain drop-shadow-2xl rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MentisDifference;