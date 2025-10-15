"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: null,
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      nationality: "",
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Avatar Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={
              avatarPreview ||
              "https://via.placeholder.com/120x120.png?text=Avatar"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-[#01244B] text-white text-xs px-2 py-1 rounded-full cursor-pointer"
          >
            Change
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <p className="text-sm text-gray-500">Allowed: JPG, PNG (max 2MB)</p>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          placeholder="Full Name"
          {...register("fullName", { required: "Full name is required" })}
        />
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          {...register("phone", { required: "Phone number is required" })}
        />
        <Input
          type="date"
          {...register("dob", { required: "Date of birth is required" })}
        />
        <Input
          placeholder="Nationality"
          {...register("nationality", { required: "Nationality is required" })}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-Primary rounded-full ">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
