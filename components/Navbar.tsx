"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { FaHamburger } from "react-icons/fa";
import SideBar from "./SideBar";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { CircleUser } from "lucide-react";

interface TokenPayload {
  userId: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    pathname === path
      ? "border-b-2 border-[#d97708] text-[#d97708]"
      : "border-b-2 border-transparent";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(true);
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        console.log("decode", decoded.userId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setToken(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container">
        <nav className="flex justify-between items-center">
          <div className="logo">
            <Link
              href="/"
              className="items-center text-xl font-bold flex text-[#d97708]"
            >
              <CiForkAndKnife />
              <span>FootSpot</span>
            </Link>
          </div>
          <div className="nav-wrap">
            <FaHamburger
              onClick={() => {
                setIsSideBarOpen(!isSideBarOpen);
              }}
              className="block laptop:hidden cursor-pointer"
            />
            <ul className="gap-4 hidden laptop:flex cursor-pointer">
              <li
                className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                  "/"
                )}`}
                onClick={() => router.push("/")}
              >
                Home
              </li>
              <li
                className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                  "/about"
                )}`}
                onClick={() => router.push("/about")}
              >
                About
              </li>
              <li
                className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                  "/contact"
                )}`}
                onClick={() => router.push("/contact")}
              >
                Contact
              </li>
              {!token ? (
                <>
                  <li
                    className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                      "/auth/login"
                    )}`}
                    onClick={() => router.push("/login")}
                  >
                    Sign In
                  </li>
                  <li
                    className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                      "/auth/register"
                    )}`}
                    onClick={() => router.push("/Sign Up")}
                  >
                    Sign Out
                  </li>
                </>
              ) : (
                <>
                  <div ref={dropdownRef}>
                    <CircleUser
                      onClick={() => setModelOpen(!modelOpen)}
                      className="relative"
                    />
                  </div>
                  {modelOpen && (
                    <div className="absolute z-50 top-9 right-0 text-gray-100 font-semibold bg-[#d97708] rounded-lg px-6 py-2 flex items-center justify-center">
                      {token ? (
                        <div onClick={handleLogout}>Logout</div>
                      ) : (
                        <div className="flex gap-4">
                          <span onClick={() => router.push("/auth/register")}>
                            Register
                          </span>
                          <span onClick={() => router.push("/auth/login")}>
                            Login
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </ul>

            {isSideBarOpen && (
              <div
                className={`${
                  isSideBarOpen ? "slide-out" : "slide-in"
                } fixed top-12 h-[calc(93vh)] right-0 border-2 border-red-500 px-4 py-2 sub-heading-client w-[50%] justify-between laptop:hidden`}
              >
                <SideBar />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
