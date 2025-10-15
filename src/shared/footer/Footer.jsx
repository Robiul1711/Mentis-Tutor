import React from "react";
import logo from "@/assets/images/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-padding-x section-padding-y bg-bg-custom1 dark:bg-[#0B1120]">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-8 border-b border-black">
        {/* Logo */}
        <div className="flex flex-col max-w-[600px] gap-4">
          <img src={logo} alt="Logo" className="w-28" />
          <p>
            Mentis is an interactive GCSE Maths learning platform offering video
            lessons, quizzes, live sessions, and 1:1 support. Our mission is to
            make maths simple, engaging, and exam-focused helping every student
            reach their potential.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm sm:text-base md:text-lg font-medium">
          <li className="hover:text-Primary duration-300 cursor-pointer">
            Home
          </li>
          <li className="hover:text-Primary duration-300 cursor-pointer">
            About{" "}
          </li>
          <li className="hover:text-Primary duration-300 cursor-pointer">
            Courses
          </li>
          <li className="hover:text-Primary duration-300 cursor-pointer">
            Contact Us
          </li>
        </ul>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary dark:bg-[#110f0f] dark:border hover:text-Tertiary duration-300  hover:bg-custom-primary transition"
          >
            <FaFacebookF className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary  dark:bg-[#110f0f] dark:border hover:text-Tertiary duration-300  hover:bg-custom-primary transition"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white dark:bg-[#110f0f]  dark:border text-custom-primary hover:text-Tertiary duration-300  hover:bg-custom-primary transition"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary dark:bg-[#110f0f] dark:border hover:text-Tertiary duration-300  hover:bg-custom-primary transition"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-6 gap-6 text-sm sm:text-base sm:font-medium text-gray-400">
        <ul className="flex flex-wrap gap-4 justify-center">
          <li className="hover:text-Tertiary cursor-pointer">
            <Link to={"/tearms-and-conditions"}>Terms and Conditions</Link>
          </li>
        </ul>
        <p className="text-center lg:text-right">
          © 2025 labonneroute.fr. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
