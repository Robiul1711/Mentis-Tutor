import React from "react";
import { Target, TrendingUp, Link, ShieldCheck } from "lucide-react";

const Card = ({ icon: Icon, title, description, tag, tagColor }) => (
  <div
    className="bg-white dark:bg-slate-900 p-6 sm:p-7 lg:p-8 
    rounded-2xl border border-slate-200 dark:border-slate-700 
    shadow-sm hover:shadow-lg transition-all duration-300 
    flex flex-col h-full group"
  >
    <div className="flex justify-between items-start mb-5">
      <div
        className={`p-2 rounded-lg ${tagColor.bg} 
        group-hover:scale-110 transition-transform`}
      >
        <Icon className={`w-5 h-5 ${tagColor.text}`} />
      </div>

      <span
        className={`text-[10px] font-bold uppercase tracking-widest 
        px-3 py-1 rounded-full ${tagColor.bg} ${tagColor.text}`}
      >
        {tag}
      </span>
    </div>

    <h3 className="text-lg sm:text-xl font-bold 
    text-slate-900 dark:text-white mb-3">
      {title}
    </h3>

    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const WhoMentisWorkFor = () => {
  const categories = [
    {
      icon: Target,
      tag: "Grade 8-9",
      tagColor: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-500" },
      title: "Students aiming for top grades",
      description:
        "For students who want to push towards Grade 8 or 9 with stronger exam technique, consistency, and support.",
    },
    {
      icon: TrendingUp,
      tag: "Confidence",
      tagColor: {
        bg: "bg-emerald-50 dark:bg-emerald-900/30",
        text: "text-emerald-500",
      },
      title: "Students who need confidence",
      description:
        "For students who understand some topics but still get stuck, second-guess themselves, or need clearer explanations.",
    },
    {
      icon: Link,
      tag: "Structure",
      tagColor: {
        bg: "bg-indigo-50 dark:bg-indigo-900/30",
        text: "text-indigo-500",
      },
      title: "Students who need structure outside school",
      description:
        "For students who need a better system for revision, practice, and staying on track between lessons.",
    },
    {
      icon: ShieldCheck,
      tag: "Parents",
      tagColor: {
        bg: "bg-purple-50 dark:bg-purple-900/30",
        text: "text-purple-500",
      },
      title: "Parents looking for reliable support",
      description:
        "For parents who want a more affordable, structured alternative to constant private tutoring.",
    },
  ];

  return (
    <section
      className="section-padding-x section-padding-y dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <span
          className="inline-block bg-blue-50 dark:bg-blue-900/30 
          text-blue-600 dark:text-blue-400 
          text-xs font-bold px-4 py-1.5 rounded-full 
          uppercase tracking-wider mb-4"
        >
          About Mentis
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 
        font-bold text-slate-900 dark:text-white mb-5">
          Who Mentis is for
        </h2>

        <p className="text-slate-600 dark:text-slate-400 
        max-w-xl mx-auto text-sm sm:text-base lg:text-lg">
          Built for students who need structure, support, and a clearer path to
          progress in GCSE Maths.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-6xl mx-auto">
        {categories.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default WhoMentisWorkFor;