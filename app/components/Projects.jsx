"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMonitor, FiSmartphone, FiLayers, FiGrid } from "react-icons/fi";
import { FaDesktop } from "react-icons/fa";
import styles from "./Projects.module.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          // Handle any error gracefully by showing empty projects
          console.log("Could not fetch projects, using empty projects array");
          setProjects([]);
        } else {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        // Always set loading to false
        setLoading(false);
      }
    };

    // Set a timeout to ensure loading state is shown for at least a moment
    const timer = setTimeout(() => {
      fetchProjects();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "All", label: "All", icon: <FiGrid className="mr-2" /> },
    { id: "Web", label: "Web", icon: <FiMonitor className="mr-2" /> },
    { id: "Mobile", label: "Mobile", icon: <FiSmartphone className="mr-2" /> },
    { id: "Desktop", label: "Desktop", icon: <FaDesktop className="mr-2" /> },
    { id: "Other", label: "Other", icon: <FiLayers className="mr-2" /> }
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="projects" className="py-20 relative">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-primary/10 rounded-full filter blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore my latest work and see how I bring ideas to life through
            code and design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all flex items-center ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "glass border border-white/10 hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>Error: {error}</p>
            <p>Please try again later.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass rounded-xl"
          >
            <h3 className="text-2xl font-semibold mb-2">No Projects Yet</h3>
            <p className="text-foreground/70">
              Projects will be added soon. Check back later!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className={styles.projectsContainer}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1]
            }}
          >
            {/* Depth effect elements */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>

            <div className={styles.projectsInner}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 40px -15px rgba(58,134,255,0.4)",
        y: -5,
        zIndex: 10
      }}
      className="glass rounded-xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 relative group h-full flex flex-col"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Futuristic corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>

      {/* Depth shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10 group-hover:translate-y-4"></div>

      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 text-xs rounded-full glass backdrop-blur-md border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-foreground/85 text-xs mb-4 line-clamp-3 leading-relaxed flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full glass border border-white/10 backdrop-blur-sm group-hover:border-primary/20 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-2 border-t border-white/10 mt-auto">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-secondary transition-colors flex items-center"
            >
              <span>Live Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-primary transition-colors flex items-center"
            >
              <span>GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
