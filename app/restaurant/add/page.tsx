"use client"
import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

interface OpeningHour {
  days: string;
  time: string;
}

interface MenuItem {
  name: string;
  price: string;
  category: string;
  description: string;
}

const AddPage: React.FC = () => {
  const [hours, setHours] = useState<OpeningHour[]>([{ days: "", time: "" }]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "", price: "", category: "", description: "" },
  ]);

  const addHour = () => {
    setHours([...hours, { days: "", time: "" }]);
  };

  const removeHour = (index: number) => {
    setHours(hours.filter((_, i) => i !== index));
  };

  const handleHourChange = (
    index: number,
    field: keyof OpeningHour,
    value: string
  ) => {
    const updated = [...hours];
    updated[index][field] = value;
    setHours(updated);
  };

  const addItem = () => {
    setMenuItems([
      ...menuItems,
      { name: "", price: "", category: "", description: "" },
    ]);
  };

  const removeItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof MenuItem,
    value: string
  ) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">Add New Restaurant</h1>

        <form className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Restaurant Name
                </label>
                <input type="text" className="input-style" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input type="text" className="input-style" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea rows={4} className="input-style w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cuisine Type
                </label>
                <select className="input-style w-full">
                  <option value="">Select Cuisine Type</option>
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="nepali">Nepali</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Restaurant Image
                </label>
                <input type="file" className="mt-2 w-full" />
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Opening Hours
            </h2>
            <button
              type="button"
              onClick={addHour}
              className="text-blue-600 flex items-center"
            >
              <PlusCircle className="mr-1" size={18} /> Add Hours
            </button>
          </div>
          {hours.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            >
              <input
                type="text"
                placeholder="e.g., Monday - Friday"
                className="input-style"
                value={entry.days}
                onChange={(e) =>
                  handleHourChange(index, "days", e.target.value)
                }
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g., 9:00 AM - 10:00 PM"
                  className="input-style"
                  value={entry.time}
                  onChange={(e) =>
                    handleHourChange(index, "time", e.target.value)
                  }
                />
                {hours.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHour(index)}
                    className="text-red-500"
                  >
                    <MinusCircle size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Menu Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="text-blue-600 flex items-center"
            >
              <PlusCircle className="mr-1" size={18} /> Add Item
            </button>
          </div>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="space-y-3 border p-4 rounded-xl bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="e.g., Caesar Salad"
                  className="input-style"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  className="input-style"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="e.g., Appetizers"
                  className="input-style"
                  value={item.category}
                  onChange={(e) =>
                    handleItemChange(index, "category", e.target.value)
                  }
                />
                <div className="flex justify-between items-center">
                  <textarea
                    rows={2}
                    placeholder="Brief description of the item"
                    className="input-style w-full"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                  {menuItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="ml-3 text-red-500"
                    >
                      <MinusCircle size={18} />{" "}
                      <span className="ml-1">Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
