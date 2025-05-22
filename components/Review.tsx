import React from 'react';

interface ReviewProps {
    name: string;
    date: string;
    rating: number;
    comment: string;
}

const Review: React.FC<ReviewProps> = ({ name, date, rating, comment }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b border-gray-200 py-4 last:border-0">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{name}</h4>
                        <span className="ml-2 text-sm text-gray-500">{date}</span>
                    </div>
                    <div className="mt-1">
                        <div className="flex">
                            {Array.from({ length: rating }).map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-4 h-4 text-amber-500 fill-amber-500 mr-0.5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-2 text-gray-700">{comment}</p>
        </div>
    </div>
);

export default Review;
