import React from "react";
import Notification from "../general/Notification";
import SideBarAdmin from "../sideBarAdmin";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex gap-2">
      <Notification />
      <SideBarAdmin />
      {children}
    </div>
  );
};

export default AdminLayout;
