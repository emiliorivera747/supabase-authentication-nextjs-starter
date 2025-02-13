import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-zinc-800 py-4 border-t border-[#d1d7dc] mx-16">
      <div className="container h-full  text-center ">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Trellis Money. All rights reserved.
        </p>
        <p className="text-sm mt-2 text-zinc-800">
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="hover:text-gray-400 ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
