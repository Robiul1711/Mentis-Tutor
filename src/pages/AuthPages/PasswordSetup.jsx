import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react"; // Added Loader2
import { Link, useNavigate } from "react-router-dom";
import CommonButton from "@/components/common/CommonButton";
import logo from "@/assets/images/logo.png";
import { useApiMutation } from "@/hooks/apiMutation";

export default function PasswordSetup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange", // Validates as the user types for better UX
  });

  const passwordValue = watch("password");

  const { mutate, isPending } = useApiMutation({
    url: "/new-user-set-password",
    method: "POST",
    onSuccess: (data) => {
      // You might want to add a toast notification here
      navigate("/dashboard");
    },
    onError: (error) => {
      // Handle server-side errors (e.g., token expired)
      console.error("Mutation error:", error);
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="w-full max-w-xl bg-white dark:bg-[#0B1120] rounded-xl p-4 sm:p-8 border border-Primary/20 shadow-lg">
      {/* Header */}
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      <div className="mb-4 sm:mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Set a New Password</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Secure your account with a strong password.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 text-left">
        
        {/* New Password */}
        <div>
          <label htmlFor="password" title="Required" className="block text-sm font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" }, // Recommended standard is 8
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm transition focus:ring-2 focus:outline-none ${
                errors.password 
                ? "border-red-500 focus:ring-red-100" 
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password_confirmation"
              type={showConfirm ? "text" : "password"}
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) => value === passwordValue || "Passwords do not match",
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm transition focus:ring-2 focus:outline-none ${
                errors.password_confirmation 
                ? "border-red-500 focus:ring-red-100" 
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password_confirmation.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <CommonButton
          type="submit"
          disabled={isPending}
          variant="secondary"
          className="w-full h-[48px] flex items-center justify-center gap-2 font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Set New Password"
          )}
        </CommonButton>
      </form>
    </div>
  );
}