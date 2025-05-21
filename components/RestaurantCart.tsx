"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import Rating from "./Rating";

export interface RestaurantProps {
  name: string;
  imageUrl: string;
  category: string;
  rating: number;
  description: string;
  address: string;
  hours: string;
}

const RestaurantCard: React.FC<{ resto: RestaurantProps }> = ({ resto }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/resturant/${resto.name}`)}
      className="flex cursor-pointer flex-col shadow-xl rounded-lg overflow-hidden bg-white transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative h-[40px] laptop:h-[180px]">
        <img
          className="object-cover w-full h-full"
          src={resto.imageUrl}
          alt={resto.name}
        />
        <span className="absolute right-2 top-2 px-3 py-1 rounded-lg bg-[#f59e0c] text-white text-sm font-semibold">
          {resto.category}
        </span>
      </div>
      <div className="px-3 py-2">
        <h1 className="font-semibold text-lg">{resto.name}</h1>
        <div className="flex items-center text-sm mb-1">
          <Rating value={resto.rating} />
        </div>
        <p className="text-neutral-500 text-sm line-clamp-2 mb-2">
          {resto.description}
        </p>
        <p className="flex items-center text-sm text-gray-600 mb-1">
          <CiLocationOn className="mr-1" />
          {resto.address}
        </p>
        <p className="flex items-center text-sm text-gray-600">
          <CiTimer className="mr-1" />
          {resto.hours}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
