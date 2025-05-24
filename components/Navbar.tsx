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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface TokenPayload {
  userId: string;
  name : string
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState(false);
  const pathname = usePathname();
  // const dropdownRef = useRef<HTMLDivElement>(null);

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

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setModelOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(true);
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        setUserName(decoded.name)
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
      className={`fixed top-0 right-0 z-30 w-screen transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white shadow-md py-2 "
          : "bg-transparent py-4"
      }`}
    >
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="heading items-center gap-2 text-xl font-bold flex text-[#d97708]"
          >
            <CiForkAndKnife />
            <span>FootSpot</span>
          </Link>
          <div className="nav-wrap">
            <FaHamburger
              onClick={() => {
                setIsSideBarOpen(!isSideBarOpen);
              }}
              className="block laptop:hidden cursor-pointer"
            />
            <ul className="gap-4 hidden items-center laptop:flex cursor-pointer">
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
                    onClick={() => router.push("/auth/login")}
                  >
                    Sign In
                  </li>
                  <li
                    className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                      "/auth/register"
                    )}`}
                    onClick={() => router.push("/auth/register")}
                  >
                    Sign Up
                  </li>
                </>
              ) : (
                <>
                  <div className="flex gap-2 items-center">
                    <li
                      className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
                        "/restaurants/add"
                      )}`}
                      onClick={() => router.push("/restaurants/add")}
                    >
                      Add Restaurant
                    </li>

                    <div
                      onClick={() => setModelOpen(!modelOpen)}
                      className="w-10 h-10 cursor-pointer relative bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm"
                    >
                      {userName?.[0]?.toUpperCase() || "?"}
                      {modelOpen && (
                        <div className="absolute z-50 top-12 right-0 bg-gray-100 font-semibold text-[#d97708] rounded-lg px-6 py-2 flex items-center justify-center">
                          <div onClick={handleLogout}>Logout</div>
                        </div>
                      )}
                    </div>
                  </div>
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
