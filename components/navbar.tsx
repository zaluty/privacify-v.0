"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4  my-4 rounded-full fixed top-0 left-0 right-0 z-50 max-w-[1200px] mx-auto  ">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="text-white text-lg font-bold">Privacify</div>

        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>{" "}
          <Link href="/waitlist" className="text-white hover:text-gray-300">
            Waitlist
          </Link>
          <Link
            href="https://github.com/zaluty/privacify-v.0.git"
            className="text-white hover:text-gray-300"
          >
            Github
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
