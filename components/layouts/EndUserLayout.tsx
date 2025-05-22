import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Notification from "../general/Notification";

const EndUserLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col">
      <Notification />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default EndUserLayout;
