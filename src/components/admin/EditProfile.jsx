import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/apiMutation";
import { useApiQuery } from "@/hooks/apiQuery";

const EditProfile = () => {
  const { data: userDetails, refetch } = useApiQuery({
    queryKey: ["userDetails"],
    url: "/profile",
    secure: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
  const [selectedFile, setSelectedFile] = useState(null);

  // Update form values when userDetails is loaded
  useEffect(() => {
    if (userDetails?.userdata) {
      reset({
        avatar: userDetails.userdata.avatar || null,
        fullName: userDetails.userdata.name || "",
        email: userDetails.userdata.email || "",
        phone: userDetails.userdata.phone || "",
        dob: userDetails.userdata.dob || "",
        nationality: userDetails.userdata.nationality || "",
      });
    }
  }, [userDetails, reset]);

  // Mutation for Profile Update
  const { mutate: updateProfile, isPending: isProfilePending } = useApiMutation(
    {
      url: "/profile/update",
      method: "POST",
      secure: true,
      successMessage: "Profile updated successfully!",
      onSuccess: (data) => {
        console.log("Profile Updated:", data);
        refetch(); // Refetch user details to ensure latest data is shown
      },
    },
  );

  // Mutation for Avatar Update
  const { mutate: updateAvatar, isPending: isAvatarPending } = useApiMutation({
    url: "/profile/update-avatar",
    method: "POST",
    secure: true,
    successMessage: "Profile photo updated successfully!",
    onSuccess: (data) => {
      console.log("Avatar Updated:", data);
      setSelectedFile(null); // Reset file selection after success
      setAvatarPreview(null); // Clear preview to show the new server image
      refetch(); // Refetch user details to get the new avatar URL
    },
  });

  const onSubmit = (data) => {
    // Exclude avatar from the main profile update payload
    const { avatar, ...profileData } = data;
    updateProfile(profileData);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // setValue("avatar", file); // Not strictly needed if we manage file separately
      setAvatarPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleUploadAvatar = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    updateAvatar(formData);
  };

  return (
    <div className="space-y-8">
      {/* Avatar Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={
              avatarPreview ||
              userDetails?.userdata?.avatar ||
              "https://via.placeholder.com/120x120.png?text=Avatar"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-[#01244B] text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-900 transition"
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

        {/* Extra button for profile change as requested */}
        {selectedFile && (
          <Button
            onClick={handleUploadAvatar}
            disabled={isAvatarPending}
            className="h-8 text-xs bg-blue-600 hover:bg-blue-700"
          >
            {isAvatarPending ? "Uploading..." : "Save Photo"}
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            placeholder="Full Name"
            {...register("name", { required: "Full name is required" })}
          />
          <Input
          className="cursor-not-allowed "
          disabled
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
            {...register("nationality", {
              required: "Nationality is required",
            })}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-Primary rounded-full "
            disabled={isProfilePending}
          >
            {isProfilePending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
