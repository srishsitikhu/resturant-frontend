"use client";

import React from "react";
import RestaurantRail from "./RestaurantRail";
import { AllRestaurantProps } from "./RestaurantCard";
import { cuisineTypes } from '../constantAndEnums';

const FeaturedCuisines: React.FC<AllRestaurantProps> = ({restaurants}) => {
  // Get unique category categorys
  const cuisineType = [
    ...new Set(restaurants?.map((restaurant) => restaurant.cuisineType)),
  ];

  return (
    <section className="my-12">
      <div className="container">
        <div className="main-title">
          <h2 className="title text-2xl font-bold mb-6 text-gray-800">
            Based on Category Restaurants
          </h2>
        </div>

        {cuisineTypes.map((cuisineType) => {
          // Filter restaurants by current category
          const filteredRestaurants = restaurants?.filter(
            (restaurant) => restaurant.cuisineType === cuisineType
          );
          if (!filteredRestaurants?.length) return null;
          return (
            <div key={cuisineType} className="mb-10">
              <h3 className="text-xl font-semibold mb-4 capitalize">
                {cuisineType}
              </h3>
              <RestaurantRail restaurants={filteredRestaurants} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCuisines;
