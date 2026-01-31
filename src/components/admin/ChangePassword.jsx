import { useApiMutation } from "@/hooks/apiMutation";
import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

const { mutate, isPending } = useApiMutation({
  url: "/update-password",
  method: "POST",
  secure: true,
  successMessage: "Password updated successfully!",
  // ✅ This now works because we passed it in the hook above
  onSuccess: (data) => {
   reset();
  },
});

  const onSubmit = (data) => {

    mutate(data);
  };
  const newPassword = watch("new_password");

  return (
    <div className=" mt-6">

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-primary"
            {...register("old_password", { required: "Current password is required" })}
          />
          {errors.old_password && (
            <p className="text-red-500 text-sm">{errors.old_password.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-primary"
            {...register("new_password", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm">{errors.new_password.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-primary"
            {...register("new_password_confirmation", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.new_password_confirmation && (
            <p className="text-red-500 text-sm">{errors.new_password_confirmation.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-Primary text-black rounded-full px-6 py-2  transition"
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
