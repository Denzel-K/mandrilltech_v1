"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaFolder, FaEnvelope, FaArrowLeft, FaSignOutAlt, FaBox, FaBell } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/admin/login");
    } else if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  // Add a safety check for authentication
  if (status === "loading" || status !== "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const fetchStats = async () => {
    try {
      // Fetch projects count
      const projectsResponse = await fetch("/api/projects");
      const projects = projectsResponse.ok ? await projectsResponse.json() : [];

      // Fetch messages
      let messages = [];
      try {
        const messagesResponse = await fetch("/api/messages");
        if (messagesResponse.ok) {
          messages = await messagesResponse.json();
        }
      } catch (msgError) {
        console.error("Error fetching messages:", msgError);
      }

      setStats({
        totalProjects: projects.length,
        totalMessages: messages.length,
        unreadMessages: messages.filter(msg => !msg.read).length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({
        totalProjects: 0,
        totalMessages: 0,
        unreadMessages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen glass fixed left-0 top-0 p-6">
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-full">
              <GiMonkey className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-full">
              Admin Panel
            </span>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 text-primary"
            >
              <FaHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <FaFolder className="h-5 w-5" />
              <span>Projects</span>
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
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
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="w-full mt-2 flex items-center space-x-2 p-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name}</h1>
            <p className="text-foreground/70">
              Manage your projects and messages from this dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Total Projects</h2>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaFolder className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stats.totalProjects}</div>
              <Link
                href="/admin/projects"
                className="text-primary text-sm flex items-center mt-4"
              >
                <span>Manage Projects</span>
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
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Total Messages</h2>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FaEnvelope className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stats.totalMessages}</div>
              <Link
                href="/admin/messages"
                className="text-secondary text-sm flex items-center mt-4"
              >
                <span>View Messages</span>
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
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Unread Messages</h2>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <FaBell className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stats.unreadMessages}</div>
              <Link
                href="/admin/messages"
                className="text-accent text-sm flex items-center mt-4"
              >
                <span>Check Unread</span>
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

          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/projects/new"
                className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex items-center"
              >
                <FaBox className="h-6 w-6 mr-3 text-primary" />
                <span>Add New Project</span>
              </Link>
              <Link
                href="/admin/messages"
                className="p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors flex items-center"
              >
                <FaEnvelope className="h-6 w-6 mr-3 text-secondary" />
                <span>Check Messages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
