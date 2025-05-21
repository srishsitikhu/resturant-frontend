import React from 'react';
import ResturantCart from './ResturantCart';
import products from '../assets/assets';

const Top_rated = () => {
    const topRatedRestaurants = [...products]
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 5);

    return (
        <section className="my-12">
            <div className="container">
                <div className="main-title">
                    <h2 className="title text-2xl font-bold mb-6 text-gray-800">Top Rated Restaurants</h2>
                </div>

                <ResturantCart restaurants={topRatedRestaurants} />
            </div>
        </section>
    );
};

export default Top_rated;
