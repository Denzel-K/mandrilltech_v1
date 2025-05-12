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
  const containerRef = useRef(null);

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
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      id: "web",
      name: "Full Stack Web Development",
      icon: <FaLaptopCode />,
      subcategories: [
        {
          name: "Frontend",
          sections: [
            {
              name: "Frameworks & Libraries",
              skills: [
                { name: "React.js", icon: <FaReact className="text-[#61DAFB]" /> },
                { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
                { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
                { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
                { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
                { name: "Material UI", icon: <SiMui className="text-[#0081CB]" /> },
              ],
            },
            {
              name: "Languages",
              skills: [
                { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" /> },
                { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" /> },
                { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
                { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
                { name: "Sass", icon: <SiSass className="text-[#CC6699]" /> },
              ],
            },
            {
              name: "Tools",
              skills: [
                { name: "Webpack", icon: <SiWebpack className="text-[#8DD6F9]" /> },
                { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
                { name: "Jest", icon: <SiJest className="text-[#C21325]" /> },
                { name: "Cypress", icon: <SiCypress className="text-[#17202C]" /> },
              ],
            },
          ],
        },
        {
          name: "Backend",
          sections: [
            {
              name: "Frameworks & Libraries",
              skills: [
                { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
                { name: "Express.js", icon: <SiExpress className="text-white" /> },
                { name: "Nest.js", icon: <SiNestjs className="text-[#E0234E]" /> },
                { name: "Socket.io", icon: <SiSocketdotio className="text-white" /> },
                { name: "EJS", icon: <SiEjs className="text-[#B4CA65]" /> },
                { name: "Handlebars", icon: <SiHandlebarsdotjs className="text-[#F0772B]" /> },
              ],
            },
            {
              name: "Languages",
              skills: [
                { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
                { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
              ],
            },
            {
              name: "Tools",
              skills: [
                { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
                { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
                { name: "AWS", icon: <FaCloud className="text-[#FF9900]" /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "mobile",
      name: "Mobile App Development",
      icon: <FaMobile />,
      subcategories: [
        {
          name: "Mobile",
          sections: [
            {
              name: "Frameworks & Libraries",
              skills: [
                { name: "React Native", icon: <FaReact className="text-[#61DAFB]" /> },
                { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
              ],
            },
            {
              name: "Languages",
              skills: [
                { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
                { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
              ],
            },
            {
              name: "Tools",
              skills: [
                { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
                { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "desktop",
      name: "Desktop App Development",
      icon: <FaDesktop />,
      subcategories: [
        {
          name: "Desktop",
          sections: [
            {
              name: "Frameworks & Libraries",
              skills: [
                { name: "Electron.js", icon: <SiElectron className="text-[#47848F]" /> },
              ],
            },
            {
              name: "Languages",
              skills: [
                { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
                { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
              ],
            },
            {
              name: "Tools",
              skills: [
                { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "design",
      name: "UI/UX Design",
      icon: <FaPaintBrush />,
      subcategories: [
        {
          name: "Design",
          sections: [
            {
              name: "Tools",
              skills: [
                { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
                { name: "Adobe XD", icon: <SiAdobexd className="text-[#FF61F6]" /> },
                { name: "Sketch", icon: <SiSketch className="text-[#F7B500]" /> },
                { name: "InVision", icon: <SiInvision className="text-[#FF3366]" /> },
                { name: "Photoshop", icon: <SiAdobephotoshop className="text-[#31A8FF]" /> },
                { name: "Illustrator", icon: <SiAdobeillustrator className="text-[#FF9A00]" /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "database",
      name: "Database Management",
      icon: <FaDatabase />,
      subcategories: [
        {
          name: "Databases",
          sections: [
            {
              name: "SQL",
              skills: [
                { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
                { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
              ],
            },
            {
              name: "NoSQL",
              skills: [
                { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
                { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
                { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "devops",
      name: "DevOps",
      icon: <FaDocker />,
      subcategories: [
        {
          name: "DevOps",
          sections: [
            {
              name: "Tools",
              skills: [
                { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
                { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> },
                { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
                { name: "Jenkins", icon: <SiJenkins className="text-[#D24939]" /> },
                { name: "Prometheus", icon: <SiPrometheus className="text-[#E6522C]" /> },
                { name: "Grafana", icon: <SiGrafana className="text-[#F46800]" /> },
                { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
                { name: "GitHub", icon: <FaGithub className="text-white" /> },
                { name: "NPM", icon: <SiNpm className="text-[#CB3837]" /> },
                { name: "Yarn", icon: <SiYarn className="text-[#2C8EBB]" /> },
              ],
            },
          ],
        },
      ],
    },
  ];

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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">My Expertise</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            I specialize in a wide range of technologies and services to deliver exceptional digital experiences.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 expertise-container">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/4 expertise-card p-4 expertise-sidebar"
          >
            <h3 className="text-xl font-semibold mb-4 text-gradient-secondary">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className={`expertise-category p-3 rounded-lg flex items-center gap-3 relative ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="text-primary text-xl"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.icon}
                  </motion.div>
                  <span className="text-sm">{category.name}</span>
                  {activeCategory === category.id && (
                    <motion.div
                      className="absolute right-2 w-2 h-2 rounded-full bg-primary"
                      layoutId="activeCategoryIndicator"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:w-3/4 expertise-card p-6 expertise-content"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeData && (
                  <>
                    <motion.h3
                      variants={itemVariants}
                      className="text-2xl font-bold mb-6 text-gradient-primary"
                    >
                      {activeData.name}
                    </motion.h3>

                    {activeData.subcategories.map((subcategory, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="mb-8"
                      >
                        {activeData.subcategories.length > 1 && (
                          <h4 className="text-xl font-semibold mb-4 text-gradient-secondary">{subcategory.name}</h4>
                        )}

                        <div className="space-y-6">
                          {subcategory.sections.map((section, sectionIndex) => (
                            <motion.div
                              key={sectionIndex}
                              variants={itemVariants}
                              className="subcategory p-3 hover:bg-white/5 rounded-lg transition-all duration-300"
                            >
                              <div className="skill-section-header">
                                <h5 className="text-lg font-medium mb-3 text-foreground/90">{section.name}</h5>
                                <span className="skill-count">{section.skills.length}</span>
                              </div>
                              <div className="flex flex-wrap gap-3">
                                {section.skills.map((skill, skillIndex) => (
                                  <motion.div
                                    key={skillIndex}
                                    variants={itemVariants}
                                    whileHover={{
                                      scale: 1.05,
                                      y: -5,
                                      transition: { type: "spring", stiffness: 300 }
                                    }}
                                    className="skill-pill relative"
                                    title={skill.name}
                                    onMouseEnter={() => setHoveredSkill(`${section.name}-${skill.name}`)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                  >
                                    <motion.span
                                      className="skill-icon"
                                      animate={{
                                        rotate: hoveredSkill === `${section.name}-${skill.name}` ? [0, 5, -5, 0] : 0
                                      }}
                                      transition={{ duration: 0.5, repeat: hoveredSkill === `${section.name}-${skill.name}` ? Infinity : 0, repeatType: "reverse" }}
                                    >
                                      {skill.icon}
                                    </motion.span>
                                    <span className="text-sm">{skill.name}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseNew;
