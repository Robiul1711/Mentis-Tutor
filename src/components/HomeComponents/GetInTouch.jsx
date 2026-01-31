import useAxiosPublic from "@/hooks/useAxiosPublic";
import { BiSolidPhoneCall } from "react-icons/bi";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";
import { useApiMutation } from "@/hooks/apiMutation";

const GetInTouch = () => {
const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/contact",
    method: "POST",
    secure: false,
    successMessage: "Message sent successfully!",
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    // This will only run if all validations (including checkbox) pass
    mutate(data);
  };
  return (
    <div className="py-14   section-padding-x">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <Title level="title48">Get in Touch with Mentis</Title>
        <Title level="title20">
          Have questions about our courses, pricing, or support? Reach out and
          we’ll respond quickly to help you succeed in your GCSE Maths journey.
        </Title>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-14">
        {/* Left: Contact Info */}
        <div className="md:w-[40%] space-y-4">
          <h2 className="text-2xl lg:text-3xl font-semibold">Contact Info</h2>
          <div className="space-y-4 ">
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                <MdEmail size={20} />
              </div>
              <span className="text-gray-800 dark:text-white font-medium text-base">
                support@mentis.co.uk
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                <BiSolidPhoneCall size={20} />
              </div>
              <span className="text-gray-800 dark:text-white font-medium text-base">
                London, United Kingdom
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                <FaLocationDot size={20} />
              </div>
              <span className="text-gray-800 dark:text-white font-medium text-base">
                London, United Kingdom
              </span>
            </div>
          </div>
        </div>

    {/* Right: Contact Form */}
        <div className="md:w-[60%]">
          <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="block mb-1 dark:text-white text-base">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name."
                className={`w-full px-4 py-2 border rounded-md text-base bg-[#64B5F6]/10 dark:bg-[#0B1120] outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-[#64B5F6] dark:border-white'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block mb-1 dark:text-white text-base">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                })}
                placeholder="Enter your email."
                className={`w-full px-4 py-2 border rounded-md text-base bg-[#64B5F6]/10 dark:bg-[#0B1120] outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-[#64B5F6] dark:border-white'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Subject Input */}
            <div>
              <label className="block mb-1 dark:text-white text-base">Subject</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                placeholder="Enter your subject."
                className={`w-full px-4 py-2 border rounded-md text-base bg-[#64B5F6]/10 dark:bg-[#0B1120] outline-none focus:ring-2 focus:ring-blue-500 ${errors.subject ? 'border-red-500' : 'border-[#64B5F6] dark:border-white'}`}
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message Input */}
            <div>
              <label className="block mb-1 dark:text-white text-base">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows="4"
                placeholder="Enter your message."
                className={`w-full px-4 py-2 border rounded-md text-base bg-[#64B5F6]/10 dark:bg-[#0B1120] outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500' : 'border-[#64B5F6] dark:border-white'}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms_accepted", {
                    required: "You must agree to the terms.",
                  })}
                />
                <label htmlFor="terms" className="text-base text-gray-600 dark:text-white cursor-pointer">
                  I agree to the terms of service and privacy policy
                </label>
              </div>
              {errors.terms_accepted && (
                <p className="text-red-500 text-sm">{errors.terms_accepted.message}</p>
              )}
            </div>

            {/* Submit Button with Loading State */}
            <CommonButton 
              variant="secondary" 
              className="mt-6 w-full flex items-center justify-center" 
              type="submit"
              disabled={isPending} // Prevent double submission
            >
              {isPending ? (
                <BeatLoader size={8} color="#ffffff" />
              ) : (
                "Send Message"
              )}
            </CommonButton>
          </form>
        </div>
   
      </div>
    </div>
  );
};

export default GetInTouch;
