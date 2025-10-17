import React from "react";
import Topic from "../DashboardComponents/Topic";
import PastPaper from "../DashboardComponents/PastPaper";
import ConfidenceMeter from "../DashboardComponents/ConfidenceMeter";
import CommonButton from "../common/CommonButton";
import WeeklySchedule from "../DashboardComponents/WeeklySchedule";
import AddClassModal from "../DashboardComponents/AddClassModal";

const Dashboard = () => {
  return (
    
 <div className="w-full flex gap-12 items-start">
  {/* Left Section */}
  <div className="w-[70%]">
    <h1 className="py-3 bg-Secondary text-2xl text-center rounded-t-2xl text-white font-semibold mb-3">
      Topic
    </h1>
    <Topic />
    <div className="mt-12">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl text-center font-semibold ">
          Confidence Meter
        </h1>
        <AddClassModal />
      </div>
      <WeeklySchedule />
    </div>
  </div>

  {/* Right Sidebar */}
  <div className="w-[30%] sticky top-5 h-fit">
    <h1 className="py-3 bg-Secondary text-2xl text-center rounded-t-2xl text-white font-semibold mb-3">
      Past Papers
    </h1>
    <PastPaper />
    <div className="mt-12">
      <ConfidenceMeter />
    </div>
  </div>
</div>

  
  );
};

export default Dashboard;
