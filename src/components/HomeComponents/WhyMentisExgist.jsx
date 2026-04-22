// import React, { useEffect, useRef } from "react";
// import s1 from "@/assets/images/s1.png";
// import s2 from "@/assets/images/s2.png";
// import s3 from "@/assets/images/s3.png";
// import Title from "../common/Title";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useApiQuery } from "@/hooks/apiQuery";

// gsap.registerPlugin(ScrollTrigger);

// const WhyMentisExist = () => {
//   const sectionRef = useRef(null);
//   const img1Ref = useRef(null);
//   const img2Ref = useRef(null);
//   const img3Ref = useRef(null);
//   const textRef = useRef(null);
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const { data, isLoading } = useApiQuery({
//     queryKey: ["purpose"],
//     url: "/cms/home_page/purpose_section",
//   });

//   const sectionData = data?.data?.purpose_section || {};
//   const { title, description, galleries } = sectionData;

//   useEffect(() => {
//     if (isLoading) return;

//     const elements = [
//       titleRef.current,
//       subtitleRef.current,
//       img1Ref.current,
//       img2Ref.current,
//       img3Ref.current,
//       textRef.current,
//     ];

//     gsap.fromTo(
//       elements,
//       { y: 30, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         stagger: 0.12,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 85%",
//         },
//       },
//     );
//   }, [isLoading]);

//   if (isLoading) return null;

//   return (
//     <section
//       ref={sectionRef}
//       className="section-padding-x py-12 md:py-20 bg-white dark:bg-[#0B1120]"
//     >
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <div ref={titleRef}>
//           <Title level="title48" className="dark:text-white">
//             {title}
//           </Title>
//         </div>

//         <div ref={subtitleRef}>
//           <Title
//             level="title20"
//             className="dark:text-gray-300 max-w-[900px] mx-auto mt-4 leading-relaxed"
//           >
//             <span dangerouslySetInnerHTML={{ __html: description }}></span>
//           </Title>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
//         {/* Images */}
//         <div className="flex justify-center gap-4 md:gap-6">
//           <div className="flex flex-col gap-4 md:gap-6">
//             <img
//               ref={img1Ref}
//               src={galleries?.[0]}
//               alt="Student learning"
//               className="rounded-xl w-[180px] sm:w-[220px] md:w-[240px] h-[250px] sm:h-[300px] object-cover shadow-md"
//             />
//             <img
//               ref={img3Ref}
//               src={galleries?.[2]}
//               alt="Student progress"
//               className="rounded-xl w-[180px] sm:w-[220px] md:w-[240px] h-[220px] sm:h-[260px] object-cover shadow-md"
//             />
//           </div>

//           <img
//             ref={img2Ref}
//             src={galleries?.[1]}
//             alt="Student success"
//             className="rounded-xl w-[190px] sm:w-[240px] md:w-[260px] h-[320px] sm:h-[380px] object-cover shadow-lg mt-10"
//           />
//         </div>

//         {/* Text Content */}
//         <div ref={textRef} className="space-y-6 text-center lg:text-left">
//           {/* Problem block */}
//           <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
//             <Title
//               level="title24"
//               className="font-semibold dark:text-white mb-3"
//             >
//               The Problem
//             </Title>
//             <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
//               Traditional tutoring costs hundreds per month and limits learning
//               to just one hour a week — making it inaccessible for many
//               families.
//             </p>
//           </div>

//           {/* Solution block */}
//           <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
//             <Title
//               level="title24"
//               className="font-semibold dark:text-white mb-3"
//             >
//               Our Solution
//             </Title>
//             <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
//               Mentis gives every student access to real help — anytime, anywhere
//               — for just{" "}
//               <span className="font-bold text-green-600 dark:text-green-400">
//                 £25 a month
//               </span>
//               .
//             </p>
//           </div>

//           {/* Key Benefits */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                 24/7
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Access
//               </div>
//             </div>

//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600 dark:text-green-400">
//                 £25
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Per Month
//               </div>
//             </div>

//             <div className="text-center col-span-2 sm:col-span-1">
//               <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//                 100%
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Accessible
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyMentisExist;

import React from "react";
import {
  Calendar,
  Clock,
  MessageSquare,
  PoundSterling,
  Check,
  Play,
  FileText,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const MentisComparison = () => {
  return (
    <div className=" section-padding-x  section-padding-y">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b]  dark:text-white mb-4 tracking-tight leading-tight">
          The Problem is the Gap  Between Sessions
        </h2>
        <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto ">
          Traditional tutoring leaves you stuck between sessions.{" "}
          <span className="font-bold text-[#64b5f6]">Mentis</span> fills the gap
          and guides you to Grade 9.
        </p>
      </div>

      {/* Main Comparison Card */}
      <div className=" bg-[#fbfaf9] dark:bg-[#0B1120] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/50 dark:border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2  p-6 md:p-10  gap-8 lg:gap-12 ">
          
          {/* Traditional Tutoring Column */}
          <div className="space-y-6 md:space-y-8 bg-white dark:bg-[#0B1120]  rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#64b5f6]/20 shadow-inner relative overflow-hidden">
            <div className="inline-block px-4 py-1 bg-rose-50 text-rose-700 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase border border-rose-100">
              Traditional Tutoring
            </div>

            <ul className="space-y-5 md:space-y-6">
              {[
                { icon: Calendar, text: "Only 1 hour per week" },
                { icon: Clock, text: "6 days stuck alone" },
                { icon: MessageSquare, text: "Questions pile up" },
                {
                  icon: PoundSterling,
                  text: "High cost: £35–£50 per session",

                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-4 ${item.muted ? "opacity-60" : ""}`}
                >
                  <div className="shrink-0">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400" strokeWidth={1.5} />
                  </div>
                  <span className="text-base md:text-lg font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>



          {/* Mentis Tutoring Column */}
          <div className="bg-white dark:bg-[#0B1120]  rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#64b5f6]/20 shadow-inner relative overflow-hidden">
            <div className="inline-block px-5 py-1.5 bg-[#64b5f6] text-white rounded-full text-xs md:text-sm font-bold tracking-wide uppercase mb-6 md:mb-8 shadow-md shadow-[#64b5f6]/30">
              Mentis Tutoring
            </div>

            <div className="flex flex-col gap-4 md:gap-5 relative z-10">
              {[
                "24/7 tutor messaging",
                "Task-Mode practice + guided marking",
                "Past paper solutions + progress tracking",
                "Affordable monthly fee (£25/month)",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="bg-[#64b5f6]/10 p-1 rounded-full shrink-0">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-[#64b5f6] dark:text-white" strokeWidth={3} />
                  </div>
                  <span
                    className={`text-base md:text-lg leading-snug ${
                      idx === 3 ? "font-bold text-[#2a4c67] dark:text-white " : "font-medium text-[#4c4c4c] dark:text-white"
                    }`}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>



          </div>
        </div>

        {/* Lower Features Grid */}
        <div className="bg-white dark:bg-[#0B1120] border-t border-slate-100 dark:border-[#0B1120] p-6 md:p-10">
          <p className="text-center text-[#2a4c67] dark:text-white text-lg md:text-xl font-bold mb-8 md:mb-10 px-2">
            Mentis exists to{" "}
            <span className="text-[#64b5f6] italic underline decoration-2 underline-offset-4">remove</span> the 'stuck
            alone' gap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {[
              {
                icon: Play,
                title: "Guided Video Lessons",
                desc: "Expert worksheets included",
                color: "bg-[#64b5f6]",
              },
              {
                icon: FileText,
                title: "Task-Mode Past Papers",
                desc: "Mark scheme solutions",
                color: "bg-[#64b5f6]",
              },
              {
                icon: MessageCircle,
                title: "1-to-1 Tutor Messaging",
                desc: "24/7 access (Zoom available)",
                color: "bg-[#64b5f6]",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 p-3 sm:p-4 rounded-2xl border border-slate-100 hover:border-[#64b5f6]/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`${card.color} p-2.5  rounded-xl  text-white shadow-lg shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#2a4c67] dark:text-white text-base md:text-lg leading-tight">
                    {card.title}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-white font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-2xl px-2">
              <button className="w-full sm:w-auto bg-[#64b5f6] hover:bg-[#2a4c67] text-white px-8 md:px-10 py-2  rounded-xl font-bold text-base md:text-lg shadow-lg shadow-[#64b5f6]/20 transition-all active:scale-95">
                Start 2-Day Free Trial
              </button>
              <button className="w-full sm:w-auto bg-white border-2 border-[#2a4c67] text-[#2a4c67] hover:bg-[#2a4c67] hover:text-white px-8 md:px-10 py-2  rounded-xl font-bold text-base md:text-lg transition-all active:scale-95">
                See how it works
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {[
                "24/7 tutor access",
                "Cancel anytime",
                "1-1 support included",
              ].map((benefit, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-[13px] md:text-sm font-bold text-[#2a4c67]/70 dark:text-white"
                >
                  <Check className="w-4 h-4 text-[#64b5f6] dark:text-white" strokeWidth={3} />{" "}
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentisComparison;
