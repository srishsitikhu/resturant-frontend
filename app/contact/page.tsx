import React from "react";
import { IoIosCall } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const Contactpage = () => {
  return (
    <section className="my-10 max-w-[80%] m-auto">
      <div className="container flex flex-col items-center gap-6">
        <div className="flex flex-col items-center px-4 py-2 gap-4">
          <h1 className="main-heading">Contact US</h1>
          <p>We'd love to hear from you. Get in touch with us!</p>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-[30px]">
          <div className="row-span-2 col-span-1 shadow-xl py-3 px-6 flex flex-col gap-4">
            <h2 className="sub-heading">Get in Touch</h2>
            <div className="flex">
              <IoLocationOutline size={20} />
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p>123 Food Street</p>
                <p>culinary District</p>
                <p>CA 94103</p>
              </div>
            </div>
            <div className="flex">
              <IoIosCall size={20} />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>
            <div className="flex">
              <IoLocationOutline size={20} />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p>FoodSpot@gmail.com</p>
              </div>
            </div>
            <div className="flex">
              <IoLocationOutline size={20} />
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p>Monday - Friday : 9:00 AM - 6:00 PM</p>
                <p>Saturday : 10:00 AM - 4:00 PM</p>
                <p>Sunday : Closed</p>
              </div>
            </div>
          </div>
          <div className="row-span-1 col-span-1 row-start-3 shadow-xl py-3 px-6 flex flex-col gap-4">
            <h1 className="sub-heading">Quick Help</h1>
            <p>
              Find quick answers to frequently asked questions about out
              services.
            </p>
            <div><button className="border px-4 py-2 cursor-pointer">visit FAQ Page</button></div>
          </div>
          <div className="row-span-3 col-start-2 shadow-xl py-3 px-6 flex flex-col gap-4 ">
            <form className="flex flex-col gap-2">
              <h2 className="sub-heading">Send Us a Message</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Your Name</label>
                <input
                  className="border border-neutral-300 rounded-sm px-2 py-1"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Email Address</label>
                <input
                  className="border border-neutral-300 rounded-sm px-2 py-1"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Subject</label>
                <input
                  className="border border-neutral-300 rounded-sm px-2 py-1"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Message</label>
                <textarea
                  className="border border-neutral-300 px-2 py-1"
                  rows={5}
                  cols={45}
                />
              </div>
              <button className="bg-[#d97708] text-neutral-100 py-2 rounded-sm cursor-pointer">Send a Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;
