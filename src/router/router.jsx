import AllPastPapers from "@/components/admin/AllPastPapers";
import Dashboard from "@/components/admin/Dashboard";
import HelpAndSupport from "@/components/admin/HelpAndSupport";
import Message from "@/components/admin/Message";
import MyCourses from "@/components/admin/MyCourses";
import MyQuiz from "@/components/admin/MyQuiz";
import PastPaperProgressTracker from "@/components/admin/PastPaperProgressTracker";
import Settinngs from "@/components/admin/Settings";
import BlogDetails from "@/components/BlogCard/BlogDetails";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import About from "@/pages/AboutPage/About";
import ForgetPassword from "@/pages/AuthPages/ForgetPassword";
import NewPasswordSet from "@/pages/AuthPages/NewPasswordSet";
import SignIn from "@/pages/AuthPages/SignIn";
import SignUp from "@/pages/AuthPages/SignUp";
import VerifyOtp from "@/pages/AuthPages/VerifyOtp";
import Blog from "@/pages/Blog/Blog";
import Contact from "@/pages/Contact/Contact";
import Course from "@/pages/Course/Course";
import CourseDetais from "@/pages/CourseDetails/CourseDetais";
import FAQsPage from "@/pages/FaqsPage/FAQsPage";
import Home from "@/pages/home/Home";
import TearmsAndConditions from "@/pages/TearmAndConditions/TearmsAndConditions";


import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    // Auth
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "new-password-set",
        element: <NewPasswordSet />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/courses",
        element: <Course />
      },
      {
        path: "/course-details",
        element: <CourseDetais />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails />,
      },
      {
        path: "/faq",
        element: <FAQsPage />,
      },
      {
        path: "/tearms-and-conditions",
        element: <TearmsAndConditions />,
      },
    ],
  },
  // Admin routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />, 
      },
      {
        path: "/dashboard/my-courses",
        element: <MyCourses />, 
      },
      {
        path: "/dashboard/message",
        element: <Message />, 
      },
      {
        path: "/dashboard/my-quiz",
        element: <MyQuiz />, 
      },
      {
        path: "/dashboard/past-papers",
        element: <AllPastPapers />, 
      },
      {
        path: "/dashboard/past-paper-progress-tracker",
        element: <PastPaperProgressTracker />, 
      },
      {
        path: "/dashboard/help-and-support",
        element: <HelpAndSupport />, 
      },
      {
        path: "/dashboard/settings",
        element: <Settinngs />, 
      },
    ],
  },
]);

export default router;
