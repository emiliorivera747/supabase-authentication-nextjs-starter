import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex justify-between p-4 border-b border-gray-200 mx-10">
      <Link href="/" className="flex h-full">
        {/* <img src="/logo.png" alt="Trellis Money Logo" className="h-10 mr-4" /> */}
        <span className="text-xl font-bold">Trellis Money</span>
      </Link>
    </nav>
  );
};

export default NavBar;
