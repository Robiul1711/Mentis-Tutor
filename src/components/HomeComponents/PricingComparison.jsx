import React, { useEffect, useRef } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PricingComparison = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const leftFeaturesRef = useRef([]);
  const rightFeaturesRef = useRef([]);
  const buttonRef = useRef(null);

  const addLeftFeature = (el) => {
    if (el && !leftFeaturesRef.current.includes(el)) {
      leftFeaturesRef.current.push(el);
    }
  };
  const addRightFeature = (el) => {
    if (el && !rightFeaturesRef.current.includes(el)) {
      rightFeaturesRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none", // play once, no reverse
        },
      });

      // Heading + subtitle
      tl.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
      });

      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.45"
      );

      // Cards (left then right)
      tl.from(
        leftCardRef.current,
        {
          opacity: 0,
          x: -80,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.from(
        rightCardRef.current,
        {
          opacity: 0,
          x: 80,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Left card features
      tl.from(leftFeaturesRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Right card features
      tl.from(
        rightFeaturesRef.current,
        {
          opacity: 0,
          x: 20,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Button pop in
      tl.from(buttonRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-x">
      {/* Heading */}
      <div className="text-center mb-10">
        <div ref={headingRef}>
          <Title level="title48" className="dark:text-white">
            Same Grade 9. 90% cheaper.
          </Title>
        </div>

        <div ref={subtitleRef}>
          <Title
            level="title20"
            className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4"
          >
            Get high-quality Grade 9 education without breaking the bank.
          </Title>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* PRIVATE TUTOR CARD */}
        <div
          ref={leftCardRef}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
        >
          <h2 className="text-[22px] font-semibold text-black">
            Private Tutor
          </h2>

          <div className="mt-4">
            <p className="text-[32px] font-bold text-[#0047ab]">
              £ 200–400{" "}
              <span className="text-[14px] font-medium text-gray-500">
                / per month
              </span>
            </p>
          </div>

          <div className="mt-6 space-y-4 text-[16px] text-black">
            <div ref={addLeftFeature} className="flex justify-between">
              <span>Total learning</span>
              <span>: 4–8 hrs</span>
            </div>

            <div ref={addLeftFeature} className="flex justify-between">
              <span>Support outside lessons</span>
               <span className="flex items-center gap-1">: <HiX className="text-red-500 text-xl" /></span>
            </div>

            <div ref={addLeftFeature} className="flex justify-between">
              <span>Past papers included</span>
               <span className="flex items-center gap-1">: <HiX className="text-red-500 text-xl" /></span>
            </div>

            <div ref={addLeftFeature} className="flex justify-between">
              <span>Grade 7–9 guarantee</span>
               <span className="flex items-center gap-1">: <HiX className="text-red-500 text-xl" /></span>
            </div>
          </div>
        </div>

        {/* MENTIS CARD */}
        <div
          ref={rightCardRef}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
        >
          <h2 className="text-[22px] font-semibold text-black">Mentis</h2>

          <div className="mt-4 flex items-center gap-3">
            <p className="text-[32px] font-bold text-[#0047ab]">
              £ 25{" "}
              <span className="text-[14px] font-medium text-gray-500">
                / per month
              </span>
            </p>

            <label className="flex items-center gap-2 text-[14px] text-gray-600 cursor-pointer">
              <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                <div className="absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white shadow"></div>
              </div>
              Yearly saves 2 months
            </label>
          </div>

          <div className="mt-6 space-y-4 text-[16px] text-black">
            <div ref={addRightFeature} className="flex justify-between">
              <span>Total learning</span>
              <span>: Unlimited</span>
            </div>

            <div ref={addRightFeature} className="flex items-center justify-between">
              <span>Support outside lessons</span>
              <span className="flex items-center gap-1">: <HiCheck className="text-green-500 text-xl" /></span>
            </div>

            <div ref={addRightFeature} className="flex justify-between">
              <span>Past papers included</span>
              <span className="flex items-center gap-1">: <HiCheck className="text-green-500 text-xl" /></span>
            </div>

            <div ref={addRightFeature} className="flex justify-between">
              <span>Grade 7–9 guarantee</span>
            <span className="flex items-center gap-1">: <HiCheck className="text-green-500 text-xl" /></span>
            </div>
          </div>

          {/* BUTTON */}
          <div ref={buttonRef}>
            <CommonButton
              link={"/dashboard"}
              variant="secondary"
              className="mt-6 group"
            >
              Start Your 2 Day Free Trial
              <span className="rounded-full p-1 bg-black group-hover:bg-Secondary ml-2">
                <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />
              </span>
            </CommonButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
