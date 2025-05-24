"use client";
import React, { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";
import Review from "../../../components/Review";
import MenuSection from "../../../components/MenuSection";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { RestaurantProps } from "@/components/RestaurantCard";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/NotificationSlice";
import AddRating from "@/components/AddRating";

type TokenPayLoad = {
  userId: string;
  name : string
};

type CommentProps = {
  id: number;
  comment: string;
  userId: number;
  rating: number;
  restaurantId: number;
  user : {
    name: string
  }
};

const Page = () => {
  const [rating, setRating] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState(false);
  const [comment, setComment] = useState("");
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(true);
      try {
        const decoded = jwtDecode<TokenPayLoad>(storedToken);
        setUserId(decoded.userId);
        setName(decoded.name)
      } catch (e) {
        console.log(e);
      }
    }
  }, [pathname]);

  // ✅ Fetch Comments
  const fetchComments = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments?restaurantId=${id}`
    );
    return data.comments || [];
  };

  const { data: comments } = useQuery<CommentProps[]>({
    queryKey: ["comments", id],
    queryFn: fetchComments,
  });

  // ✅ Fetch Restaurant Details
  const fetchRestaurant = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants/${id}`
    );
    return data.restaurant || null;
  };

  const { data: restaurant } = useQuery<RestaurantProps>({
    queryKey: ["restaurant", id],
    queryFn: fetchRestaurant,
  });

  // ✅ Mutation to Add Comment
  const addCommentMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments`,
        {
          comment,
          userId: Number(userId),
          restaurantId: Number(id),
          rating,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setComment("");
      setRating(0);
      dispatch(
        showNotification({
          message: "Review added successfully!",
          type: "success",
        })
      );
    },
    onError: (error: any) => {
      console.error("Failed to add comment:", error);
      dispatch(
        showNotification({
          message: "Failed to add review",
          type: "error",
        })
      );
    },
  });

  return (
    <section className="pt-20 pb-10">
      <div className="container">
        <div className="content-wrap max-w-5xl mx-auto">
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            {/* Restaurant Image & Basic Info */}
            <div className="relative h-64 md:h-80">
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${restaurant?.imageUrl}`}
                alt={restaurant?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-amber-600 text-xs font-bold rounded">
                    {restaurant?.cuisineType}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{restaurant?.name}</h1>

                {/* Edit Button */}
                {token && Number(userId) === Number(restaurant?.userId) && (
                  <div className="mt-4">
                    <button
                      onClick={() => router.push(`/restaurants/${id}/edit`)}
                      className="bg-amber-600 cursor-pointer hover:scale-105  ease-in-out duration-300 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                    >
                      Edit
                    </button>
                  </div>
                )}

                <div className="flex items-center mt-2">
                  <span className="ml-2">
                    {restaurant?.rating} ({restaurant?.viewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* About + Contact + Hours */}
            <div className="p-6 content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* About */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-700 mb-6">
                    {restaurant?.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-amber-500" />
                      <span>{restaurant?.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdOutlinePhone className="text-amber-500" />
                      <Link
                        href="tel:(123) 456-7890"
                        target="_blank"
                        className="text-amber-600 hover:underline"
                      >
                        (123) 456-7890
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <AiOutlineGlobal className="text-amber-500" />
                      <Link
                        href="#"
                        target="_blank"
                        className="text-amber-600 hover:underline"
                      >
                        www.{restaurant?.name}.com
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <FaRegClock className="text-amber-500 mt-2" />
                      <div>
                        <div className="flex flex-col gap-1">
                          {Array.isArray(restaurant?.hours) &&
                            restaurant.hours.map((hour, index) => (
                              <div key={index}>{hour}</div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              {restaurant?.menuItems && (
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-semibold mb-4">Menu</h2>
                  <MenuSection items={restaurant.menuItems} />
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>

            {/* Review Input */}
            {token && (
              <div className="flex flex-col md:flex-row gap-4 px-4 mb-6">
                <input
                  className="w-full px-4 py-2 border-b focus:outline-none"
                  type="text"
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="mt-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Rating (1–5)
                  </label>
                  <AddRating
                    rating={rating}
                    onChange={(val) => setRating(val)}
                  />
                </div>
                <button
                  onClick={() => addCommentMutation.mutate()}
                  disabled={addCommentMutation.isPending || !comment.trim()}
                  className="whitespace-nowrap cursor-pointer hover:scale-105 ease-in-out duration-300 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addCommentMutation.isPending
                    ? "Submitting..."
                    : "Add Review"}
                </button>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {comments && comments.length > 0 ? (
                comments.map((item) => (
                  <Review
                    key={item.id}
                    name={`${item.user.name}`}
                    date={new Date().toLocaleDateString()}
                    rating={item.rating}
                    comment={item.comment}
                  />
                ))
              ) : (
                <p className="text-gray-500 px-4">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
