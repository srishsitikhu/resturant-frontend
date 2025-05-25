"use client";

import React from "react";
import RestaurantCard, { RestaurantProps } from "./RestaurantCard";

type Props = {
  restaurants: RestaurantProps[];
};

const RestaurantRail: React.FC<Props> = ({ restaurants }) => {
  return (
    <div className="laptop:grid flex flex-col gap-4 laptop:grid-cols-4 laptop:gap-6">
      {restaurants?.map((resto, index) => (
        <RestaurantCard key={index} resto={resto} />
      ))}
    </div>
  );
};

export default RestaurantRail;
