"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaFolder, FaEnvelope, FaArrowLeft, FaSignOutAlt, FaBox, FaBell } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";
import Image from "next/image";

export default function AdminDashboardClient() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch projects count
      const projectsResponse = await fetch("/api/projects");
      const messagesResponse = await fetch("/api/messages");

      if (projectsResponse.ok && messagesResponse.ok) {
        const projects = await projectsResponse.json();
        const messages = await messagesResponse.json();

        setStats({
          totalProjects: projects.length,
          totalMessages: messages.length,
          unreadMessages: messages.filter(m => !m.read).length,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
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
              className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 text-primary"
              onClick={() => document.getElementById('admin-sidebar').classList.remove('translate-x-0')}
            >
              <FaHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => document.getElementById('admin-sidebar').classList.remove('translate-x-0')}
            >
              <FaFolder className="h-5 w-5" />
              <span>Projects</span>
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => document.getElementById('admin-sidebar').classList.remove('translate-x-0')}
            >
              <FaEnvelope className="h-5 w-5" />
              <span>Messages</span>
              {stats.unreadMessages > 0 && (
                <span className="ml-auto bg-secondary text-white text-xs px-2 py-1 rounded-full">
                  {stats.unreadMessages}
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
            <Link
              href="/"
              className="w-full mt-2 flex items-center space-x-2 p-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span>Exit Admin</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:ml-64 p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-foreground/70">
              Welcome to the Mandrill Technologies Admin Panel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Projects</h2>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaFolder className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{stats.totalProjects}</p>
              <p className="text-sm text-foreground/70">Total projects</p>
              <Link
                href="/admin/projects"
                className="mt-4 text-sm text-primary flex items-center"
              >
                View all projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Messages</h2>
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FaEnvelope className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{stats.totalMessages}</p>
              <p className="text-sm text-foreground/70">Total messages</p>
              <Link
                href="/admin/messages"
                className="mt-4 text-sm text-secondary flex items-center"
              >
                View all messages
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Unread Messages</h2>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <FaBell className="h-5 w-5 text-accent" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{stats.unreadMessages}</p>
              <p className="text-sm text-foreground/70">Awaiting response</p>
              <Link
                href="/admin/messages?filter=unread"
                className="mt-4 text-sm text-accent flex items-center"
              >
                View unread messages
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/projects/new"
                className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <FaBox className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Add New Project</h3>
                  <p className="text-sm text-foreground/70">
                    Create a new portfolio project
                  </p>
                </div>
              </Link>
              <Link
                href="/admin/messages"
                className="p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                  <FaEnvelope className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Check Messages</h3>
                  <p className="text-sm text-foreground/70">
                    View and respond to messages
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
