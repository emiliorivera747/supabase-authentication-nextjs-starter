import React from "react";
import Link from "next/link";

const AlreadyHaveAccount = () => {
  return (
    <div className="flex items-center justify-center px-4 pt-4">
      <Link href="/sign-in" className="text-blue-500 hover:underline text-sm">
        Already have an account?
      </Link>
    </div>
  );
};

export default AlreadyHaveAccount;
