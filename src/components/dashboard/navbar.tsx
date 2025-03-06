"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-300 shadow-md">
      <div className="container mx-auto max-w-8xl px-10">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="/logobantul.png"
              alt="Logo"
              className="h-auto w-auto max-h-9"
            />
          </div>
          <nav className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1"
              >
                <span>Dashboard</span>
                <FaChevronDown />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link
                    href="/dashboard/kepegawaian"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Kepegawaian
                  </Link>
                  <Link
                    href="/dashboard/kependudukan"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Kependudukan
                  </Link>
                  <Link
                    href="/dashboard/menara"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Menara
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="text-black">
              Tentang
            </Link>
            <Link href="/login">
              <button className="border border-black px-4 py-2 rounded">
                Masuk
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
