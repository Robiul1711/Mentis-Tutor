import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-bg-custom">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
