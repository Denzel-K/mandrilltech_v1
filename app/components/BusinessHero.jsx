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
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
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
              className="text-lg mb-8 max-w-xl text-foreground/80"
            >
              From developing responsive websites and mobile apps that provide
              seamless user experiences to integrating advanced analytics tools
              that track customer behavior, I ensure that your business stands
              out in a competitive market.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                href="#services"
                className="btn px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white"
              >
                Explore Services
              </Link>
              <Link
                href="#contact"
                className="btn px-6 py-3 rounded-full glass border border-primary/30"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 filter blur-xl"></div>
              <div className="relative z-10 w-64 h-64 glass rounded-full flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <GiMonkey className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessHero;
