"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./expertise.css";

// Import icons - only using icons we know work
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub,
  FaDocker,
  FaDatabase,
  FaCode,
  FaMobile,
  FaDesktop,
  FaPaintBrush,
  FaServer,
  FaLaptopCode,
  FaCloud,
} from "react-icons/fa";

import {
  SiTypescript,
  SiNextdotjs,
  SiSocketdotio,
  SiEjs,
  SiHandlebarsdotjs,
  SiNestjs,
  SiElectron,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiJenkins,
  SiPrometheus,
  SiGrafana,
  SiGithubactions,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiExpress,
  SiFlutter,
  SiFirebase,
  SiGraphql,
  SiSass,
  SiRedux,
  SiVite,
  SiWebpack,
  SiJest,
  SiCypress,
  SiPostman,
  SiVisualstudiocode,
  SiGit,
  SiNpm,
  SiYarn,
  SiAdobexd,
  SiSketch,
  SiInvision,
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";

const ExpertiseNew = () => {
  const [activeCategory, setActiveCategory] = useState("web");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef(null);
  const slideInterval = useRef(null);

  // Define categories first
  const categories = [
    {
      id: "web",
      name: "Full Stack Web Development",
      icon: <FaLaptopCode />,
      description: "Building responsive, scalable web applications from frontend to backend with modern technologies and best practices.",
      skills: [
        // Frontend
        { name: "React.js", icon: <FaReact className="text-[#61DAFB]" />, category: "Frontend" },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" />, category: "Frontend" },
        { name: "Redux", icon: <SiRedux className="text-[#764ABC]" />, category: "Frontend" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" />, category: "Frontend" },
        { name: "HTML/CSS/JS", icon: <FaHtml5 className="text-[#E34F26]" />, category: "Frontend" },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, category: "Frontend" },

        // Backend
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, category: "Backend" },
        { name: "Express.js", icon: <SiExpress className="text-white" />, category: "Backend" },
        { name: "Nest.js", icon: <SiNestjs className="text-[#E0234E]" />, category: "Backend" },
        { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" />, category: "Backend" },
        { name: "REST APIs", icon: <FaServer className="text-[#FF6C37]" />, category: "Backend" },
        { name: "AWS", icon: <FaCloud className="text-[#FF9900]" />, category: "Backend" },
      ]
    },
    {
      id: "mobile",
      name: "Mobile App Development",
      icon: <FaMobile />,
      description: "Creating cross-platform mobile applications with native-like performance and seamless user experiences.",
      skills: [
        { name: "React Native", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
        { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
        { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
      ]
    },
    {
      id: "desktop",
      name: "Desktop App Development",
      icon: <FaDesktop />,
      description: "Developing cross-platform desktop applications with web technologies for Windows, macOS, and Linux.",
      skills: [
        { name: "Electron.js", icon: <SiElectron className="text-[#47848F]" /> },
        { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
      ]
    },
    {
      id: "design",
      name: "UI/UX Design",
      icon: <FaPaintBrush />,
      description: "Creating intuitive, accessible, and visually appealing user interfaces and experiences that delight users.",
      skills: [
        { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
        { name: "Adobe XD", icon: <SiAdobexd className="text-[#FF61F6]" /> },
        { name: "Sketch", icon: <SiSketch className="text-[#F7B500]" /> },
        { name: "Photoshop", icon: <SiAdobephotoshop className="text-[#31A8FF]" /> },
        { name: "Illustrator", icon: <SiAdobeillustrator className="text-[#FF9A00]" /> },
      ]
    },
    {
      id: "database",
      name: "Database Management",
      icon: <FaDatabase />,
      description: "Designing, implementing, and optimizing database solutions for efficient data storage and retrieval.",
      skills: [
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" />, category: "SQL" },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" />, category: "SQL" },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, category: "NoSQL" },
        { name: "Redis", icon: <SiRedis className="text-[#DC382D]" />, category: "NoSQL" },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" />, category: "NoSQL" },
      ]
    },
    {
      id: "devops",
      name: "DevOps",
      icon: <FaDocker />,
      description: "Implementing CI/CD pipelines, containerization, and infrastructure automation for seamless deployment and scaling.",
      skills: [
        { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
        { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> },
        { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
        { name: "Jenkins", icon: <SiJenkins className="text-[#D24939]" /> },
        { name: "Prometheus", icon: <SiPrometheus className="text-[#E6522C]" /> },
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      ]
    },
  ];

  // Handle automatic slideshow with debounce
  useEffect(() => {
    let isTransitioning = false;

    if (autoplay) {
      slideInterval.current = setInterval(() => {
        if (!isTransitioning) {
          isTransitioning = true;
          const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
          const nextIndex = (currentIndex + 1) % categories.length;
          setActiveCategory(categories[nextIndex].id);

          // Force a re-render by triggering a state update
          setTimeout(() => {
            setIsVisible(prev => !prev);
            setIsVisible(prev => !prev);
          }, 0);

          // Reset transitioning flag after animation completes
          setTimeout(() => {
            isTransitioning = false;
          }, 500);
        }
      }, 7000); // Change slide every 7 seconds (longer to ensure complete transitions)
    } else if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [activeCategory, autoplay]);

  useEffect(() => {
    setIsVisible(true);

    // Add scroll animation for skills
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const expertiseSection = containerRef.current;

      if (expertiseSection) {
        const sectionTop = expertiseSection.offsetTop;
        const sectionHeight = expertiseSection.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollPosition > sectionTop - windowHeight / 2 &&
            scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
          setIsVisible(true);
          setAutoplay(true);
        } else {
          setAutoplay(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      },
    },
  };

  const activeData = categories.find((cat) => cat.id === activeCategory);

  return (
    <section id="expertise" className="py-20 relative" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">My Expertise</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            I specialize in a wide range of technologies and services to deliver exceptional digital experiences.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="expertise-tabs mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`tab-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  // Force immediate update
                  setActiveCategory(category.id);
                  setAutoplay(false);

                  // Force a re-render by triggering a state update
                  setTimeout(() => {
                    setIsVisible(prev => !prev);
                    setIsVisible(prev => !prev);
                  }, 0);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-text">{category.name}</span>
                {activeCategory === category.id && (
                  <motion.div
                    className="tab-indicator"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Slideshow Controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="slideshow-control"
              onClick={() => {
                const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
                const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
                setActiveCategory(categories[prevIndex].id);
                setAutoplay(false);

                // Force a re-render by triggering a state update
                setTimeout(() => {
                  setIsVisible(prev => !prev);
                  setIsVisible(prev => !prev);
                }, 0);
              }}
              aria-label="Previous category"
            >
              <span className="text-lg">←</span>
            </button>

            <button
              className={`slideshow-autoplay ${autoplay ? 'active' : ''}`}
              onClick={() => setAutoplay(!autoplay)}
              aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
            >
              {autoplay ? "❚❚" : "▶"}
            </button>

            <button
              className="slideshow-control"
              onClick={() => {
                const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
                const nextIndex = (currentIndex + 1) % categories.length;
                setActiveCategory(categories[nextIndex].id);
                setAutoplay(false);

                // Force a re-render by triggering a state update
                setTimeout(() => {
                  setIsVisible(prev => !prev);
                  setIsVisible(prev => !prev);
                }, 0);
              }}
              aria-label="Next category"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="expertise-card p-6 relative min-h-[250px]">
          {/* Force re-render with key to prevent empty slides */}
          {activeData && (
            <div key={activeCategory} className="w-full">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-secondary">
                    {activeData.name}
                  </h3>
                  <div className="category-icon">
                    {activeData.icon}
                  </div>
                </div>

                <p className="text-sm text-foreground/80 mb-4">
                  {activeData.description}
                </p>
              </div>

              <div className="skills-container">
                <h4 className="text-base font-medium mb-3 text-accent">Key Technologies</h4>

                <div className="flex flex-wrap gap-2">
                  {activeData.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="compact-skill-pill"
                      title={skill.name}
                    >
                      <span className="compact-skill-icon">{skill.icon}</span>
                      <span className="compact-skill-name">{skill.name}</span>
                      {skill.category && (
                        <span className="compact-skill-category">{skill.category}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`pagination-dot ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                // Force immediate update
                setActiveCategory(category.id);
                setAutoplay(false);

                // Force a re-render by triggering a state update
                setTimeout(() => {
                  setIsVisible(prev => !prev);
                  setIsVisible(prev => !prev);
                }, 0);
              }}
              aria-label={`Go to ${category.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseNew;
