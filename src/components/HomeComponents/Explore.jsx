import React, { useEffect, useRef } from "react";
import Title from "../common/Title";
import explore from "../../assets/images/explore.png";
import {
  ExamIcon,
  LeasonsIcon,
  MsgIcon,
  ProgressIcon,
  RattingIcon,
} from "../SVG/Icons";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const featureRefs = useRef([]);
  const buttonRef = useRef(null);

  const addToFeatureRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none", // no reverse
        },
      });

      // Top Heading
      tl.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
      });

      tl.from(
        subHeadingRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      );

      // Image
      tl.from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.85,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // Right Content intro
      tl.from(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      );

      // Features stagger
      tl.from(
        featureRefs.current,
        {
          opacity: 0,
          x: -30,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Button
      tl.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.6)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [isTrialActive, setIsTrialActive] = React.useState(false);
  const [billingCycle, setBillingCycle] = React.useState("monthly");

  const { data, isLoading } = useApiQuery({
    queryKey: ["courses-all"],
    url: "/courses/all",
    secure: true,
  });

  const courseData = data?.data?.[0] || {};

  const { mutate, isPending } = useApiMutation({
    url: "/course/checkout",
    method: "POST",
    secure: true,
    onSuccess: (response) => {
// If we received a redirect URL (Stripe), open in a new tab
if (response?.data?.url) {
  window.open(response.data.url, "_blank", "noopener,noreferrer");
  return;
}
      // If we just clicked trial, switch to purchase mode
      if (!isTrialActive) {
        setIsTrialActive(true);
      }
    },
  });

  const handleAction = () => {
    if (!isTrialActive) {
      mutate({
        course_id: courseData?.id,
        is_trial: true,
      });
    } else {
      mutate({
        course_id: courseData?.id,
        billing_cycle: billingCycle,
      });
    }
  };

  return (
    <div ref={sectionRef} className="section-padding-x">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <div ref={headingRef}>
          <Title level="title48">{courseData?.title}</Title>
        </div>

        <div ref={subHeadingRef}>
          <Title level="title20">
            <span
              dangerouslySetInnerHTML={{ __html: courseData?.description }}
            ></span>
          </Title>
        </div>
      </div>

      {/* Content Box */}
      <div className="mt-14 p-6 sm:p-10 border bg-[#FFF] dark:bg-[#0B1120] rounded-2xl flex flex-col lg:flex-row gap-10">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 max-h-[416px] flex justify-center">
          <img
            ref={imageRef}
            src={courseData?.thumbnail}
            alt="explore"
            className="w-full h-auto max-w-[400px] sm:max-w-full object-cover rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div
          ref={contentRef}
          className="w-full lg:w-1/2 flex flex-col justify-between"
        >
          {/* Price & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-secondaryColor text-3xl lg:text-5xl font-semibold">
                $
                {billingCycle === "monthly"
                  ? courseData?.price
                  : (courseData?.price * 10).toFixed(2)}
                <span className="text-base font-normal">/ {billingCycle}</span>
              </p>
              {isTrialActive && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-3 py-1 text-xs rounded-full border ${billingCycle === "monthly" ? "bg-secondaryColor text-white border-secondaryColor" : "text-gray-500 border-gray-300"}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`px-3 py-1 text-xs rounded-full border ${billingCycle === "yearly" ? "bg-secondaryColor text-white border-secondaryColor" : "text-gray-500 border-gray-300"}`}
                  >
                    Yearly (Save 20%)
                  </button>
                </div>
              )}
            </div>
            <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <RattingIcon />{" "}
              <span className="font-semibold dark:text-white">
                (4.8 Reviews)
              </span>
            </p>
          </div>

          {/* Title */}
          <Title level="title24" className="mt-5">
            {courseData?.category}
          </Title>

          {/* Features */}
          <div className="flex flex-col gap-4 mt-5">
            <p
              ref={addToFeatureRefs}
              className="flex items-center gap-2 text-tertiaryColor text-lg font-medium"
            >
              <MsgIcon className={"!dark:text-white"} /> 24/7 one-to-one support
            </p>
            <p
              ref={addToFeatureRefs}
              className="flex items-center gap-2 text-tertiaryColor text-lg font-medium"
            >
              <LeasonsIcon /> 80+ Video Lessons
            </p>
            <p
              ref={addToFeatureRefs}
              className="flex items-center gap-2 text-tertiaryColor text-lg font-medium"
            >
              <ProgressIcon /> Progress trackers
            </p>
            <p
              ref={addToFeatureRefs}
              className="flex items-center gap-2 text-tertiaryColor text-lg font-medium"
            >
              <ExamIcon /> Exam techniques
            </p>
          </div>

          {/* Button */}
          <div ref={buttonRef}>
            <CommonButton
              onClick={handleAction}
              disabled={isLoading || isPending || !courseData?.id}
              variant="secondary"
              className="mt-6 group w-full sm:w-auto"
            >
              {isTrialActive
                ? "Purchase Course Now"
                : "Start Your 2 Day Free Trial"}
              <span className="rounded-full p-1 bg-black group-hover:bg-secondaryColor ml-2">
                <MdArrowOutward className="text-primaryColor text-2xl group-hover:text-white text-white" />
              </span>
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
