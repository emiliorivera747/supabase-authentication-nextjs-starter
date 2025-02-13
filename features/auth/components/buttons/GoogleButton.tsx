"use client";

// React & Next
import React, { useState } from "react";
import Image from "next/image";

// Utils
import { createClient } from "@/utils/supabase/client";

// Components
import DotLoader from "@/components/loading/DotLoader";
import {useRouter} from "next/navigation"

interface GoogleButtonProps {
  label: string;
  dataTestID?: string;
}

const GoogleButton = ({ label, dataTestID }: GoogleButtonProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
 

    } catch (error) {
      setIsGoogleLoading(false);

      console.error("Error during Google sign-in:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="mb-4 px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-[#f1f3f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4"
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
        <DotLoader bgColor="bg-primary-300" dataTestID={dataTestID} />
      ) : (
        <>
          {" "}
          <div className="flex-shrink-0">
            <Image
              src="/google_logo.png"
              width={20}
              height={20}
              alt="google logo"
            />
          </div>
          {label}
        </>
      )}
    </button>
  );
};

export default GoogleButton;
