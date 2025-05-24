"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ContactsPage = () => {
  const fetchContacts = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts`
    );
    return data.contacts || [];
  };

  const {
    data: contacts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  if (isLoading) return <div className="p-4">Loading contacts...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error fetching contacts.</div>;

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Contact Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: any) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{contact.id}</td>
                <td className="px-4 py-3 text-sm">{contact.name}</td>
                <td className="px-4 py-3 text-sm">{contact.email}</td>
                <td className="px-4 py-3 text-sm">{contact.subject}</td>
                <td className="px-4 py-3 text-sm max-w-sm truncate">
                  {contact.message}
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;
