"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const MenuItemsPage = () => {
  const fetchMenuItems = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu-items`
    );
    return data.menuItems || [];
  };

  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
  });

  if (isLoading) return <div className="p-4">Loading menu items...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error fetching menu items.</div>;

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Menu Items</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Restaurant</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item: any) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{item.id}</td>
                <td className="px-4 py-3">
                  {item.imageUrl ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.imageUrl}`}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                <td className="px-4 py-3 text-sm">{item.description}</td>
                <td className="px-4 py-3 text-sm">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">
                  {item.restaurant?.name || "Unknown"}
                </td>
              </tr>
            ))}
            {menuItems.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuItemsPage;
