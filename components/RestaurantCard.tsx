"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import Rating from "./Rating";

export type RestaurantProps = {
  id: number;
  name: string;
  rating: number;
  cuisineType: string;
  description: string;
  address: string;
  hours: string[];
  imageUrl: string;
  viewCount: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};
export type AllRestaurantProps = {
  restaurants : RestaurantProps[];
}


const RestaurantCard: React.FC<{ resto: RestaurantProps }> = ({ resto }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/restaurants/${resto.id}`)}
      className="flex cursor-pointer flex-col shadow-xl rounded-lg overflow-hidden bg-white transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative h-[40px] laptop:h-[180px]">
        <img
          className="object-cover w-full h-full"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${resto.imageUrl}`}
          alt={resto.name}
        />
        <span className="absolute right-2 top-2 px-3 py-1 rounded-lg bg-[#f59e0c] text-white text-sm font-semibold">
          {resto.cuisineType}
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
        <div className="flex gap-2 text-sm text-gray-600 mb-1">
          <CiLocationOn className="mr-1" />
          {resto.address}
        </div>
        <div className="flex gap-2 text-sm text-gray-600">
          <CiTimer className="justify-start" />
          <div className="flex flex-col gap-1">
            {Array.isArray(resto.hours)&&resto.hours.map((hour, index) => (
              <div key={index}>{hour}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
