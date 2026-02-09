import React from "react";
import AbourHero from "@/components/AboutComponents/AbourHero";
import AboutBanner from "@/components/AboutComponents/AboutBanner";
import CurriculumTable from "@/components/AboutComponents/CurriculumTable";
import GetRecognized from "@/components/AboutComponents/GetRecognized";
import MeetYourTutor from "@/components/AboutComponents/MeetYourTutor";
import TutorSupport from "@/components/AboutComponents/TutorSupport";
import FeaturesSlider from "@/components/HomeComponents/FeaturesSlider";
import GetInTouch from "@/components/HomeComponents/GetInTouch";
import HowMentisWork from "@/components/HomeComponents/HowMentisWork";
import OurGrade from "@/components/HomeComponents/OurGrade";
import States from "@/components/HomeComponents/States";
import Testimonials from "@/components/HomeComponents/Testimonials";


const About = () => {
  return (
    <div className="section-padding-y space-y-12 ">
      <AboutBanner />
      <AbourHero />
      {/* <MeetYourTutor/>
        <GetRecognized/> */}
      <HowMentisWork />
      {/* <States /> */}
      {/* <GetInTouch /> */}
      <CurriculumTable />
      <TutorSupport />
      <Testimonials />
      <OurGrade />
    </div>
  );
};

export default About;
