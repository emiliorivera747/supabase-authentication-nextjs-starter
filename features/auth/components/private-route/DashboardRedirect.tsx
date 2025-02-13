"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState} from "react";
import { createClient } from "@/utils/supabase/client";
import LoadingPage from "@/components/loading/LoadingPage";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface User {
  email: string;
  uid: string;
}

const DashboardRedirect= ({ children }: ProtectedRouteProps) => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setInitializing(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({ email: user.email ?? "", uid: user.id ?? "" });
      }
      setInitializing(false);
    };
    fetchUser();
  }, [router, supabase]);

  useEffect(() => {
    /**
     * If the user is  authenticated and the app is not initializing, redirect to home page
     */
    if (user && !initializing) {
      router.push("/dashboard");
    }
  }, [user, router]);

  /**
   * If the app is initializing, show a loading message
   */
  if (initializing) {
    return <LoadingPage />;
  }


  /**
   * If the user is not authenticated and the app is not initializing, render the children
   */
  if(!user && !initializing){
    return children;
  }
};

export default DashboardRedirect;
