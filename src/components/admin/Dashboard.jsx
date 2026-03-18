import React from "react";
import DashboardRedesign from "../DashboardComponents/DashboardRedesign";
import { useApiQuery } from "@/hooks/apiQuery";


const Dashboard = () => {
  const [params, setParams] = React.useState({
    section_title: "all",
    course_id: 2 // Defaulting to 2 as seen in sample data
  });

  const { data: dashboardData, isLoading, refetch } = useApiQuery({
    queryKey: ["dashboard", params],
    url: `/user/progress/dashboard`,
    params: params,
    secure: true,
  });

  const handleSectionChange = ({ section_title, course_id }) => {
    setParams({ section_title, course_id });
  };

  return (
    <div className="w-full">
      <DashboardRedesign 
        dashboardData={dashboardData} 
        onSectionChange={handleSectionChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard;

