"use client";

import BigSpinner from "@/components/BigSpinner";
import DeleteModal from "@/components/DeleteModal";
import { showNotification } from "@/redux/NotificationSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`
    );
    return data.users || [];
  };

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${selectedUserId}`
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });
      dispatch(
        showNotification({
          message: "User deleted successfully",
          type: "success",
        })
      );
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <BigSpinner />;
  if (isError)
    return <div className="p-4 text-red-500">Error fetching users.</div>;

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">User Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Updated At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-600 border rounded-lg px-2 py-1 hover:scale-105 hover:underline transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteUser}
          title="Delete User?"
          description="Are you sure you want to delete this user? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default UserPage;
