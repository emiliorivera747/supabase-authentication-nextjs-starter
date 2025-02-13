import React from "react";

// Components
import SignUpForm from "@/features/auth/components/form/SignUpForm";
import NavBar from "@/components/nav-bars/NavBar";
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Trellis Money",
  description: "Create a new account on Trellis Money",
};

const page = () => {
  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center min-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <SignUpForm />
      </div>
    </DashboardRedirect>
  );
};

export default page;
