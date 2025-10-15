

import { DashboardIcon, HelpIcon, MessageIcon, MyCourseIcon, MyQuizIcon, SettingsIcon } from "@/components/DashboardIcons/DashIcons";
import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
      id: 1,
      icon: <DashboardIcon  />,
      text: "Dashboard",
      path: "/dashboard", // main path (optional, if you still want to keep it)
      activePaths: [
        "/dashboard",

      ], // all paths that should make this item active
      sublink: false,
    },
    {
      id: 2,
      icon: <MyCourseIcon  />,
      text: "My Courses",
      path: "/dashboard/my-courses", // main path (optional, if you still want to keep it)
      activePaths: ["/dashboard/my-courses"], // all paths that should make this item active
      sublink: false,
    },
    {
      id: 3,
      icon: <MessageIcon />,
      text: "Message ",
      path: "/dashboard/message", // main path (optional, if you still want to keep it)
      activePaths: ["/dashboard/message"], // all paths that should make this item active
      sublink: false,
    },
    {
      id: 4,
      icon: <MyQuizIcon  />,
      text: "My Quiz Attempts",
      path: "/dashboard/my-quiz", // main path (optional, if you still want to keep it)
      activePaths: ["/dashboard/my-quiz"], // all paths that should make this item active
      sublink: false,
    },
    {
      id: 5,
      icon: <HelpIcon />,
      text: "Help & Support",
      path: "/dashboard/help-and-support", // main path (optional, if you still want to keep it)
      activePaths: ["/dashboard/help-and-support"], // all paths that should make this item active
      sublink: false,
    },
    {
      id: 6,
      icon: <SettingsIcon  />,
      text: "Settinngs",
      path: "/dashboard/settings", // main path (optional, if you still want to keep it)
      activePaths: ["/dashboard/settings"], // all paths that should make this item active
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
      <div className="flex  h-screen min-h-screen w-full">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark  bg-bg-custom dark:bg-[#0B1120]  flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col  ">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <div className="p-4 sm:p-6 md:p-9  ">

            <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
