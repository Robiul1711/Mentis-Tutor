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
      // If we received a redirect URL (Stripe), redirect to checkout
      if (response?.url) {
        window.location.href = response.url;
        return;
      }
    },
  });

  const handleAction = () => {
    mutate({
      course_id: courseData?.id,
      billing_cycle: billingCycle,
    });
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
            <div className="flex flex-col gap-3">
              {/* Billing Cycle Toggle */}
              <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 w-fit">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-secondaryColor text-white shadow-md"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    billingCycle === "yearly"
                      ? "bg-secondaryColor text-white shadow-md"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  Yearly
                  <span
                    className={`ml-1 text-xs ${billingCycle === "yearly" ? "text-green-200" : "text-green-500"}`}
                  >
                    (Save 20%)
                  </span>
                </button>
              </div>

              {/* Price Display */}
              <p className="text-secondaryColor text-3xl lg:text-5xl font-semibold">
                $
                {billingCycle === "monthly"
                  ? courseData?.price
                  : (courseData?.price * 10).toFixed(2)}
                <span className="text-base font-normal">/ {billingCycle}</span>
              </p>
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
            {courseData?.description
              ?.split(/\r?\n/) // split by new line
              .filter(Boolean) // remove empty lines
              .map((item, index) => (
                <p
                  key={index}
                  ref={addToFeatureRefs}
                  className="flex items-center gap-2 text-tertiaryColor text-lg font-medium"
                >
                  {item}
                </p>
              ))}
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
