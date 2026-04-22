import React from "react";
import Title from "../common/Title";
import { MdArrowOutward, MdPlayArrow, MdOutlineEditNote, MdOutlineArticle, MdChatBubbleOutline } from "react-icons/md";
import { useApiQuery } from "@/hooks/apiQuery";

const AboutBanner = () => {
  const { data } = useApiQuery({
    queryKey: ["aboutPageBannerSection"],
    url: "/about-page/banner-section",
  });

  return (
    <section className="section-padding-x">
      <div className=" flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side */}
        <div className="w-full lg:w-[50%] flex flex-col text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] leading-[1.15] dark:text-white mb-6">
            {data?.title}
          </h1>
          <p className="text-lg md:text-[19px] text-[#475569] dark:text-[#BABABA] leading-relaxed mb-10 max-w-[540px] mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: data?.description }} />
{/* 
          <div className="flex justify-center lg:justify-start mb-12">
            <button
              onClick={() => {
                const section = document.getElementById("whatInsideMentis");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="bg-[#5a9cff] hover:bg-[#4585f0] text-white font-medium py-3.5 px-7 rounded-full transition-all flex items-center justify-center gap-3 text-[17px] shadow-sm w-max"
            >
              See what's inside 
              <span className="bg-[#0f172a] rounded-full p-1.5 flex items-center justify-center">
                <MdArrowOutward className="text-white text-[18px]" strokeWidth={1} />
              </span>
            </button>
          </div> */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {/* Feature 1 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="bg-[#e0f2fe] text-[#5a9cff] md:w-14 md:h-14 w-10 h-10 md:rounded-2xl rounded-lg flex items-center justify-center mb-3 shadow-sm">
                <MdPlayArrow className="text-xl md:text-3xl" />
              </div>
              <p className="text-[12px] sm:text-[14px] md:text-[15px] font-semibold text-[#475569] dark:text-gray-300 leading-[1.3]">Grade 9 <br /> Video Lessons</p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="bg-[#e0f2fe] text-[#5a9cff] md:w-14 md:h-14 w-10 h-10 md:rounded-2xl rounded-lg flex items-center justify-center mb-3 shadow-sm">
                <MdOutlineEditNote className="text-xl md:text-3xl" />
              </div>
              <p className="text-[12px] sm:text-[14px] md:text-[15px] font-semibold text-[#475569] dark:text-gray-300 leading-[1.3]">Task Mode <br /> Practice</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="bg-[#e0f2fe] text-[#5a9cff] md:w-14 md:h-14 w-10 h-10 md:rounded-2xl rounded-lg flex items-center justify-center mb-3 shadow-sm">
                <MdOutlineArticle className="text-xl md:text-3xl" />
              </div>
              <p className="text-[12px] sm:text-[14px] md:text-[15px] font-semibold text-[#475569] dark:text-gray-300 leading-[1.3]">Past Paper <br /> Walkthroughs</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="bg-[#e0f2fe] text-[#5a9cff] md:w-14 md:h-14 w-10 h-10 md:rounded-2xl rounded-lg flex items-center justify-center mb-3 shadow-sm">
                <MdChatBubbleOutline className="text-xl md:text-3xl" />
              </div>
              <p className="text-[12px] sm:text-[14px] md:text-[15px] font-semibold text-[#475569] dark:text-gray-300 leading-[1.3]">1-to-1 <br /> Tutor Support</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[50%] relative flex items-center justify-center mt-12 lg:mt-0">
          <div className="relative w-full">
            <img 
              src={data?.image || "https://placehold.co/800x600/e2e8f0/64748b?text=Platform+Mockups"} 
              alt="Platform Features" 
              className="w-full h-auto object-contain drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutBanner;
