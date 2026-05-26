import {
  DashboardIcon,
  HelpIcon,
  MessageIcon,
  MyCourseIcon,
  MyQuizIcon,
  PastPapersIcon,
  SettingsIcon,
} from "@/components/DashboardIcons/DashIcons";
import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sideBar = [
    {
      id: 1,
      icon: <DashboardIcon />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: ["/dashboard"],
      sublink: false,
    },
    {
      id: 2,
      icon: <MyCourseIcon />,
      text: "Lessons",
      path: "/dashboard/lessons",
      activePaths: ["/dashboard/lessons"],
      sublink: false,
    },
    {
      id: 3,
       icon: <PastPapersIcon />,
      text: "Past Papers",
      path: "/dashboard/past-papers",
      activePaths: ["/dashboard/past-papers"],
      sublink: false,
    },
    {
      id: 4,
      icon: <MyQuizIcon />,
      text: "My Quiz Attempts",
      path: "/dashboard/my-quiz",
      activePaths: ["/dashboard/my-quiz"],
      sublink: false,
    },
    {
      id: 5,
     icon: <MessageIcon />,
      text: "Message ",
      path: "/dashboard/message",
      activePaths: ["/dashboard/message"],
      sublink: false,
    },
    {
      id: 6,
      icon: <HelpIcon />,
      text: "Help & Support",
      path: "/dashboard/help-and-support",
      activePaths: ["/dashboard/help-and-support"],
      sublink: false,
    },
    {
      id: 7,
      icon: <SettingsIcon />,
      text: "Settings",
      path: "/dashboard/settings",
      activePaths: ["/dashboard/settings"],
      sublink: false,
    },
  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      <ScrollRestoration />
      <div className="flex h-screen min-h-screen w-full">
        <SideBar
          open={isMobileOpen}
          setOpen={setIsMobileOpen}
          isCollapsed={isCollapsed}
          sidebar={sideBar}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
       
          setIsCollapsed={setIsCollapsed}
        />
        <div className="flex-1 bg-white dark:bg-[#0B1120] flex flex-col overflow-auto custom-scrollbar">
          <div className="flex flex-col">
            <CommonNavbar
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div className="p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
