import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-[#F0F8FE] dark:bg-[#0B1120] ">
      <div className="hidden">
        <ThemeToggleButton />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
