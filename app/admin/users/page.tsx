"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const UserPage = () => {
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

  if (isLoading) return <div className="p-4">Loading users...</div>;
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
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{user.id}</td>
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
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3 text-sm">{user.phoneNumber || "-"}</td>
                <td className="px-4 py-3 text-sm capitalize">{user.role}</td>
                <td className="px-4 py-3 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(user.updatedAt).toLocaleDateString()}
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
    </div>
  );
};

export default UserPage;
