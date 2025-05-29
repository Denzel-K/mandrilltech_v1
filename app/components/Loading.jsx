"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Loading = ({ message = "Loading...", variant = "default" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const colorCycleVariants = {
    cycle: {
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(120deg)", 
        "hue-rotate(240deg)",
        "hue-rotate(360deg)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const dotsVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Different background gradients for different page variants
  const getBackgroundGradient = () => {
    switch (variant) {
      case "business":
        return "from-primary/10 via-background to-accent/10";
      case "ai":
        return "from-secondary/10 via-background to-primary/10";
      default:
        return "from-primary/5 via-background to-secondary/5";
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br ${getBackgroundGradient()}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Mandrill Logo with animations */}
        <motion.div
          className="relative mb-8"
          variants={logoVariants}
        >
          <motion.div
            className="relative w-24 h-24 mx-auto"
            variants={pulseVariants}
            animate="pulse"
          >
            <motion.div
              variants={colorCycleVariants}
              animate="cycle"
              className="w-full h-full"
            >
              <Image
                src="/icons/mandrill-vector.svg"
                alt="Mandrill Technologies"
                width={96}
                height={96}
                className="w-full h-full object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Rotating ring around logo */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-primary border-r-secondary rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          variants={textVariants}
          className="space-y-2"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gradient-full">
            Mandrill Technologies
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-foreground/80">{message}</span>
            <motion.span
              variants={dotsVariants}
              animate="animate"
              className="text-primary"
            >
              ...
            </motion.span>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="mt-8 w-48 h-1 bg-foreground/10 rounded-full mx-auto overflow-hidden"
          variants={textVariants}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading;
