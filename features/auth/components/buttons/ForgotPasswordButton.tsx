import React from "react";
import Link from "next/link";
const ForgotPasswordButton = () => {
  return (
    <div className="flex items-center justify-center px-4 pt-4">
      <Link href="/login-help" className="text-blue-500 hover:underline text-sm">
        Forgot pasword?
      </Link>
    </div>
  );
};

export default ForgotPasswordButton;
