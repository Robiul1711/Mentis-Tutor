import React from "react";
import logo from "@/assets/images/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
  FaWhatsapp,
  FaTelegramPlane,
  FaSnapchatGhost,
  FaViber,
} from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";

const Footer = () => {
  const { data: footerData } = useApiQuery({
    queryKey: ["footerData"],
    url: "/social-links",
  });

  const socials = footerData?.data;

  const socialLinks = [
    { href: socials?.facebook_link, icon: <FaFacebookF className="w-4 h-4" /> },
    { href: socials?.twitter_link, icon: <FaTwitter className="w-4 h-4" /> },
    {
      href: socials?.instagram_link,
      icon: <FaInstagram className="w-4 h-4" />,
    },
    { href: socials?.youtube_link, icon: <FaYoutube className="w-4 h-4" /> },
    {
      href: socials?.pinterest_link,
      icon: <FaPinterestP className="w-4 h-4" />,
    },
    { href: socials?.whatsapp_link, icon: <FaWhatsapp className="w-4 h-4" /> },
    {
      href: socials?.telegram_link,
      icon: <FaTelegramPlane className="w-4 h-4" />,
    },
    {
      href: socials?.snapchat_link,
      icon: <FaSnapchatGhost className="w-4 h-4" />,
    },
    { href: socials?.viber_link, icon: <FaViber className="w-4 h-4" /> },
    { href: socials?.other_link, icon: <FaGlobe className="w-4 h-4" /> },
  ].filter((link) => link.href);
  return (
    <footer className="section-padding-x py-10 sm:pt-20 dark:border-t bg-[#FFF] dark:bg-[#0B1120]  ">
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
          <Link
            to="/"
            className="hover:text-Primary duration-300 cursor-pointer"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hover:text-Primary duration-300 cursor-pointer"
          >
            About{" "}
          </Link>
          <Link
            to="/courses"
            className="hover:text-Primary duration-300 cursor-pointer"
          >
            Courses
          </Link>
          <Link
            to="/blog"
            className="hover:text-Primary duration-300 cursor-pointer"
          >
            Blog
          </Link>
          <Link
            to="/faq"
            className="hover:text-Primary duration-300 cursor-pointer"
          >
            Faqs
          </Link>
          <Link
            to="/contact"
            className="hover:text-Primary duration-300 cursor-pointer"
          >
            Contact Us
          </Link>
        </ul>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white dark:border-white text-custom-primary dark:bg-[#110f0f] dark:border hover:text-Tertiary duration-300 hover:bg-custom-primary transition"
            >
              {social.icon}
            </a>
          ))}
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
