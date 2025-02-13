"use client";
import React, { useState } from "react";
import userService from "@/features/user/services/userService";
import { useRouter } from "next/navigation";
import DotLoader from "@/components/loading/DotLoader";

const DeleteUserButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await userService.deleteUser();
      if (res.status === "error") {
        return;
      }
      if (res.status === "success") {
        document.cookie =
          "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        router.push("/"); // Redirect to the home page or login page
      }
    } catch (error: unknown) {
      console.log("Error deleting user:", error);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white font-bold p-4 rounded-md"
      disabled={isLoading}
    >
      {isLoading ? <DotLoader /> : "Delete User"}
    </button>
  );
};

export default DeleteUserButton;
