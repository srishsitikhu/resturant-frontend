"use client";

import React from "react";
import RestaurantCard, { RestaurantProps } from "./RestaurantCart";

type Props = {
  restaurants: RestaurantProps[];
};

const RestaurantRail: React.FC<Props> = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-2 gap-2 laptop:grid-cols-4 laptop:gap-6">
      {restaurants.map((resto, index) => (
        <RestaurantCard key={index} resto={resto} />
      ))}
    </div>
  );
};

export default RestaurantRail;
