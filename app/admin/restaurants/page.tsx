"use client";

import BigSpinner from "@/components/BigSpinner";
import DeleteModal from "@/components/DeleteModal";
import { showNotification } from "@/redux/NotificationSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const RestaurantPage = () => {
  const [restaurantId, setRestaurantId] = useState<number>();
  const [isModelOpen, setisModelOpen] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient()

  const fetchRestaurants = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
    );
    return data.restaurants || [];
  };

  const handleDeleteSelect = (id: number) => {
    setRestaurantId(id);
    setisModelOpen(true);
  };

  const handleDeleteRestaurant = async() => {
    try{
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants/${restaurantId}`
        )
        queryClient.invalidateQueries({queryKey:["restaurants"]})
        dispatch(
          showNotification({
            message: "Deletion Succesfull",
            type : "success"
          })
        )
        setisModelOpen(false)
    }catch(e){
console.log(e)
    }
  };
  const router = useRouter()

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  if (isLoading) return <BigSpinner/>;
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
                <td className="px-4 py-3">{res.user?.name || "Unknown"}</td>
                <td className="px-4 py-3">
                  {new Date(res.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex flex-col gap-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/restaurants/${res.id}/edit`)
                    }
                    className="text-blue-600 border rounded-lg px-2 py-1 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 hover:underline text-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSelect(res.id)}
                    className="text-red-600 border rounded-lg px-2 py-1 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 hover:underline text-lg"
                  >
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
        {isModelOpen && (
          <DeleteModal
            isOpen={isModelOpen}
            onClose={() => setisModelOpen(false)}
            onConfirm={() => handleDeleteRestaurant()}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
