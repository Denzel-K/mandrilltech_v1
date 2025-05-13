"use client";

import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children, unreadMessages = 0 }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <AdminSidebar unreadMessages={unreadMessages} />

        {/* Main Content */}
        <div className="w-full lg:ml-64 p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
