"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SideBarAdmin = () => {
  const sideBarElements = ["Users", "Restaurants", "MenuItems", "Comments"];
  const router = useRouter();
  return (
    <div className="flex flex-col px-4 mt-4 gap-6 sticky min-w-[200px] text-2xl font-semibold">
      <h1>FootPot</h1>
      <div className="flex flex-col gap-2">
        {sideBarElements.map((element, index) => (
          <span
            className="cursor-pointer"
            onClick={() => router.push(`/admin/${element.toLowerCase()}`)}
            key={index}
          >
            {element}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideBarAdmin;
