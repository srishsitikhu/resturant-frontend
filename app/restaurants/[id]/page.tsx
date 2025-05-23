"use client"
import React from "react";
import { notFound, useParams } from "next/navigation";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";
import Review from "../../../components/Review";
import MenuSection from "../../../components/MenuSection";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RestaurantProps } from "@/components/RestaurantCard";


const Page = () => {
 
  const {id} = useParams()
  const fetchRestaurant = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants/${id}`
    );
    console.log(data.restaurant);
    return data.restaurant || null;
  };
  const { data: restaurant } = useQuery<RestaurantProps>({
    queryKey: ["restaurant",id],
    queryFn: fetchRestaurant,
  });

  return (
    <section className="pt-20 pb-10">
      <div className="container">
        <div className="content-wrap max-w-5xl mx-auto">
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${restaurant?.imageUrl}`}
                alt={restaurant?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-amber-600 text-xs font-bold rounded">
                    {restaurant?.cuisineType}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{restaurant?.name}</h1>
                <div className="flex items-center">
                  <span className="ml-2">
                    {restaurant?.rating} ({restaurant?.viewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* About */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-700 mb-6">
                    {restaurant?.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-amber-500" />
                      <span>{restaurant?.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdOutlinePhone className="text-amber-500" />
                      <Link
                        href="tel: (123) 456-7890"
                        target="_blank"
                        className="text-amber-600 hover:underline"
                      >
                        (123) 456-7890
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <AiOutlineGlobal className="text-amber-500" />
                      <Link
                        href="#"
                        target="_blank"
                        className="text-amber-600 hover:underline"
                      >
                        www.{restaurant?.name}.com
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <FaRegClock className="text-amber-500 mt-2" />
                      <div> 
                        <div className="flex flex-col gap-1">
                          {Array.isArray(restaurant?.hours) &&
                            restaurant?.hours.map((hour, index) => (
                              <div key={index}>{hour}</div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                <MenuSection
                  title="Steaks"
                  items={[
                    {
                      name: "Ribeye Steak (12oz)",
                      desc: "Prime beef, aged 28 days",
                      price: "32.99",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <Review
              name="Michael Brown"
              date="Dec 15, 2023"
              rating={5}
              comment="Absolutely the best steak I’ve ever had! Great atmosphere too."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
