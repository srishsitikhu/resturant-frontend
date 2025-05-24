"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { IoIosCall } from "react-icons/io";
import {
  IoLocationOutline,
  IoMailOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/NotificationSlice";
import { useRouter } from "next/navigation";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contactpage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      // You can change this URL to your backend API endpoint
      const response = await axios.post(
        ` ${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts`,
        data
      );

dispatch(
        showNotification({
          message: "Contact Delivered Successfully",
          type: "success",
        })
      );
      router.push("/")
      reset();
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="my-10 max-w-[80%] m-auto">
      <div className="container flex flex-col items-center gap-6">
        <div className="flex flex-col items-center px-4 py-2 gap-4">
          <h1 className="main-heading">Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us!</p>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-[30px]">
          {/* Contact Details */}
          <div className="row-span-2 col-span-1 shadow-xl py-3 px-6 flex flex-col gap-4">
            <h2 className="sub-heading">Get in Touch</h2>

            <div className="flex items-start gap-2">
              <IoLocationOutline size={20} />
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p>123 Food Street</p>
                <p>Culinary District</p>
                <p>CA 94103</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <IoIosCall size={20} />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <IoMailOutline size={20} />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p>FoodSpot@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <IoTimeOutline size={20} />
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="row-span-1 col-span-1 row-start-3 shadow-xl py-3 px-6 flex flex-col gap-4">
            <h1 className="sub-heading">Quick Help</h1>
            <p>
              Find quick answers to frequently asked questions about our
              services.
            </p>
            <button className="border hover:scale-105 transition-all ease-in-out duration-300 px-4 py-2 cursor-pointer w-fit">
              Visit FAQ Page
            </button>
          </div>

          {/* Contact Form */}
          <div className="row-span-3 col-start-2 shadow-xl py-3 px-6 flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              <h2 className="sub-heading">Send Us a Message</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  className={`border rounded-sm px-2 py-1 ${
                    errors.name ? "border-red-500" : "border-neutral-300"
                  }`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className={`border rounded-sm px-2 py-1 ${
                    errors.email ? "border-red-500" : "border-neutral-300"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className={`border rounded-sm px-2 py-1 ${
                    errors.subject ? "border-red-500" : "border-neutral-300"
                  }`}
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className={`border px-2 py-1 ${
                    errors.message ? "border-red-500" : "border-neutral-300"
                  }`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message should be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#d97708] hover:scale-105 transition-all ease-in-out duration-300 text-neutral-100 py-2 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send a Message"}
              </button>

              {isSubmitSuccessful && (
                <p className="text-green-600 mt-2">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;
