import React, { useState } from "react";
import { RestaurantProps } from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cuisineTypes } from "@/constantAndEnums";
import { useRouter } from "next/navigation";

const Banner = () => {
  const [search, setSearch] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [location, setlocation] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const router = useRouter();
  const fetchRestaurants = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
    );
    console.log(data.restaurants);
    return data.restaurants || [];
  };
  const { data: restaurants } = useQuery<RestaurantProps[]>({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  const filterRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.includes(search)
  );
  return (
    <section className="pt-20">
      <div className="container">
        <div className="relative mb-12">
          <div className="bg-amber-600 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Find the Perfect Restaurant
              </h1>
              <p className="text-lg mb-8">
                Discover amazing dining experiences in your area
              </p>
              <form className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="w-full">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-search h-5 w-5"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                      <div className="relative">
                        <input
                          className="pl-10 block px-4 py-2 bg-white text-black border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 text-sm w-full"
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setIsModelOpen(true);
                          }}
                          placeholder="Search restaurants..."
                          value={search}
                        />
                        {isModelOpen && (
                          <div className="absolute mt-4 flex flex-col gap-1 text-lg bg-neutral-100 text-neutral-900 w-full border-2 rounded-lg border-amber-500">
                            {filterRestaurants?.map((filtered, index) => (
                              <span
                                key={index}
                                onClick={() => {
                                  setSearch(filtered.name);
                                  setIsModelOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                {filtered.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[200px]">
                    <select className="block px-4 py-2 bg-white text-black border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm w-full">
                      <option value="">All Cuisines</option>
                      {cuisineTypes.map((cuisineType, index) => (
                        <option
                          key={index}
                          value={cuisineType}
                          onClick={() => setCuisineType(cuisineType)}
                        >
                          {cuisineType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/4">
                    <div className="relative rounded-md shadow-sm">
                      <input
                        className="pl-4 block px-4 py-2 text-black bg-white border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 text-sm w-full"
                        placeholder="location"
                        onChange={(e) => setlocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 text-base py-2 px-4  md:self-end"
                    onClick={() =>
                      router.push(
                        `/restaurants/search?search=${search}&cuisineType=${cuisineType}&location=${location}`
                      )
                    }
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
