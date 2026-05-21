import React from "react";
import UserDropdown from "@/shared/navbar/UserDropdown";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import { useAuth } from "@/hooks/useAuth";

const CommonNavbar = ({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { user } = useAuth();
  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-4 px-6 dark:border-b shadow dark:bg-[#0B1120] bg-white sticky top-0 z-[100]">
      <div className="flex items-center gap-4">
      

        <div className="text-black dark:text-white">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight">
            Welcome, <span className="text-Secondary dark:text-white">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center md:gap-6 gap-3 w-30 sm:w-32 justify-end">
        <span>
          <ThemeToggleButton />
        </span>
        <span>
          <UserDropdown />
        </span>
      </div>
    </div>
  );
};

export default CommonNavbar;
