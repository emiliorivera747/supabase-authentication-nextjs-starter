'use client'
import React from "react";
import Head from "next/head";
import NavBar from "@/components/nav-bars/NavBar";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/features/auth/components/form/ResetPasswordForm";

const page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset your password using the code sent to your email." />
      </Head>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <ResetPasswordForm
          code={code ? code : null}
        />
      </div>
    </>
  );
};

export default page;
