"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  name: string;
}
interface SideBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({isOpen,onClose}) => {
  const [modelOpen, setModelOpen] = useState(false);

  const pathname = usePathname();
  const [token, setToken] = useState(false);
  const isActive = (path: string) =>
    pathname === path ? "text-[#d97708]" : "";
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(true);
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        setUserName(decoded.name);
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
  const router = useRouter();

  if (!isOpen) {return null; }

  return (
    <div className="flex flex-col justify-between bg-opacity-70 rounded-lg bg-white h-full p-4 w-64 z-50">
      <ul>
        <li
          className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
            "/"
          )}`}
          onClick={() => {
            router.push("/");
            onClose?.();
          }}
        >
          Home
        </li>
        <li
          className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
            "/about"
          )}`}
          onClick={() => {
            router.push("/about");
            onClose?.();
          }}
        >
          About
        </li>
        <li
          className={`hover:text-[#d97708] transition-all duration-300 ease-in-out ${isActive(
            "/contact"
          )}`}
          onClick={() => {
            router.push("/contact");
            onClose?.();
          }}
        >
          Contact
        </li>
      </ul>
      <ul className="flex whitespace-nowrap truncate gap-2 text-base">
        {!token ? (
          <>
            <li
              className={`hover:text-[#d97708] cursor-pointer transition-all duration-300 ease-in-out ${isActive(
              "/auth/login"
              )}`}
              onClick={() => {
              router.push("/auth/login");
              onClose?.();
              }}
            >
              Sign In
            </li>
            <li
              className={`hover:text-[#d97708] cursor-pointer transition-all duration-300 ease-in-out ${isActive(
              "/auth/register"
              )}`}
              onClick={() => {
              router.push("/auth/register");
              onClose?.();
              }}
            >
              Sign Up
            </li>
          </>
        ) : (
          <>
            <div className="laptop:flex gap-2 items-center">
              <li
                className={`hover:text-[#d97708] cursor-pointer transition-all duration-300 ease-in-out ${isActive(
                  "/restaurants/add"
                )}`}
                onClick={() => {
                  router.push("/restaurants/add");
                  onClose?.();
                }}
              >
                Add Restaurant
              </li>

              <div
                onClick={() => {
                  setModelOpen(!modelOpen);

                  
                }}
                className="w-10 h-10 cursor-pointer relative bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-[12px] laptop:text-sm"
              >
                {userName?.[0]?.toUpperCase() || "?"}
                {modelOpen && (
                  <div className="absolute cursor-pointer z-50 top-1 left-12 laptop:top-12 laptop:left-0 laptop:right-0 bg-gray-100 font-semibold text-[#d97708] rounded-lg px-2 py-1 laptop:px-6 laptop:py-2 flex items-center justify-center">
                    <div
                      onClick={() => {
                        handleLogout();
                        onClose?.();
                      }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideBar
