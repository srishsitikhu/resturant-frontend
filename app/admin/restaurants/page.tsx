"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const RestaurantPage = () => {
  const fetchRestaurants = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
    );
    return data.restaurants || [];
  };

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  if (isLoading) return <div className="p-4">Loading restaurants...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error fetching restaurants.</div>;

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Restaurant Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Cuisine</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Hours</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res: any) => (
              <tr key={res.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-3">{res.id}</td>
                <td className="px-4 py-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${res.imageUrl}`}
                    alt="Restaurant"
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{res.name}</td>
                <td className="px-4 py-3">{res.cuisineType}</td>
                <td className="px-4 py-3">{res.location}</td>
                <td className="px-4 py-3">
                  <ul className="text-xs">
                    {res.hours.map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3">{res.rating.toFixed(1)}</td>
                <td className="px-4 py-3">{res.viewCount}</td>
                <td className="px-4 py-3">{res.user?.name || "Unknown"}</td>
                <td className="px-4 py-3">
                  {new Date(res.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-blue-600 hover:underline text-xs">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {restaurants.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No restaurants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantPage;
