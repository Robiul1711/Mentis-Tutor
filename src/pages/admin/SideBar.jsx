import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import logo from "@/assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
const SideBar = ({ sidebar, open, setOpen, isCollapsed, isMobileOpen, setIsMobileOpen, setIsCollapsed }) => {
  const location = useLocation();
  const [activeParentIndex, setActiveParentIndex] = useState(null);

  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname,
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
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xlg:hidden z-[210] bg-black/50 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 z-[220] transition-all duration-500 ease-in-out bg-[#F0F8FE] dark:bg-[#0B1120] dark:border-r dark:border-gray-800 shadow-xl overflow-x-hidden flex flex-col gap-8
        ${open ? "left-0 w-[280px]" : "-left-full xlg:left-0"}
        ${isCollapsed ? "xlg:w-[80px]" : "xlg:w-[300px]"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`pt-8 transition-all duration-500 flex items-center justify-between ${isCollapsed ? "justify-center px-0" : "px-4"}`}
        >
          {/* <Link
            to={"/"}
            className="flex items-center justify-center overflow-hidden"
          > */}
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-500 object-contain ${
                isCollapsed ? "hidden" : "h-12 md:h-16"
              }`}
            />
          {/* </Link> */}
          <div>
              {/* Mobile Toggle */}
        <span
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="xlg:hidden block cursor-pointer transition-transform active:scale-95"
        >
          <GiHamburgerMenu className="text-black dark:text-white" size={24} />
        </span>

        {/* Desktop Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden xlg:flex items-center justify-center p-2 rounded-lg bg-slate-300 group dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-Secondary hover:text-white transition-all duration-300"
        >
          <GiHamburgerMenu size={20} className="text-black dark:text-white cursor-pointer group-hover:text-white" />
        </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 px-3">
          {sidebar?.map((item, index) => {
            const active = isActive(item?.activePaths);
            return !item?.sublink ? (
              <Link
                key={index}
                to={item?.path}
                onClick={() => {
                  setOpen(false);
                }}
                className={`flex items-center transition-all duration-300 rounded-xl overflow-hidden group
                  ${isCollapsed ? "justify-center p-3" : "px-5 py-3 gap-4"}
                  ${
                    active
                      ? "bg-Secondary text-white shadow-lg shadow-Secondary/30"
                      : "text-slate-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:text-Secondary"
                  }
                `}
                title={isCollapsed ? item.text : ""}
              >
                <span
                  className={`text-xl shrink-0 transition-transform duration-300 ${!active && "group-hover:scale-110"}`}
                >
                  {item?.icon}
                </span>
                <span
                  className={`whitespace-nowrap font-semibold transition-all duration-500 overflow-hidden
                  ${isCollapsed ? "w-0 opacity-0 invisible" : "w-auto opacity-100 visible"}
                `}
                >
                  {item?.text}
                </span>
              </Link>
            ) : (
              // Submenu logic (keeping it consistent with original but adapted)
              <div key={index} className="flex flex-col">
                <div
                  onClick={() => !isCollapsed && toggleSubmenu(index)}
                  className={`flex items-center cursor-pointer transition-all duration-300 rounded-xl group
                    ${isCollapsed ? "justify-center p-3" : "px-5 py-3 gap-4 justify-between"}
                    ${isParentActive(item) ? "bg-slate-200 dark:bg-slate-800" : "text-slate-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl shrink-0">{item?.icon}</span>
                    {!isCollapsed && (
                      <span className="font-semibold">{item?.text}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <MdKeyboardArrowDown
                      className={`transition-transform duration-300 ${activeParentIndex === index ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacer to push content when sidebar is fixed (only for desktop) */}
      <div
        className={`hidden xlg:block transition-all duration-500 ease-in-out shrink-0
          ${isCollapsed ? "w-[80px]" : "w-[300px]"}
        `}
      />
    </>
  );
};

export default SideBar;
