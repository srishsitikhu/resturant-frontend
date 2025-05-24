"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CircleUser } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  name: string;
  userId: string;
}

const SideBarAdmin = () => {
  const sideBarElements = [
    "Users",
    "Restaurants",
    "MenuItems",
    "Comments",
    "Contacts",
  ];
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        setUserName(decoded.name);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

  return (
    <aside className="sticky top-0 h-screen w-[220px] bg-white shadow-md border-r px-6 py-8 text-gray-800 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-10 text-red-600 tracking-tight">
          FoodSpot
        </h1>
        <nav className="flex flex-col gap-4">
          {sideBarElements.map((element, index) => {
            const path = `/admin/${element.toLowerCase()}`;
            const isActive = pathname === path;

            return (
              <button
                key={index}
                onClick={() => router.push(path)}
                className={`text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-lg ${
                  isActive
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {element}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="relative mt-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600"
        >
          <CircleUser size={24} />
          {userName || "Admin"}
        </button>

        {dropdownOpen && (
          <div className="absolute bottom-10 left-0 bg-gray-100 rounded shadow px-4 py-2 text-red-600 font-semibold text-sm cursor-pointer hover:bg-gray-200">
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBarAdmin;
