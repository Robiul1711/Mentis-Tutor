import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import profile from "@/assets/images/avatar.png";
import { IoNotificationsOutline } from "react-icons/io5";
import UserDropdown from "@/shared/navbar/UserDropdown";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-5 px-6 dark:border-b shadow dark:bg-[#0B1120] bg-bg-custom1">
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <GiHamburgerMenu className="text-black dark:text-white" size={26} />
        </span>
        <div className="text-black dark:text-white">
          <h1 className="md:text-3xl font-bold">
            Welcome Back, Iyad!
          </h1>
        </div>
      </div>

      <div className="flex items-center md:gap-6 gap-3 w-30 sm:w-32 justify-end">
        <span>
          <ThemeToggleButton/>
        </span>
        <span>
          <UserDropdown />
        </span>
      </div>
    </div>
  );
};

export default CommonNavbar;
