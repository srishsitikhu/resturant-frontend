import React from "react";
import { CiForkAndKnife, CiTimer } from "react-icons/ci";
import { RiUserCommunityLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const Aboutpage = () => {
    return (
        <section className="mt-20 mb-10 max-w-[80%] m-auto">
            <div className="container flex flex-col items-center gap-6">
                <div className="flex flex-col items-center px-4 py-2 gap-4">
                    <h1 className="main-heading">About FoodSpot</h1>
                    <h2>Connecting food lovers with their next favorite restaurant</h2>
                </div>
                <div className="shadow-xl px-8 py-4 flex flex-col gap-4">
                    <h2 className="heading-client">Our Mission</h2>
                    <p className="description-heading-client">
                        At FoodSpot, we believe that every great meal tells a story. Our
                        mission is to help people discover exceptional dining experiences
                        and connect them with restaurants that share their passion for food.
                        We're building a community where food enthusiasts can explore,
                        share, and celebrate the diverse culinary landscape of our city.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="shadow-xl py-4 px-6 flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <CiForkAndKnife
                                size={50}
                                className="rounded-full bg-[#fef3c7] p-2 text-[#d97708]"
                            />
                            <h2 className="sub-heading">Cureted Selection</h2>
                        </div>
                        <p className="description-heading-client">
                            We carefully review and feature restaurants that meet our high
                            standards for quality, service, and authenticity.
                        </p>
                    </div>
                    <div className="shadow-xl py-3 px-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <VscWorkspaceTrusted
                                size={50}
                                className="rounded-full bg-[#fef3c7] p-2 text-[#d97708]"
                            />
                            <h2 className="sub-heading">Trusted Reviews</h2>
                        </div>
                        <p className="description-heading-client">
                            Real reviews from real diners help you make informed decisions
                            about where to eat next.
                        </p>
                    </div>
                    <div className="shadow-xl py-3 px-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <RiUserCommunityLine
                                size={50}
                                className="rounded-full bg-[#fef3c7] p-2 text-[#d97708]"
                            />
                            <h2 className="sub-heading">Community Driven</h2>
                        </div>
                        <p className="description-heading-client">
                            Join a community of food lovers sharing their experiences and
                            discoveries.
                        </p>
                    </div>
                    <div className="shadow-xl py-3 px-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <CiTimer
                                size={50}
                                className="rounded-full bg-[#fef3c7] p-2 text-[#d97708]"
                            />
                            <h2 className="sub-heading">Real-Time Updates</h2>
                        </div>
                        <p className="description-heading-client">
                            Stay informed with up-to-date information about restaurant hours,
                            menus, and special events.
                        </p>
                    </div>
                </div>
                <div className="shadow-xl py-3 px-6 flex flex-col gap-4">
                    <h2 className="sub-heading">Our Team</h2>
                    <p className="description-heading-client">
                        FoodSpot was founded by a team of food enthusiasts, tech innovators,
                        and industry experts who share a passion for great dining
                        experiences. We combine our love for food with cutting-edge
                        technology to create the best platform for restaurant discovery and
                        management.
                    </p>
                    <hr className="text-neutral-400" />
                    <p className="italic description-heading-client">
                        "We believe that every restaurant has a unique story to tell, and
                        we're here to help tell it."
                    </p>
                    <h3 className="font-semibold"> - The FoodSpot Team</h3>
                </div>
            </div>
        </section>
    );
};

export default Aboutpage;
