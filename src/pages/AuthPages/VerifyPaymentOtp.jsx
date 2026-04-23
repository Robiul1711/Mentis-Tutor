import OTPInput from "otp-input-react";
import { Controller, useForm } from "react-hook-form";
import logo from "@/assets/images/logo.png";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useApiMutation } from "@/hooks/apiMutation";


export default function VerifyPaymentOtp() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/new-user-verify-otp",
    method: "POST",
    secure: false,
    onSuccess: (data) => {
      navigate('/auth/password-setup', { state: { token: data?.token } });
    }
  });

  const onSubmit = (data) => {
    const payload = {
      otp: data.otp,
      email: emailFromUrl,
    };
    console.log(data);
    mutate(payload);
  };

  return (
    <div className="w-full max-w-xl bg-white dark:bg-[#0B1120]  rounded-xl p-5 sm:p-8 border border-Primary/20">
      {/* Header */}
              <Link to="/" className="">
        <img src={logo} alt="" className="" />
        </Link>
      <div className=" mb-5 sm:mb-8">
        <h1 className="text-2xl font-semibold  mb-2">Verify Your Code</h1>
        <p className=" text-sm">Enter the 6-digit code sent to your email.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-6"
      >
        <Controller
          control={control}
          name="otp"
          rules={{
            required: "OTP is required",
            minLength: { value: 6, message: "OTP must be 6 digits" },
            maxLength: { value: 6, message: "OTP must be 6 digits" },
          }}
          render={({ field }) => (
            <div className="flex justify-center">
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                inputStyles={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  color: "#3b82f6",
                  borderRadius: "0.5rem",
                  border: "2px solid #d1d5db",
                  background: "#ffff dark:bg-transparent",
                  textAlign: "center",
                  outline: "none",
                }}
                focusStyles={{
                  border: "2px solid #3b82f6",
                  boxShadow: "0 0 0 3px rgba(59, 130, 256, 0.5)",
                }}
                className="otp-input-container"
              />
            </div>
          )}
        />
        {errors.otp && (
          <p className="text-center text-sm text-red-500">
            {errors.otp.message}
          </p>
        )}
        {/* Submit Button */}
        <CommonButton
          type="submit"
          variant="secondary"
          className="w-full h-[55px] flex items-center justify-center "
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
              "  VerifyOtp"
            )}
          
        
        </CommonButton>
      </form>
    </div>
  );
}