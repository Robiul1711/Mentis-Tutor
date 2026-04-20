import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";
import { useApiMutation } from "@/hooks/apiMutation";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard/my-courses";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/login",
    method: "POST",
    secure: false,
    successMessage: "Welcome back!",
    // ✅ This now works because we passed it in the hook above
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data?.userData);
      if (data.payment_status === true) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <div className="w-full max-w-xl bg-white dark:bg-[#0B1120]   rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
      <Link to="/" className="">
        <img src={logo} alt="" className="" />
      </Link>
      <div className=" mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold  mb-2">Welcome Back, Mentis</h1>
        <p className=" text-sm">
          Access your lessons, quizzes, and progress anytime, anywhere.
        </p>
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

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium  mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm bg-white dark:bg-transparent focus:ring-2 focus:outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <Link
            to="/auth/forget-password"
            className="hover:underline text-Primary"
          >
            Forgot Password?
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
            "Sign In"
          )}
        </CommonButton>
      </form>

      {/* Already have account? */}
      <div className="text-center mt-6 text-sm ">
        Already have an account?{" "}
        <Link
          to={"/auth/sign-up"}
          className="text-blue-600 hover:underline font-medium"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
