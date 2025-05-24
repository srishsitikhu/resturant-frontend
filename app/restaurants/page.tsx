"use client"
import { RestaurantProps } from "@/components/RestaurantCard";
import RestaurantRail from "@/components/RestaurantRail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const SearchPage = () => {
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
  return (
    <div className="container py-20">
      <h1 className="heading pb-8">All Restaurants:</h1>
      {restaurants ? (
        <RestaurantRail restaurants={restaurants} />
      ) : (
        <div>No Restaurant Found</div>
      )}
    </div>
  );
};

export default SearchPage;
