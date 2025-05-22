"use client";

import React, { useState } from "react";
import ResturantCart from "./RestaurantRail";
import products from "../assets/assets";

const ITEMS_PER_PAGE = 4;

const AllResturant = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="my-12">
      <div className="container">
        <div className="main-title">
          <h2 className="title text-2xl font-bold mb-6 text-gray-800">
            All Restaurants
          </h2>
        </div>

        <ResturantCart restaurants={currentItems} />

        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-[#f59e0c] hover:text-white disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-[#f59e0c] text-white"
                  : "bg-gray-100 hover:bg-[#f59e0c] hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-[#f59e0c] hover:text-white disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllResturant;
