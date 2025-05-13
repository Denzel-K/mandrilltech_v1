"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";
import { SiUpwork } from "react-icons/si";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/denzel-ndegwa-7a4031313/",
      icon: FaLinkedinIn,
    },
    {
      name: "GitHub",
      url: "https://github.com/Denzel-K",
      icon: FaGithub,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/i_denzel_k/",
      icon: FaInstagram,
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~01c4f9a98e72c97f34?viewMode=1",
      icon: SiUpwork,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/qr/WGRJEI7HI2J4E1",
      icon: FaWhatsapp,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Mandrill Face Image - positioned to cover right side */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 -z-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background z-10"></div>
        <Image
          src="/mandrill-face-left.jpg"
          alt="Mandrill Face"
          fill
          priority
          className="object-cover object-center opacity-80"
          style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="z-20">
            <motion.p
              variants={itemVariants}
              className="text-primary font-mono mb-2"
            >
              Hi, my name is
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-4 text-gradient-full"
            >
              Denzel Kariuki.
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-4xl font-semibold mb-6"
            >
              I&apos;m a full-stack developer.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-lg mb-8 max-w-xl text-foreground/80 opacity-60 md:opacity-70"
            >
              Proficient in building and designing specialized digital
              experiences for any platform. I transform ideas into engaging,
              user-centric applications that drive growth and engagement.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                href="/business"
                className="btn px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition-all"
              >
                Hire Me
              </Link>
              <Link
                href="#projects"
                className="btn px-6 py-3 rounded-full glass border border-primary/30 hover:bg-primary/10 transition-all"
              >
                View Projects
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm mb-2 text-foreground/60">Find me on:</p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.6 + (index * 0.1) }
                    }}
                  >
                    <link.icon className="w-5 h-5 text-foreground" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Empty div to maintain grid layout */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
