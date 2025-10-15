import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import CommonButton from "@/components/common/CommonButton";
import { Menu, X } from "lucide-react";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Courses", link: "/courses" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`section-padding-x flex items-center justify-between py-4 z-50 sticky top-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0B1120]/60 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-16" />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex">
        <ul className="flex space-x-8">
          {navLinks.map((item) => (
            <li key={item.name} className="relative font-semibold text-lg group">
              <Link
                to={item.link}
                className={`transition-colors duration-200 ${
                  location.pathname === item.link
                    ? "text-Primary dark:text-Primary" // active link
                    : "text-gray-700 dark:text-gray-300" // normal link
                }`}
              >
                {item.name}
              </Link>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full bg-Primary transition-transform duration-300 origin-left ${
                  location.pathname === item.link
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Sign In Button */}
      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <div className="hidden md:block">
          <CommonButton
            link={"/auth/sign-in"}
            variant="secondary"
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            Sign In
          </CommonButton>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-[#0B1120] shadow-lg z-50 p-6 transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img src={logo} alt="logo" className="h-8" />
              </Link>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <ul className="space-y-6">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className={`text-lg transition-colors duration-200 ${
                      location.pathname === item.link
                        ? "text-Primary font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <CommonButton
                link={"/auth/sign-in"}
                variant="secondary"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
              >
                Sign In
              </CommonButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
