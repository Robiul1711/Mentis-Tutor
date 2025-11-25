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
    { name: "Blog", link: "/blog" },
    { name: "FAQ", link: "/faq" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={`w-full flex items-center justify-between py-3 section-padding-x z-50 sticky top-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="logo" 
            className="h-12 sm:h-14 md:h-16 transition-all duration-300" 
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="flex space-x-4 xl:space-x-8">
          {navLinks.map((item) => (
            <li key={item.name} className="relative font-semibold text-base xl:text-lg group">
              <Link
                to={item.link}
                className={`px-3 py-2 transition-all duration-200 rounded-lg ${
                  location.pathname === item.link
                    ? "text-Primary dark:text-Primary font-bold"
                    : "text-gray-700 dark:text-gray-300 hover:text-Primary dark:hover:text-Primary"
                }`}
              >
                {item.name}
              </Link>
              <span
                className={`absolute left-3 right-3 -bottom-1 h-0.5 bg-Primary transition-all duration-300 origin-left ${
                  location.pathname === item.link
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
        <ThemeToggleButton />
        <CommonButton
          link={"/auth/sign-in"}
          variant="secondary"
          className="px-6 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Sign In
        </CommonButton>
      </div>

      {/* Mobile Actions */}
      <div className="flex lg:hidden items-center gap-3">
        <ThemeToggleButton />
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-70 z-50 max-w-full bg-white dark:bg-[#0B1120] shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="flex items-center"
            >
              <img src={logo} alt="logo" className="h-8" />
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6">
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                      location.pathname === item.link
                        ? "text-Primary bg-Primary/10 dark:bg-Primary/20 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sign In Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <CommonButton
                link={"/auth/sign-in"}
                variant="secondary"
                className="w-full py-3 text-base font-semibold dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;