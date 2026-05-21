import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { BeatLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Fetch detailed profile to check payment status
  const { data: userDetails, isLoading } = useApiQuery({
    queryKey: ["userDetails"],
    url: "/profile",
    secure: true,
    enabled: !!user, // Only fetch if user is logged in
  });

  if (!user) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center">
  //       <BeatLoader color="#5176ea" size={15} />
  //     </div>
  //   );
  // }

  // Check payment status
  if (userDetails?.userdata && !userDetails.userdata.payment_status) {
    return <Navigate to="/#pricing" replace />;
  }

  return children;
};

export default PrivateRoute;
