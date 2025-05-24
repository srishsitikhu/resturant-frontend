"use client";
import BigSpinner from "@/components/BigSpinner";
import RestaurantCard, { RestaurantProps } from "@/components/RestaurantCard";
import RestaurantRail from "@/components/RestaurantRail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const cuisineType = searchParams.get("cuisineType") || "";
  const location = searchParams.get("location") || "";
  const fetchRestaurants = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants?search=${search}&cuisineType=${cuisineType}&location=${location}`
    );
    console.log(data.restaurants);
    return data.restaurants || [];
  };
  const { data: restaurants,isLoading } = useQuery<RestaurantProps[]>({
    queryKey: ["restaurants", search, cuisineType, location],
    queryFn: fetchRestaurants,
  });
  if (isLoading) return <BigSpinner />;

  return (
    <div className="container py-20">
      <h1 className="heading pb-8">Search Results:</h1>
      {restaurants ? (
        <RestaurantRail restaurants={restaurants} />
      ) : (
        <div>No Search Results</div>
      )}
    </div>
  );
};

export default SearchPage;
