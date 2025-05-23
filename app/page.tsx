"use client"
import React from "react";
import TopRated from "@/components/TopRated";
import Banner from "@/components/Banner";
import FeaturedCuisines from "@/components/FeaturedCuisines";
import AllRestaurant from "@/components/AllRestaurant";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RestaurantProps } from "../components/RestaurantCard";

const page = () => {
  const fetchRestaurants = async () => {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
    );console.log(data.restaurants)
    return data.restaurants || [];
  };
  const { data: restaurants } = useQuery<RestaurantProps[]>({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
  return (
    <main>
      <Banner />
      {restaurants && <TopRated restaurants={restaurants} />}
      {restaurants && <FeaturedCuisines restaurants={restaurants} />}
      {restaurants && <AllRestaurant restaurants={restaurants} />}

    </main>

  );
};

export default page;
