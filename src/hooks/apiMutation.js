import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

export const useApiMutation = ({
  url,
  method = "POST",
  secure = false,
  invalidateKeys = [],
  successMessage = "Success!",
  errorMessage = "Something went wrong",
  onSuccess, // ✅ Accept external callback
  onError, // ✅ Accept external callback
  showToast = true,
}) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const axiosClient = secure ? axiosSecure : axiosPublic;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      // ✅ Handle dynamic URLs (e.g., /todo-tasks/:id)
      let finalUrl = url;
      if (data?.id && url.includes(":id")) {
        finalUrl = url.replace(":id", data.id);
      } else if (data?.id && (method.toUpperCase() === "DELETE" || method.toUpperCase() === "PUT" || method.toUpperCase() === "PATCH")) {
        // If it's a delete/update and no :id in URL, append it if the URL doesn't already end with an ID-like string
        if (!url.endsWith(`/${data.id}`)) {
          finalUrl = `${url}/${data.id}`;
        }
      }

      const config = {
        method: method.toUpperCase(),
        url: finalUrl,
        data: data,
      };

      const response = await axiosClient(config);
      return response.data;
    },

    onMutate: () => {
      if (showToast) {
        const toastId = showLoadingToast("Processing...");
        return { toastId };
      }
      return {};
    },

    onSuccess: (response, variables, context) => {
      // 1. Update Toast
      if (showToast && context?.toastId) {
        updateToastSuccess(
          context.toastId,
          response?.message || successMessage,
        );
      }

      // 2. Invalidate Queries (Refresh Data)
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      // 3. ✅ Run the extra logic from your component (Navigation, Modal Close, etc.)
      if (onSuccess) {
        onSuccess(response);
      }
    },

    onError: (error, variables, context) => {
      const message = error?.response?.data?.message || errorMessage;

      if (showToast && context?.toastId) {
        updateToastError(context.toastId, message);
      }

      // 4. ✅ Run external error logic if needed
      if (onError) {
        onError(error);
      }
    },
  });
};

//uses

// const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

// const { mutate, isPending } = useApiMutation({
//   url: "/auth/login",
//   method: "POST",
//   secure: false,
//   successMessage: "Welcome back!",
//   // ✅ This now works because we passed it in the hook above
//   onSuccess: (data) => {
//     localStorage.setItem('token', data.token);
//     navigate('/dashboard');
//   }
// });

//   const onSubmit = (data) => {
//     mutate(data);
//   };
