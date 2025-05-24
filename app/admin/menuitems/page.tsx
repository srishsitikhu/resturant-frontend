"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/NotificationSlice";

const MenuItemsPage = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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

  const handleDeleteSelect = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu-items/${selectedId}`
      );
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      dispatch(
        showNotification({
          message: "Menu item deleted successfully",
          type: "success",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        showNotification({
          message: "Failed to delete menu item",
          type: "error",
        })
      );
    } finally {
      setIsModalOpen(false);
    }
  };

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
              <th className="px-4 py-3">Actions</th>
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
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleDeleteSelect(item.id)}
                    className="text-red-600 border border-red-500 rounded-lg px-2 py-1 hover:bg-red-50 hover:scale-105 transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {menuItems.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
          <DeleteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default MenuItemsPage;
