"use client";
import React, { useEffect, useState } from "react";
import { PlusCircle, MinusCircle, Upload, MenuIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { showNotification } from "@/redux/NotificationSlice";
import { cuisineTypes } from "@/constantAndEnums";
import { useQuery } from "@tanstack/react-query";
import { RestaurantProps } from "@/components/RestaurantCard";
import AddRating from "@/components/AddRating";
import Spinner from "@/components/BigSpinner";
import SmallSpinner from "@/components/SmallSpinner";

interface TokenPayload {
  userId: string;
}

interface MenuItem {
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
  imageFile: File | null;
}

const EditPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const [token, setToken] = useState(false);
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
  const {
    register,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(true);
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        console.log("decode", decoded.userId);
        setUserId(decoded.userId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [pathname]);

  const [hours, setHours] = useState<string[]>([""]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      name: "",
      price: "",
      category: "",
      description: "",
      imageUrl: "",
      imageFile: null,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`${serverUrl}/api/restaurants/${id}`);
        const data = res.data.restaurant;
        console.log(data);
        reset({
          name: data.name,
          location: data.location,
          description: data.description,
          cuisineType: data.cuisineType,
        });
        setHours(data.hours || [""]);
        setMenuItems(
          data?.menuItems?.map((item: any) => ({
            name: item.name ?? "",
            price: item.price ?? "",
            category: item.category ?? "",
            description: item.description ?? "",
            imageUrl: item.imageUrl ?? "",
            imageFile: null,
          }))
        );

        if (data.imageUrl) {
          const imageBlob = await fetch(`${serverUrl}${data.imageUrl}`).then(
            (r) => r.blob()
          );
          const file = new File([imageBlob], "restaurant.jpg", {
            type: imageBlob.type,
          });
          setImageFile(file);
        }
      } catch (err) {
        console.error("Error fetching restaurant data", err);
      }
    };

    fetchData();
  }, [id]);

  const addHour = () => {
    setHours([...hours, ""]);
  };

  const removeHour = (index: number) => {
    setHours(hours.filter((_, i) => i !== index));
  };

  const handleHourChange = (index: number, value: string) => {
    const updated = [...hours];
    updated[index] = value;
    setHours(updated);
  };

  const addItem = () => {
    setMenuItems([
      ...menuItems,
      {
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: "",
        imageFile: null,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof MenuItem,
    value: any
  ) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };

  const handleImageChange = (index: number, file: File) => {
    const updated = [...menuItems];
    updated[index].imageFile = file;
    setMenuItems(updated);
  };

  const uploadImage = async (index: number) => {
    const item = menuItems[index];
    if (!item.imageFile) return;

    const formData = new FormData();
    formData.append("file", item.imageFile);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data.file;
      console.log(res.data.file.path);

      const updated = [...menuItems];
      updated[index].imageUrl = data.path;
      setMenuItems(updated);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };
  const uploadRestaurantImage = async () => {
    if (!imageFile) {
      setError("image", { message: "Restaurant Image is Required" });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.file.path;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      if (hours.length == 0) {
        setError("hours", { message: "At least One hours must insert" });
        return;
      }
      const imageUrl = await uploadRestaurantImage();
      await Promise.all(menuItems.map((_, index) => uploadImage(index)));

      console.log(imageUrl);
      const reponse = await axios.patch(`${serverUrl}/api/restaurants/${id}`, {
        ...data,
        imageUrl: imageUrl,
        hours: hours,
        userId: Number(userId),
        menuItems: menuItems,
        rating: rating,
      });
      dispatch(
        showNotification({
          message: "Restaurant Updated Successfully",
          type: "success",
        })
      );
      reset();
      router.push(`/restaurant/${id}`);
      console.log(reponse);
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification({
          message: "Failed to update Restaurant",
          type: "error",
        })
      );
    }
  };
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">Edit Restaurant</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Basic Information
            </h2>
            <div className="flex flex-col laptop:flex-row justify-between gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Restaurant Name is Required",
                  })}
                  className="input-style"
                  id="name"
                />
                {errors.name && (
                  <span className="text-red-500 text-base">
                    {String(errors?.name?.message)}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  location *
                </label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Restaurant location is Required",
                  })}
                  className="input-style"
                  id="location"
                />
                {errors.location && (
                  <span className="text-red-500 text-base">
                    {String(errors?.location?.message)}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Restaurant Description is Required",
                })}
                rows={4}
                className="input-style w-full"
              />
              {errors.description && (
                <span className="text-red-500 text-base">
                  {String(errors?.description?.message)}
                </span>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Rating (1-5)
              </label>
              <AddRating rating={rating} onChange={(val) => setRating(val)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cuisine Type
                </label>
                <select
                  {...register("cuisineType", {
                    required: "Cuisine Type is Required",
                  })}
                  className="input-style w-full"
                >
                  <option value="">Select Cuisine Type</option>
                  {cuisineTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.cuisineType && (
                  <span className="text-red-500 text-base">
                    {String(errors?.cuisineType?.message)}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Restaurant Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="mt-2 w-full"
                />
                {imageFile && (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {errors.image && (
                  <span className="text-red-500 text-base">
                    {String(errors?.image?.message)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Opening Hours
              </h2>
              <button
                type="button"
                onClick={addHour}
                className="text-blue-600 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 flex items-center"
              >
                <PlusCircle className="mr-1" size={18} /> Add Hours
              </button>
            </div>
            {hours.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g., Monday to Friday 9-5"
                  className="input-style flex-1"
                  value={entry}
                  onChange={(e) => handleHourChange(index, e.target.value)}
                />
                {hours.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHour(index)}
                    className="text-red-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
                  >
                    <MinusCircle size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Menu Items
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="text-blue-600 flex items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
              >
                <PlusCircle className="mr-1" size={18} /> Add Item
              </button>
            </div>

            {menuItems?.map((item, index) => (
              <div
                key={index}
                className="space-y-3 border p-4 rounded-xl bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="itemName">Item Name </label>
                    <input
                      type="text"
                      placeholder="e.g., Caesar Salad"
                      className="input-style"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="itemName">Price</label>
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
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="itemName">Item Description </label>
                    <textarea
                      rows={2}
                      placeholder="Brief description"
                      className="input-style w-full"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="menuImage">Menu Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageChange(index, e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  {item.imageUrl && (
                    <img
                      src={
                        item.imageFile
                          ? URL.createObjectURL(item.imageFile)
                          : `${process.env.NEXT_PUBLIC_SERVER_URL}` +
                            item.imageUrl
                      }
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </div>

                {menuItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 flex items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
                  >
                    <MinusCircle size={18} />{" "}
                    <span className="ml-1">Remove</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 flex gap-4">
            <button
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg shadow cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
            >
              Update
            </button>
            {isSubmitting && <SmallSpinner />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
