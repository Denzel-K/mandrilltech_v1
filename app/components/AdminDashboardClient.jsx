"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFolder, FaEnvelope, FaBox, FaBell } from "react-icons/fa";
import AdminLayout from "./admin/AdminLayout";

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
    <AdminLayout unreadMessages={stats.unreadMessages}>
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
      </AdminLayout>
  );
}
