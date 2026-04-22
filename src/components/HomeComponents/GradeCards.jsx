import Title from "../common/Title";
import { Grade1Icon, Grade2Icon, Grade3Icon } from "../SVG/Icons";

const gradeData = [
  {
    id: 1,
    bg: "bg-[#fbf9c8]",
    border: "border-[#d6d15d]",
    shadow: "shadow-[0px_8px_20px_rgba(210,210,120,0.4)]",
    icon: Grade1Icon,
    gradeBg: "bg-[#ebea32]",
    grade: "Grade 2–4",
    title: "Build Strong Foundations",
    desc: "Regain your confidence and strengthen your basics with guided video lessons.",
    // Fixed: Only apply offset on medium screens and up
    desktopOffset: "md:translate-y-20", 
  },
  {
    id: 2,
    bg: "bg-[#f3dfd2]",
    border: "border-[#dba991]",
    shadow: "shadow-[0px_8px_20px_rgba(255,180,150,0.4)]",
    icon: Grade2Icon,
    gradeBg: "bg-[#f9a14a]",
    grade: "Grade 5–6",
    title: "Break the Grade 7 Barrier",
    desc: "Master problem solving skills and move from understanding to application.",
    desktopOffset: "md:translate-y-0",
  },
  {
    id: 3,
    bg: "bg-[#dceafd]",
    border: "border-[#78a9e9]",
    shadow: "shadow-[0px_8px_20px_rgba(120,160,255,0.4)]",
    icon: Grade3Icon,
    gradeBg: "bg-[#4ca4ff]",
    grade: "Grade 7–8+",
    title: "Achieve Grade 9 Mastery",
    desc: "Push beyond limits and refine your exam technique with advanced practice.",
    desktopOffset: "md:-translate-y-20",
  },
];

const GradeCards = () => {
  return (
    <section className="section-padding-x bg-white dark:bg-[#0B1120] py-16 md:py-24 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-16">
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] dark:text-white">
          Everyone Can Reach Grade 9
        </p>
        <p className="mt-4 text-[#475569] dark:text-white text-base md:text-lg">
          Wherever you start, Mentis helps you climb higher step by step.
        </p>
      </div>

      {/* Cards Container */}
      {/* Fixed: Added padding top/bottom to prevent the staggered cards from cutting off */}
      <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-6 md:gap-8 lg:gap-10 md:py-16 md:mt-40">
        {gradeData.map((card) => (
          <div
            key={card.id}
            className={`
              ${card.bg} ${card.border} ${card.shadow} ${card.desktopOffset}
              border rounded-3xl p-8 w-full md:w-[350px] lg:w-[380px]
              transition-all duration-500 cursor-pointer hover:scale-[1.03]
              relative flex flex-col justify-between
            `}
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center shadow-lg">
                <card.icon className="text-white" />
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-bold text-black uppercase tracking-wider ${card.gradeBg}`}
              >
                {card.grade}
              </span>
            </div>

            {/* Text Content */}
            <div className="mt-8">
              <Title level="title24" className="text-black font-bold leading-tight">
                {card.title}
              </Title>

              <p className="text-gray-800 mt-3 text-[16px] leading-relaxed opacity-90">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GradeCards;