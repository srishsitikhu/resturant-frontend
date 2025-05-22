"use client";

import React from "react";
import ResturantCart from "./RestaurantRail";
import products from "../assets/assets";

const Featured_Cuisines = () => {
  // Get unique category categorys
  const uniquecategorys = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <section className="my-12">
      <div className="container">
        <div className="main-title">
          <h2 className="title text-2xl font-bold mb-6 text-gray-800">
            Based on Category Restaurants
          </h2>
        </div>

        {uniquecategorys.map((category) => {
          // Filter restaurants by current category
          const filteredRestaurants = products.filter(
            (product) => product.category === category
          );

          return (
            <div key={category} className="mb-10">
              <h3 className="text-xl font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ResturantCart restaurants={filteredRestaurants} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Featured_Cuisines;
