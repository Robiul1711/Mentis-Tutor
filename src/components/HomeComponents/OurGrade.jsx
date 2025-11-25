import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurGrade = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none", // play once only
        },
      });

      // Title animation
      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
      });

      // Subtitle animation
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Button animation
      tl.from(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full section-padding-x py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        {/* Title */}
        <div ref={titleRef}>
          <Title level="title48" className="font-bold">
            Our Grade 9 starts here.
          </Title>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef}>
          <Title level="title20" className="font-bold">
            Your journey to success begins today
          </Title>
        </div>

        {/* Button */}
        <div ref={buttonRef}>
          <CommonButton
            link={"/dashboard"}
            variant="secondary"
            className="mt-6 group max-w-sm mx-auto flex items-center justify-center"
          >
            Start Your 2 Day Free Trial
            <span className="rounded-full p-1 bg-black group-hover:bg-Secondary transition">
              <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />
            </span>
          </CommonButton>
        </div>
      </div>
    </section>
  );
};

export default OurGrade;
