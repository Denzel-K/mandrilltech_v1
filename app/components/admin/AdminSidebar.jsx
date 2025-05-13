"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaHome, FaFolder, FaEnvelope, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = ({ unreadMessages = 0 }) => {
  const pathname = usePathname();

  // Function to close sidebar on mobile
  const closeSidebar = () => {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
      sidebar.classList.remove('translate-x-0');
    }

    // Toggle menu icons
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    if (menuIcon && closeIcon) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-30 w-full glass p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/icons/mandrill-vector.svg"
              alt="Mandrill Technologies Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-lg font-bold text-gradient-full">
            Admin Panel
          </span>
        </div>
        <button
          onClick={() => {
            const sidebar = document.getElementById('admin-sidebar');
            sidebar.classList.toggle('translate-x-0');
            const isOpen = sidebar.classList.contains('translate-x-0');
            document.getElementById('menu-icon').classList.toggle('hidden', isOpen);
            document.getElementById('close-icon').classList.toggle('hidden', !isOpen);
          }}
          className="p-2 rounded-lg hover:bg-primary/10"
        >
          <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div id="admin-sidebar" className="w-64 h-screen glass fixed left-0 top-0 p-6 z-40 -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image
              src="/icons/mandrill-vector.svg"
              alt="Mandrill Technologies Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold text-gradient-full">
            Admin Panel
          </span>
        </div>

        <nav className="space-y-2">
          <Link
            href="/admin"
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              pathname === "/admin"
                ? "bg-primary/10 text-primary"
                : "hover:bg-primary/10 transition-colors"
            }`}
            onClick={closeSidebar}
          >
            <FaHome className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/projects"
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              pathname.startsWith("/admin/projects")
                ? "bg-primary/10 text-primary"
                : "hover:bg-primary/10 transition-colors"
            }`}
            onClick={closeSidebar}
          >
            <FaFolder className="h-5 w-5" />
            <span>Projects</span>
          </Link>
          <Link
            href="/admin/messages"
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              pathname.startsWith("/admin/messages")
                ? "bg-primary/10 text-primary"
                : "hover:bg-primary/10 transition-colors"
            }`}
            onClick={closeSidebar}
          >
            <FaEnvelope className="h-5 w-5" />
            <span>Messages</span>
            {unreadMessages > 0 && (
              <span className="ml-auto bg-secondary text-white text-xs px-2 py-1 rounded-full">
                {unreadMessages}
              </span>
            )}
          </Link>
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <Link
            href="/"
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <FaArrowLeft className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
