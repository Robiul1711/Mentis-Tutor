import React, { useEffect, useRef } from "react";
import s1 from "@/assets/images/s1.png";
import s2 from "@/assets/images/s2.png";
import s3 from "@/assets/images/s3.png";
import Title from "../common/Title";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyMentisExgist = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
      // Heading animation
      gsap.fromTo(titleRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );


    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",   // when section is visible
        },
        defaults: { ease: "power3.out" }
      });

      // Animate images one by one
      tl.from(img1Ref.current, {
        y: 60,
        opacity: 0,
        duration: 0.6
      })
      .from(img2Ref.current, {
        y: 80,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")
      .from(img3Ref.current, {
        y: 60,
        opacity: 0,
        duration: 0.6
      }, "-=0.4");

      // Animate text block
      tl.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();  
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-x">
      {/* Heading */}
      <div className="text-center mb-10">
        <div ref={titleRef}>
        <Title level="title48" className="dark:text-white">
          WHY MENTIS EXISTS – <span>“Tutoring for Everyone”</span>
        </Title>

        </div>
        <div ref={subtitleRef}>
        <Title
          level="title20"
          className="dark:text-gray-300 max-w-[1020px] mx-auto mt-4"
        >
          We built Mentis to make high-quality GCSE tutoring accessible,
          affordable, and achievable for every student no matter where they start.
        </Title>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-14">
        {/* Images */}
        <div className="flex gap-6 justify-center">
          <img
            ref={img1Ref}
            src={s1}
            alt="Student"
            className="rounded-lg w-[32%] object-cover h-[350px]"
          />

          <img
            ref={img2Ref}
            src={s2}
            alt="Student"
            className="rounded-lg w-[32%] object-cover h-[350px] -translate-y-10"
          />

          <img
            ref={img3Ref}
            src={s3}
            alt="Student"
            className="rounded-lg w-[32%] object-cover h-[350px]"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="text-center flex flex-col gap-4 md:text-left">
          <Title level="title32" className="font-semibold dark:text-white">
            Traditional tutoring costs hundreds a month and limits learning
            to one hour a week.
          </Title>

          <Title level="title32" className="font-semibold dark:text-white">
            Mentis gives every student access to real help — anytime, anywhere —
            for just <span className="font-bold">£25 a month.</span>
          </Title>
        </div>
      </div>
    </section>
  );
};

export default WhyMentisExgist;
