import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useApiQuery } from "@/hooks/apiQuery";

const FeaturesSlider = () => {
  const { data: whatInsideMentis } = useApiQuery({
    queryKey: ["whatInsideMentis"],
    url: "/what-inside-mentis",
  });

  return (
    <section id="whatInsideMentis" className="section-padding-x relative py-16 md:py-24 bg-[#f4f7fb] dark:bg-[#0F172A] transition-colors duration-300">
      <div className="">
        
        {/* Heading & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] dark:text-white tracking-wide uppercase">
              What's Inside Mentis
            </h2>
            <p className="text-[17px] md:text-lg text-[#475569] dark:text-[#BABABA] mt-4">
              Everything included in your £30/month subscription.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end gap-3">
            <button className="features-slider-prev bg-[#4e94ff] text-white p-3 rounded-full hover:bg-[#3b82f6] transition-colors shadow-md">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="features-slider-next bg-[#4e94ff] text-white p-3 rounded-full hover:bg-[#3b82f6] transition-colors shadow-md">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            spaceBetween={24}
            slidesPerView={4}
            modules={[Navigation]}
            navigation={{
              nextEl: ".features-slider-next",
              prevEl: ".features-slider-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-4"
          >
            {whatInsideMentis?.data?.map((item) => (
              <SwiperSlide key={item.id} className="h-auto pb-4">
                <div className="bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 rounded-[24px] p-4 sm:p-6 h-full flex flex-col transition-transform hover:-translate-y-1 duration-300">
                  
                  {/* Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-10 h-10  rounded-full overflow-hidden flex-shrink-0">
                      <img src={item.icon} alt="" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-[16px] md:text-[17px] font-bold text-[#1e293b] dark:text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Image */}
                  <div className="w-full bg-[#f1f5f9] dark:bg-[#0f172a] rounded-[16px] overflow-hidden mb-6 flex items-center justify-center border border-slate-100 dark:border-slate-700 aspect-[4/3]">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt={item.title}
                    />
                  </div>

                  {/* Footer Text */}
                  <div className="mt-auto">
                    <h4 className="text-[17px] md:text-[18px] font-bold text-[#1e293b] dark:text-white mb-2 leading-tight">
                      {item.title}
                    </h4>
                    <p
                      className="text-[#475569] dark:text-[#BABABA] text-[14px] md:text-[15px] leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSlider;
