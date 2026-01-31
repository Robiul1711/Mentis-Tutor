import React from "react";
import { useForm } from "react-hook-form";
import CommonButton from "../common/CommonButton";
import { MdArrowOutward } from "react-icons/md";
import { useApiMutation } from "@/hooks/apiMutation";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/contact",
    method: "POST",
    secure: true,
    successMessage: "Message sent successfully!",
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Contact labonneroute.fr Support
      </h2>

      <hr className="my-4" />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name, Email, Phone in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name..."
              className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-transparent px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              placeholder="Enter your email..."
              className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-transparent px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="Enter your phone number..."
              className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-transparent px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Subject
            </label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              placeholder="Enter subject..."
              className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-transparent  px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Message
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your message here..."
            rows={5}
            className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-transparent px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        {/* tearms  */}
        {/* Terms and Conditions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms_accepted", {
                required: "You must accept the terms and conditions",
              })}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-gray-700 dark:text-white cursor-pointer"
            >
              I accept the Terms and Conditions
            </label>
          </div>
          {errors.terms_accepted && (
            <p className="text-red-500 text-sm">
              {errors.terms_accepted.message}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <CommonButton
            disabled={isPending}
            variant="secondary"
            className="mt-6 group "
            type="submit"
          >
            {" "}
            {isPending ? "Sending..." : "Submit"}{" "}
            <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
              {" "}
              <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />{" "}
            </span>{" "}
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
