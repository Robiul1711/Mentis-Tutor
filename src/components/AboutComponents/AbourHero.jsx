import React from "react";
import Title from "../common/Title";
import { useApiQuery } from "@/hooks/apiQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// =========================
// FEATURES WITH SWIPER GALLERY
// =========================

const AboutHero = () => {
  const { data: whatMakesMentisDifferent } = useApiQuery({
    queryKey: ["whatMakesMentisDifferent"],
    url: "/about/what-makes-mentis-different",
  });

  const content = whatMakesMentisDifferent;

  const features = [
    { title: content?.title_1, logo: content?.logo_1 },
    { title: content?.title_2, logo: content?.logo_2 },
    { title: content?.title_3, logo: content?.logo_3 },
    { title: content?.title_4, logo: content?.logo_4 },
    { title: content?.title_5, logo: content?.logo_5 },
  ];

  return (
    <section className="section-padding-x py-8">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Title level="title48">{content?.description}</Title>
        <p className="text-lg mt-3 leading-relaxed">
          {content?.sub_description}
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 max-w-6xl mx-auto">
        {features.map(
          (item, index) =>
            item.title && (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm text-center border border-gray-100 hover:border-Secondary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-2 h-12">
                  <img
                    src={item.logo}
                    alt=""
                    className="h-full object-contain"
                  />
                </div>
                <p className="text-gray-800 font-medium text-xs leading-tight">
                  {item.title}
                </p>
              </div>
            ),
        )}
      </div>

      {/* Dashboard Slider */}
      <div className="relative max-w-5xl mx-auto">
        {/* Tablet Frame */}
        <div className=" md:p-6 rounded-2xl">
          <div className="rounded-xl overflow-hidden shadow-md h-[200px] sm:h-[250px] md:h-[400px] relative group">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full h-full"
            >
              {content?.galleries?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutHero;
