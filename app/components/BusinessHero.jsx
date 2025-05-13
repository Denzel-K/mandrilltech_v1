"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GiMonkey } from "react-icons/gi";

const BusinessHero = () => {
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

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* High-Tech Workstation Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/High-Tech-Workstation.jpg"
          alt="High Tech Workstation"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay with blur for better text readability */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content - Centered */}
          <motion.div variants={itemVariants} className="glass p-8 md:p-12 rounded-2xl backdrop-blur-md">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient-full"
            >
              Mandrill Technologies
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold mb-6"
            >
              Empowering Your Future with Digital Innovation
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg mb-8 max-w-3xl mx-auto text-foreground/90"
            >
              From developing responsive websites and mobile apps that provide
              seamless user experiences to integrating advanced analytics tools
              that track customer behavior, I ensure that your business stands
              out in a competitive market.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center mb-4"
            >
              <Link
                href="#services"
                className="btn px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition-all"
              >
                Explore Services
              </Link>
              <Link
                href="#contact"
                className="btn px-6 py-3 rounded-full glass border border-primary/30 hover:bg-primary/10 transition-all"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessHero;
