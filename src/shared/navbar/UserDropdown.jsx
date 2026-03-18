import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import profile from "@/assets/images/avatar.png";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import { useAuth } from "@/hooks/useAuth";

const UserDropdown = () => {
  const { setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Fetch User Profile
  const { data: userDetails } = useApiQuery({
    queryKey: ["userDetails"],
    url: "/profile",
    secure: true,
  });

  console.log(userDetails);
  // ✅ New Mutation Implementation
  const { mutate: logoutUser } = useApiMutation({
    url: "/logout",
    method: "POST",
    secure: true,
    successMessage: "Logged out successfully!",
    onSuccess: () => {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/auth/sign-in");
    },
  });

  // ✅ Handle Logout with Confirmation
  const handleLogout = () => {
    setIsOpen(false); // Close dropdown immediately
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser(); // Triggers the useApiMutation
      }
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          className=" size-8 sm:size-9 md:size-10  bg-white rounded-full object-cover border border-gray-200"
          src={userDetails?.userdata?.avatar || profile}
          alt="User Profile"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 text-gray-800 animate-in fade-in zoom-in duration-300">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold truncate">
              {userDetails?.userdata?.name || "Username"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {userDetails?.userdata?.email}
            </p>
          </div>
          <div className="py-1">
            <Link
              to={`/dashboard`}
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            >
              <MdDashboard className="mr-2 text-[#5176ea]" /> Dashboard
            </Link>
            <Link
              to={`/dashboard/settings`}
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            >
              <FiSettings className="mr-2 text-[#5176ea]" /> Setting
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
