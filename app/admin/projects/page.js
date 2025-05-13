"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { FaHome, FaFolder, FaEnvelope, FaArrowLeft, FaSignOutAlt, FaEdit, FaTrash, FaPlus, FaStar } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filter, setFilter] = useState("all"); // all, featured, web, mobile, desktop, other

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/projects?id=${projectToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p._id !== projectToDelete._id));
        setDeleteModalOpen(false);
        setProjectToDelete(null);
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: project._id,
          featured: !project.featured,
        }),
      });

      if (response.ok) {
        setProjects(
          projects.map((p) =>
            p._id === project._id ? { ...p, featured: !p.featured } : p
          )
        );
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "featured") return project.featured;
    if (filter === "web") return project.category === "Web";
    if (filter === "mobile") return project.category === "Mobile";
    if (filter === "desktop") return project.category === "Desktop";
    if (filter === "other") return project.category === "Other";
    return true; // "all" filter
  });

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
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => document.getElementById('admin-sidebar').classList.remove('translate-x-0')}
            >
              <FaHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 text-primary"
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Projects</h1>
              <p className="text-foreground/70">
                Manage your portfolio projects
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Project
            </Link>
          </div>

          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-primary/10 hover:bg-primary/20"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "featured"
                  ? "bg-secondary text-white"
                  : "bg-secondary/10 hover:bg-secondary/20"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "web"
                  ? "bg-accent text-white"
                  : "bg-accent/10 hover:bg-accent/20"
              }`}
            >
              Web
            </button>
            <button
              onClick={() => setFilter("mobile")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "mobile"
                  ? "bg-accent text-white"
                  : "bg-accent/10 hover:bg-accent/20"
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => setFilter("desktop")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "desktop"
                  ? "bg-accent text-white"
                  : "bg-accent/10 hover:bg-accent/20"
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setFilter("other")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "other"
                  ? "bg-accent text-white"
                  : "bg-accent/10 hover:bg-accent/20"
              }`}
            >
              Other
            </button>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <FaFolder className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <h2 className="text-xl font-semibold mb-2">No projects found</h2>
              <p className="text-foreground/70 mb-6">
                {filter === "all"
                  ? "You haven't added any projects yet."
                  : `No ${filter} projects found.`}
              </p>
              <Link
                href="/admin/projects/new"
                className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                <FaPlus className="mr-2" /> Add Your First Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          project.featured
                            ? "bg-secondary text-white"
                            : "bg-background/80 text-foreground/70 hover:bg-background"
                        }`}
                        title={project.featured ? "Unmark as featured" : "Mark as featured"}
                      >
                        <FaStar className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/80 text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-background/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-background/50">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground/50">
                        {format(new Date(project.createdAt), "MMM d, yyyy")}
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/projects/edit/${project._id}`}
                          className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary"
                        >
                          <FaEdit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(project)}
                          className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-500"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete &quot;{projectToDelete?.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setProjectToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-70 flex items-center"
              >
                {deleting ? (
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
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="mr-2 h-4 w-4" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
