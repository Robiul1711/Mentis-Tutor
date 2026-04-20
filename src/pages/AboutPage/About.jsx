import React from "react";
import AboutBanner from "@/components/AboutComponents/AboutBanner";
import CurriculumTable from "@/components/AboutComponents/CurriculumTable";
import TutorSupport from "@/components/AboutComponents/TutorSupport";
import WhoMentisWorkFor from "@/components/AboutComponents/WhoMentisWorkFor";
import MentisDifference from "@/components/AboutComponents/MentisDifference";


const About = () => {
  return (
    <div className="section-padding-y  ">
      <AboutBanner />
        <WhoMentisWorkFor/>
        <MentisDifference/>
      {/* <CurriculumTable /> */}
      <TutorSupport />

    </div>
  );
};

export default About;
