"use client";

import { motion } from "framer-motion";
import {
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaDatabase,
  FaPaintBrush,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub
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
  SiGithubactions
} from "react-icons/si";

const Skills = () => {
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

  const skills = [
    {
      title: "Web Development",
      icon: FaGlobe,
      description:
        "As a proficient web developer, I bring a robust blend of creativity and technical expertise to the table. My attention to detail and commitment to best practices in coding guarantee that my solutions are not only functional but also maintainable and scalable.",
      technologies: [
        { name: "HTML", icon: FaHtml5 },
        { name: "CSS", icon: FaCss3Alt },
        { name: "JavaScript", icon: FaJs },
        { name: "React.js", icon: FaReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Node.js", icon: FaNodeJs },
      ],
    },
    {
      title: "Mobile Development",
      icon: FaMobile,
      description:
        "I am committed to delivering applications that are not only visually appealing but also optimized for speed and usability. Let me transform your ideas into engaging, user-centric mobile applications that drive growth and engagement.",
      technologies: [
        { name: "React Native", icon: FaReact },
        { name: "JavaScript", icon: FaJs },
        { name: "TypeScript", icon: SiTypescript },
      ],
    },
    {
      title: "Desktop Development",
      icon: FaDesktop,
      description:
        "I excel in creating robust, user-friendly applications for various operating systems including Windows, macOS, and Linux. By leveraging my deep understanding of software architecture and design principles, I create applications that are not only functional but also scalable and maintainable.",
      technologies: [
        { name: "Electron.js", icon: SiElectron },
        { name: "JavaScript", icon: FaJs },
        { name: "Node.js", icon: FaNodeJs },
      ],
    },
    {
      title: "Database Management",
      icon: FaDatabase,
      description:
        "I possess a deep understanding of both relational and NoSQL databases, including PostgreSQL, MySQL, MongoDB, and Redis. My meticulous approach to database management ensures that your data is always reliable and accessible, supporting your business operations seamlessly.",
      technologies: [
        { name: "MongoDB", icon: SiMongodb },
        { name: "MySQL", icon: SiMysql },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Redis", icon: SiRedis },
      ],
    },
    {
      title: "UI/UX Design",
      icon: FaPaintBrush,
      description:
        "As a creative and versatile designer, I bring a keen eye for detail and a passion for aesthetic excellence to every project. By combining artistic creativity with strategic thinking, I deliver designs that are not only beautiful but also purposeful and effective.",
      technologies: [
        { name: "Figma", icon: FaFigma },
      ],
    },
    {
      title: "DevOps",
      icon: FaDocker,
      description:
        "I excel in implementing robust DevOps practices that streamline development workflows and enhance deployment efficiency. My expertise in containerization, orchestration, and CI/CD pipelines ensures reliable, scalable, and automated infrastructure for your applications.",
      technologies: [
        { name: "Docker", icon: FaDocker },
        { name: "Kubernetes", icon: SiKubernetes },
        { name: "GitHub Actions", icon: SiGithubactions },
        { name: "Jenkins", icon: SiJenkins },
        { name: "Prometheus", icon: SiPrometheus },
        { name: "Grafana", icon: SiGrafana },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Expertise</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            I specialize in a wide range of technologies and services to deliver
            exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_10px_25px_-15px_rgba(58,134,255,0.3)] hover:-translate-y-2"
            >
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 mr-4 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10">
                  <skill.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{skill.title}</h3>
              </div>
              <p className="text-foreground/70 mb-6 text-sm leading-relaxed">{skill.description}</p>

              {/* Technology Icons */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <h4 className="text-xs uppercase tracking-wider font-medium text-foreground/50 mb-3">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-3">
                  {skill.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="w-8 h-8 flex items-center justify-center glass rounded-full hover:scale-110 transition-transform duration-200 border border-white/5"
                      title={tech.name}
                    >
                      {tech.name === "HTML" && <tech.icon className="w-4 h-4 text-[#E34F26]" />}
                      {tech.name === "CSS" && <tech.icon className="w-4 h-4 text-[#1572B6]" />}
                      {tech.name === "JavaScript" && <tech.icon className="w-4 h-4 text-[#F7DF1E]" />}
                      {tech.name === "TypeScript" && <tech.icon className="w-4 h-4 text-[#3178C6]" />}
                      {tech.name === "React.js" && <tech.icon className="w-4 h-4 text-[#61DAFB]" />}
                      {tech.name === "React Native" && <tech.icon className="w-4 h-4 text-[#61DAFB]" />}
                      {tech.name === "Next.js" && <tech.icon className="w-4 h-4 text-white" />}
                      {tech.name === "Node.js" && <tech.icon className="w-4 h-4 text-[#339933]" />}
                      {tech.name === "Socket.io" && <tech.icon className="w-4 h-4 text-white" />}
                      {tech.name === "EJS" && <tech.icon className="w-4 h-4 text-[#B4CA65]" />}
                      {tech.name === "Handlebars" && <tech.icon className="w-4 h-4 text-[#F0772B]" />}
                      {tech.name === "Nest.js" && <tech.icon className="w-4 h-4 text-[#E0234E]" />}
                      {tech.name === "Electron.js" && <tech.icon className="w-4 h-4 text-[#47848F]" />}
                      {tech.name === "MongoDB" && <tech.icon className="w-4 h-4 text-[#47A248]" />}
                      {tech.name === "MySQL" && <tech.icon className="w-4 h-4 text-[#4479A1]" />}
                      {tech.name === "PostgreSQL" && <tech.icon className="w-4 h-4 text-[#336791]" />}
                      {tech.name === "Redis" && <tech.icon className="w-4 h-4 text-[#DC382D]" />}
                      {tech.name === "Figma" && <tech.icon className="w-4 h-4 text-[#F24E1E]" />}
                      {tech.name === "Docker" && <tech.icon className="w-4 h-4 text-[#2496ED]" />}
                      {tech.name === "Kubernetes" && <tech.icon className="w-4 h-4 text-[#326CE5]" />}
                      {tech.name === "GitHub Actions" && <tech.icon className="w-4 h-4 text-[#2088FF]" />}
                      {tech.name === "Jenkins" && <tech.icon className="w-4 h-4 text-[#D24939]" />}
                      {tech.name === "Prometheus" && <tech.icon className="w-4 h-4 text-[#E6522C]" />}
                      {tech.name === "Grafana" && <tech.icon className="w-4 h-4 text-[#F46800]" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default Skills;
