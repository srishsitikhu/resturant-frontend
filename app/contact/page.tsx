import React from "react";
import { IoIosCall } from "react-icons/io";
import {
  IoLocationOutline,
  IoMailOutline,
  IoTimeOutline,
} from "react-icons/io5";

const Contactpage = () => {
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
            <button className="border px-4 py-2 cursor-pointer w-fit">
              Visit FAQ Page
            </button>
          </div>

          {/* Contact Form */}
          <div className="row-span-3 col-start-2 shadow-xl py-3 px-6 flex flex-col gap-4">
            <form className="flex flex-col gap-2">
              <h2 className="sub-heading">Send Us a Message</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Your Name</label>
                <input
                  className="border border-neutral-300 rounded-sm px-2 py-1"
                  type="text"
                  id="name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <input
                  className="border border-neutral-300 rounded-sm px-2 py-1"
                  type="email"
                  id="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject">Subject</label>
                <input
                  className="border border-neutral-300 rounded-sm px-2 py-1"
                  type="text"
                  id="subject"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <textarea
                  className="border border-neutral-300 px-2 py-1"
                  rows={5}
                  id="message"
                />
              </div>

              <button
                type="submit"
                className="bg-[#d97708] text-neutral-100 py-2 rounded-sm cursor-pointer"
              >
                Send a Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;
