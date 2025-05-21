"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { FaHamburger } from "react-icons/fa";
import SideBar from "./SideBar";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled || isMenuOpen
                    ? "bg-white shadow-md py-2"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="container">
                <nav className="flex justify-between items-center">
                    <div className="logo">
                        <Link href="/" className="items-center text-xl font-bold flex text-[#d97708]">
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
                            <li className="hover:text-[#d97708]" onClick={() => router.push("/")}>
                                Home
                            </li>
                            <li className="hover:text-[#d97708]" onClick={() => router.push("/about")}>
                                About
                            </li>
                            <li className="hover:text-[#d97708]" onClick={() => router.push("/contact")}>
                                Contact
                            </li>
                            <li className="hover:text-[#d97708]" onClick={() => router.push("/signin")}>
                                Sign In
                            </li>
                            <li className="hover:text-[#d97708]" onClick={() => router.push("/signout")}>
                                Sign Out
                            </li>
                        </ul>

                        {isSideBarOpen && (
                            <div
                                className={`${isSideBarOpen ? "slide-out" : "slide-in"
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
