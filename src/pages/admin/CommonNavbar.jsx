import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import profile from "@/assets/images/avatar.png";
import { IoNotificationsOutline } from "react-icons/io5";
import UserDropdown from "@/shared/navbar/UserDropdown";
// import NotificationDropdown from "@/shared/navbar/NotificationDropdown";
const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-5 px-6 shadow   bg-bg-custom1">
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <GiHamburgerMenu color="black" size={26} />
        </span>
        <div className=" text-black">
          <h1 className="md:text-3xl font-bold">Welcome Back, Jorge Franco!</h1>
          {/* <p className="text-xs sm:text-sm  mt-2 text-[#666666]">
            Elevate your financial future with smart property investments.
          </p> */}
        </div>
      </div>

      <div className="flex items-center md:gap-6 gap-3 w-30 sm:w-32 justify-end">
        <span>
          {/* <NotificationDropdown /> */}
        {/* <IoNotificationsOutline color="black" size={24} /> */}
        </span>
        <span>
          <UserDropdown />
          
        </span>
      </div>
    </div>
  );
};

export default CommonNavbar;