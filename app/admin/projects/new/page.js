"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaFolder, FaEnvelope, FaArrowLeft, FaSignOutAlt, FaSave, FaTimes } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";

export default async function NewProjectPage() {
  const session = await auth();

  // Server-side redirect if not authenticated
  if (!session) {
    redirect("/admin/login");
  }

  return <NewProjectPageClient session={session} />;
}

// Client component
function NewProjectPageClient({ session }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    category: "Web",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  const [techInput, setTechInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTechKeyDown = (e) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData({
          ...formData,
          technologies: [...formData.technologies, techInput.trim()],
        });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/projects");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Loading state is handled in the parent component

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
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <FaHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 text-primary"
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
              <p className="text-foreground/70">
                Create a new project for your portfolio
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Projects
            </Link>
          </div>

          {success ? (
            <div className="glass rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Project Created Successfully!</h2>
              <p className="text-foreground/70 mb-6">
                Your new project has been added to your portfolio.
              </p>
              <p className="text-sm text-foreground/50">
                Redirecting to projects page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your project..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                  Technologies *
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/10 text-sm flex items-center"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="ml-2 text-foreground/50 hover:text-foreground"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type a technology and press Enter (e.g., React, Node.js)"
                />
                <p className="mt-1 text-xs text-foreground/50">
                  Press Enter to add each technology
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm">Feature this project on your portfolio</span>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Project
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
