import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./providers/AuthProvider";
const queryClient = new QueryClient();
import  { Toaster } from 'react-hot-toast';
import EmailProvider from "./providers/EmailProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <AuthProvider>
        <EmailProvider>
        <RouterProvider router={router} />
        </EmailProvider>
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
