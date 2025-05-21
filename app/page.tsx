import React from "react";
import ResturantCart from "../components/RestaurantRail";
import Top_rated from "@/components/Top_rated";
import Banner from "@/components/Banner";
import All_restudent from "@/components/AllResturant";
import Featured_Cuisines from "@/components/Featured_Cuisines";

const page = () => {
  return (
    <main>
      <Banner />
      <Top_rated />
      <Featured_Cuisines />
      <All_restudent />
    </main>

    // <div className="my-15">
    //     <div>
    //         <h1 className="heading-client">Top Resturants</h1>
    //         <ResturantCart restaurants={populars} />
    //     </div>
    //     <div>
    //         <h1 className="heading-client">Featured Cuisines</h1>
    //         <div>{(populars.caterory)}
    //             <ResturantCart restaurants={populars} />
    //         </div>
    //     </div>
    // </div>
  );
};

export default page;
