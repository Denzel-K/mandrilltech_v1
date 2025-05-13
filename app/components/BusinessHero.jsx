"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaCode, FaDatabase, FaServer, FaBrain, FaMobile,
  FaDesktop, FaChartLine, FaRobot, FaCloud, FaCogs
} from "react-icons/fa";
import {
  SiJavascript, SiReact, SiPython, SiNodedotjs,
  SiMongodb, SiPostgresql, SiDocker, SiKubernetes,
  SiTailwindcss, SiGithub
} from "react-icons/si";
import { HiCode, HiTerminal } from "react-icons/hi";
import AnimatedArrow from "./AnimatedArrow";
import styles from "./BusinessHero.module.css";

const BusinessHero = () => {
  // Define floating icons with positions
  const floatingIcons = [
    { Icon: FaCode, size: 30, top: "15%", left: "10%", delay: 0 },
    { Icon: SiJavascript, size: 24, top: "25%", left: "85%", delay: 2 },
    { Icon: FaDatabase, size: 28, top: "65%", left: "15%", delay: 4 },
    { Icon: SiReact, size: 32, top: "20%", left: "75%", delay: 1 },
    { Icon: FaBrain, size: 26, top: "75%", left: "80%", delay: 3 },
    { Icon: SiPython, size: 28, top: "35%", left: "5%", delay: 5 },
    { Icon: FaServer, size: 24, top: "85%", left: "30%", delay: 2 },
    { Icon: SiNodedotjs, size: 26, top: "10%", left: "30%", delay: 4 },
    { Icon: FaMobile, size: 22, top: "60%", left: "90%", delay: 1 },
    { Icon: SiMongodb, size: 30, top: "40%", left: "85%", delay: 3 },
    { Icon: HiCode, size: 34, top: "80%", left: "10%", delay: 0 },
    { Icon: SiPostgresql, size: 26, top: "30%", left: "20%", delay: 2 },
    { Icon: FaDesktop, size: 24, top: "50%", left: "5%", delay: 4 },
    { Icon: SiDocker, size: 28, top: "15%", left: "60%", delay: 1 },
    { Icon: FaChartLine, size: 22, top: "70%", left: "60%", delay: 3 },
    { Icon: SiKubernetes, size: 26, top: "25%", left: "40%", delay: 5 },
    { Icon: FaRobot, size: 30, top: "55%", left: "75%", delay: 2 },
    { Icon: SiTailwindcss, size: 24, top: "40%", left: "15%", delay: 4 },
    { Icon: FaCloud, size: 28, top: "20%", left: "90%", delay: 1 },
    { Icon: SiGithub, size: 26, top: "90%", left: "45%", delay: 3 },
    { Icon: HiTerminal, size: 32, top: "10%", left: "45%", delay: 0 },
    { Icon: FaCogs, size: 24, top: "45%", left: "60%", delay: 2 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay) => ({
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <Image
          src="/black-poly-pattern.jpg"
          alt="Black Poly Pattern"
          fill
          priority
          className="object-cover object-center"
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          className={styles.floatingIcon}
          style={{
            top: icon.top,
            left: icon.left,
            animationDelay: `${icon.delay}s`,
          }}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          custom={icon.delay}
        >
          <icon.Icon size={icon.size} />
        </motion.div>
      ))}

      {/* Animated scroll down arrow */}
      {/* <AnimatedArrow /> */}

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.textContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className={styles.title}>
            Mandrill Technologies
          </motion.h1>

          <motion.h2 variants={itemVariants} className={styles.subtitle}>
            Empowering Your Future with Digital Innovation
          </motion.h2>

          <motion.p variants={itemVariants} className={styles.description}>
            From developing responsive websites and mobile apps that provide
            seamless user experiences to integrating advanced analytics tools
            that track customer behavior, I ensure that your business stands
            out in a competitive market.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.buttonContainer}>
            <Link href="#services" className={styles.primaryButton}>
              Explore Services
            </Link>
            <Link href="#contact" className={styles.secondaryButton}>
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessHero;
