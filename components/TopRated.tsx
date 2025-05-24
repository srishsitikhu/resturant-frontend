"use client"
import React from "react";
import RestaurantRail from "./RestaurantRail";
import {AllRestaurantProps } from "./RestaurantCard";

const TopRated: React.FC<AllRestaurantProps> = ({ restaurants }) => {
  const topRatedRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="my-12">
      <div className="container">
        <div className="main-title">
          <h2 className="title text-2xl font-bold mb-6 text-gray-800">
            Top Rated Restaurants
          </h2>
        </div>

        <RestaurantRail restaurants={topRatedRestaurants} />
      </div>
    </section>
  );
};

export default TopRated;
