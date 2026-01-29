import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";

import { useApiMutation } from "@/hooks/apiMutation";
import { useEmail } from "@/hooks/useEmail";

export default function ForgetPassword() {
    const { setEmail} = useEmail(); 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/forgot-password",
    method: "POST",
    secure: false,
    successMessage: "OTP sent successfully!",
    // ✅ This now works because we passed it in the hook above
    onSuccess: (data) => {
      navigate("/auth/reset-verify-otp");
    },
  });

  const onSubmit = (data) => {
     setEmail(data.email);
    mutate(data);
  };
  return (
    <div className="w-full max-w-xl bg-white dark:bg-[#0B1120]   rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
      <Link to="/" className="">
        <img src={logo} alt="" className="" />
      </Link>
      <div className=" mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold  mb-2">Reset Your Password</h1>
        <p className=" text-sm">Enter your registered email to reset your password.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-6"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium  mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm bg-white dark:bg-transparent focus:ring-2 focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/auth/sign-in" className="hover:underline text-Primary">
            Go back to Sign In
          </Link>
        </div>
        {/* Submit Button */}
        <CommonButton
          type="submit"
          variant="secondary"
          className="w-full h-[44px] flex items-center justify-center "
        >
          {isPending ? (
              <BeatLoader
                loading={isPending}
                color="white"
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Send OTP"
            )}

        </CommonButton>
      </form>
    </div>
  );
}