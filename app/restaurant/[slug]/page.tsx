import React from "react";
import { notFound } from "next/navigation";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";
import Review from "../../../components/Review";
import MenuSection from "../../../components/MenuSection";
import products from "../../../assets/assets";

interface Props {
  params: { slug: string };
  searchParams: { id?: string };
}

const Page = ({ searchParams }: Props) => {
  const restro = {
    name: "Burger Joint",
    rating: 4.5,
    type: "popular",
    category: "American",
    country: "USA",
    description: "Gourmet burgers made with locally sourced ingredients.",
    address: "789 Oak St",
    hours: "11:00 AM – 11:00 PM",
    imageUrl:
      "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    viewCount: 1024,
  };

  return (
    <section className="pt-20 pb-10">
      <div className="container">
        <div className="content-wrap max-w-5xl mx-auto">
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={restro.imageUrl}
                alt={restro.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-amber-600 text-xs font-bold rounded">
                    {restro.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{restro.name}</h1>
                <div className="flex items-center">
                  <span className="ml-2">
                    {restro.rating} ({restro.viewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* About */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-700 mb-6">{restro.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-amber-500" />
                      <span>{restro.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdOutlinePhone className="text-amber-500" />
                      <Link
                        href="tel: (123) 456-7890"
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
                        www.example.com
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaRegClock className="text-amber-500" />
                      <div>
                        <p className="font-medium">Monday - Sunday</p>
                        <p className="text-gray-600">{restro.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                <MenuSection
                  title="Steaks"
                  items={[
                    {
                      name: "Ribeye Steak (12oz)",
                      desc: "Prime beef, aged 28 days",
                      price: "32.99",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <Review
              name="Michael Brown"
              date="Dec 15, 2023"
              rating={5}
              comment="Absolutely the best steak I’ve ever had! Great atmosphere too."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
