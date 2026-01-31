import React from "react";
import Topic from "../DashboardComponents/Topic";
import PastPaper from "../DashboardComponents/PastPaper";
import ConfidenceMeter from "../DashboardComponents/ConfidenceMeter";
import CommonButton from "../common/CommonButton";
import WeeklySchedule from "../DashboardComponents/WeeklySchedule";
import AddClassModal from "../DashboardComponents/AddClassModal";
import { useApiQuery } from "@/hooks/apiQuery";

const Dashboard = () => {
  const { data: courseData } = useApiQuery({
    queryKey: ["course-overview", 3],
    url: "/courses/overview/3",
    secure: true,
  });

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
      {/* Left Section */}
      <div className="lg:w-[65%] w-full">
        <h1 className="lg:py-3 py-1 sm:py-2 bg-Secondary text-xl sm:text-2xl text-center rounded-t-2xl text-white font-semibold mb-3">
          Topic
        </h1>
        <Topic data={courseData?.sections} />
        <div className="mt-12">
          <div className="flex flex-col gap-3 xs:flex-row  justify-between mb-8">
            <h1 className="text-2xl text-center font-semibold ">
              Class Schedule
            </h1>
            <AddClassModal />
          </div>
          <WeeklySchedule />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-[35%] w-full sticky top-5 h-fit">
        <h1 className="lg:py-3 py-1 sm:py-2 bg-Secondary text-xl sm:text-2xl  text-center rounded-t-2xl text-white font-semibold mb-3">
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
