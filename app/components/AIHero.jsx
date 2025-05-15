"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AIHero = () => {
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
      {/* Background Image with Deep Immersion Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
        <Image
          src="/ai-banner.jpeg"
          alt="AI Banner"
          fill
          priority
          className="object-cover object-center"
          style={{ 
            transform: "scale(1.05)",
            filter: "brightness(0.7)"
          }}
        />
        
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-20"></div>
        
        {/* Depth effect elements */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-40">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 text-gradient-full"
          >
            Me + AI
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-lg md:text-3xl font-semibold mb-6 text-gray-300"
          >
            Augmenting Human Creativity with Artificial Intelligence
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl mb-8 text-gray-400 max-w-3xl mx-auto"
          >
            I leverage AI as a powerful tool to enhance my development process, 
            accelerate learning, and create innovative solutions that would be 
            difficult to achieve through traditional methods alone.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Link
              href="#workflow"
              className="btn px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition-all"
            >
              How I Work With AI
            </Link>
            <Link
              href="#benefits"
              className="btn px-6 py-3 rounded-full glass border border-primary/30 hover:bg-primary/10 transition-all"
            >
              Benefits for Clients
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIHero;
