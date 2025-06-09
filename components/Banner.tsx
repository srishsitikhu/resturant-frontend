import React, { useState, useRef, useEffect } from "react";
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
  const searchRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  useEffect(()=>{
    router.prefetch("/restaurants/search");
    router.prefetch("/restaurants");
  },[])
  const handleSearch = () =>{
    setIsLoading(true);
    router.push(
      `/restaurants/search?search=${search}&cuisineType=${cuisineType}&location=${location}`
    );

  }

  const fetchRestaurants = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
    );
    return data.restaurants || [];
  };

  const { data: restaurants } = useQuery<RestaurantProps[]>({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  const filterRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsModelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="pt-20">
      <div className="container">
        <div className="relative mb-12">
          <div className="bg-amber-600 text-white laptop:py-16 py-4 rounded-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Find the Perfect Restaurant
              </h1>
              <p className="text-lg mb-8">
                Discover amazing dining experiences in your area
              </p>
              <form className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  {/* Search input */}
                  <div className="w-full relative" ref={searchRef}>
                    <input
                      className="pl-4 block px-4 py-2 bg-white text-black border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 text-sm w-full"
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setIsModelOpen(true);
                      }}
                      placeholder="Search restaurants..."
                      value={search}
                    />
                    {/* Suggestions dropdown */}
                    {isModelOpen && (
                      <div className="absolute top-full left-0 mt-2 max-h-60 overflow-y-auto flex flex-col gap-1 text-sm bg-white text-black w-full border border-amber-500 rounded-md shadow-lg z-50">
                        {filterRestaurants?.length ? (
                          filterRestaurants.map((filtered, index) => (
                            <span
                              key={index}
                              onClick={() => {
                                setSearch(filtered.name);
                                setIsModelOpen(false);
                              }}
                              className="cursor-pointer px-4 py-2 hover:bg-amber-100"
                            >
                              {filtered.name}
                            </span>
                          ))
                        ) : (
                          <span className="px-4 py-2 text-gray-500">
                            No results found
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Cuisine type dropdown */}
                  <div className="w-[200px]">
                    <select
                      className="block px-4 py-2 bg-white text-black border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm w-full"
                      onChange={(e) => setCuisineType(e.target.value)}
                    >
                      <option value="">All Cuisines</option>
                      {cuisineTypes.map((cuisineType, index) => (
                        <option key={index} value={cuisineType}>
                          {cuisineType}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location input */}
                  <div className="w-full md:w-1/4">
                    <input
                      className="pl-4 block px-4 py-2 text-black bg-white border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 text-sm w-full"
                      placeholder="Location"
                      onChange={(e) => setlocation(e.target.value)}
                      value={location}
                    />
                  </div>

                  {/* Search button */}
                  <button
                    disabled={isLoading}
                    type="button"
                    className="inline-flex cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 text-base py-2 px-4 md:self-end"
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    {isLoading ? "Searching..." : "Search"}
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
