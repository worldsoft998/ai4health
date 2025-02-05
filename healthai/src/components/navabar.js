import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage profile dropdown
  const [user, setUser] = useState(null); // Store user information

  useEffect(() => {
    // Fetch user session on component mount
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsLoggedIn(true);
          setUser(data.user); // Assuming API sends the user's data
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user session:", err);
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    // Logout API call
    fetch("/api/logout", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("token"); // Clear local storage token (if used)
          setIsLoggedIn(false);
          setUser(null);
          window.location.href = "/"; // Redirect to the home page
        }
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <nav className="bg-transparent fixed w-full z-20 top-3 left-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 border-2 border-lime-600 rounded-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo.jpeg" // Place your logo in the `public` folder of your Next.js project
            alt="Logo"
            className="h-10 rounded-full w-35"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-12 rtl:space-x-reverse text-xl font-bold">
          <Link
            href="/"
            className="text-xl text-[#EFE3C2] hover:text-blue-400 font-semibold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-xl text-[#EFE3C2] hover:text-blue-400 font-semibold"
          >
            About
          </Link>
          <Link
              href="/contact"
              className="text-xl text-[#EFE3C2] hover:text-blue-400 font-semibold"
            >
              Contact
            </Link>
          
          {isLoggedIn ? (
            <>
            <Link
              href="/modelgarden"
              className="text-xl text-[#EFE3C2] hover:text-blue-400 font-semibold"
            >
              SpecialistDoctors
            </Link>
            <Link
              href="/dashboard"
              className="text-xl text-[#EFE3C2] hover:text-blue-400 font-semibold"
            >
              Dashboard
            </Link>
          </>
          ) : (
            <Link
              href="/contact"
              className="text-xl text-[#EFE3C2] hover:text-blue-400 font-semibold"
            >
             
            </Link>
          )}
        </div>

        {/* Profile or Sign Up */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {isLoggedIn ? (
            // Show user profile icon with dropdown
            <div className="relative">
              <img
                src="/user.png" // Place your user profile icon in the `public` folder
                alt="User"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
              />
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-green-200 border border-gray-200 rounded-lg shadow-lg">
                  <div className="px-4 py-2 text-gray-800">
                    <strong>{user?.username}</strong>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show Sign Up and Login buttons
            <div className="flex space-x-4">
              <a href="/signup">
                <button
                  type="button"
                  className="text-lg text-[#EFE3C2] bg-teal-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
              </a>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-3 w-12 h-12 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mt-4"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
