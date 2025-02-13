import React from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your financial forecast, net worth, and investment goals all in one place.",
  keywords: ["dashboard", "net worth", "financial forecast", "investment goals", "financial information"],
};

const Dashboard = async () => {
  const supabase = await createClient();
  const { data: {user}} = await supabase.auth.getUser();

  return (
    <div>
      {user && (
        <div>
          <p>Email: {user ? user?.email : "no name"}</p>
          <p>UID: {user ? user?.id : "no name"}</p>
        </div>
      )}
      <SignOutButton />
      <DeleteUserButton />
    </div>
   
  );
};

export default Dashboard;
