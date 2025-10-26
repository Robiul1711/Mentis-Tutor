import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import logo from "@/assets/images/logo.png";
const SideBar = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
  const [activeParentIndex, setActiveParentIndex] = useState(null);

  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname
        );
        if (activeSub) {
          setActiveParentIndex(index);
        }
      }
    });
  }, [location.pathname, sidebar]);

  const isActive = (paths) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.includes(location.pathname);
  };

  const isParentActive = (item) => {
    if (!item.sublink) return isActive(item.path);
    return item.sublink.some((sub) => isActive(sub.path));
  };

  const toggleSubmenu = (index) => {
    setActiveParentIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0  transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full py-6 ${
          open
            ? "left-0 top-0 w-[280px] z-[220] shadow-lg bg-Secondary overflow-y-auto"
            : "-left-full xl:w-[300px] w-[280px]"
        }
        bg-Secondary dark:bg-[#0B1120] dark:border-r dark:border-gray-700  backdrop-blur-md  flex flex-col gap-8 shadow-md xlg:static fixed transition-all duration-300`}
      >
        {/* Logo */}
        <Link to={"/"} className="lg:px-8 px-4">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Safe" className="h-12 md:h-16 object-contain" />
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          {sidebar?.map((item, index) => {
            const parentActive = isParentActive(item);
            return !item?.sublink ? (
              <Link
                key={index}
                to={item?.path}
                onClick={() => {
                  setActiveParentIndex(null);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 lg:px-8 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 relative ${
                  isActive(item?.activePaths)
                    ? "text-white before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-white before:rounded-r-md"
                    : "text-[#ABABAB] hover:text-white"
                }`}
              >
                <span className="text-lg">{item?.icon}</span>
                {item?.text}
              </Link>
            ) : (
              <div className="relative" key={index}>
                {/* Parent link */}
                <div
                  className={`flex items-center justify-between  py-2 cursor-pointer w-full rounded-lg transition-all duration-200 ${
                    parentActive
                      ? "bg-[#253E8E] text-white"
                      : "text-gray-700 hover:bg-[#E3ECFF] hover:text-[#253E8E]"
                  }`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item?.icon}</span>
                    <p className="font-medium">{item?.text}</p>
                  </div>
                  <span
                    className={`transform transition-transform duration-300 ${
                      activeParentIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <MdKeyboardArrowDown size={20} />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Logout */}
        </div>
      </div>
    </>
  );
};

export default SideBar;