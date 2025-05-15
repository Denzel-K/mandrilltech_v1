"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaRobot } from "react-icons/fa";

const AIUseCase = () => {
  const [activeCase, setActiveCase] = useState(0);

  // Auto-switching effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % useCases.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const useCases = [
    {
      title: "Rapid Prototyping",
      icon: <FaCode className="text-primary" />,
      description: "Using AI to quickly generate functional prototypes that demonstrate core features and user flows, allowing for faster iteration and feedback cycles.",
      benefits: [
        "Reduced time from concept to testable prototype",
        "More iterations in less time",
        "Earlier identification of potential issues",
        "Better alignment with client expectations"
      ]
    },
    {
      title: "Complex Problem Solving",
      icon: <FaRobot className="text-secondary" />,
      description: "Leveraging AI to tackle challenging technical problems by exploring multiple solution approaches simultaneously and identifying optimal implementations.",
      benefits: [
        "More robust solutions to difficult problems",
        "Consideration of edge cases that might be overlooked",
        "Implementation of advanced algorithms with confidence",
        "Reduced debugging time for complex features"
      ]
    },
    {
      title: "Data Analysis & Visualization",
      icon: <FaDatabase className="text-accent" />,
      description: "Using AI to analyze large datasets, identify patterns, and generate meaningful visualizations that drive business insights and decision-making.",
      benefits: [
        "More comprehensive data analysis",
        "Identification of non-obvious patterns and correlations",
        "Clearer data visualizations that tell a story",
        "Data-driven recommendations for business strategy"
      ]
    },
    {
      title: "Cross-Platform Development",
      icon: <FaMobile className="text-green-400" />,
      description: "Employing AI to streamline the development of applications that work seamlessly across web, mobile, and desktop platforms with consistent user experiences.",
      benefits: [
        "Faster development of multi-platform applications",
        "More consistent user experience across devices",
        "Reduced platform-specific bugs and issues",
        "Easier maintenance of cross-platform codebases"
      ]
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">AI in Action</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Real-world examples of how I leverage AI to deliver exceptional results for clients.
          </p>
        </motion.div>

        <div className="glass p-4 md:p-8 rounded-xl border border-accent/10 bg-background/30 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
            {/* Case Study Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h3 className="hidden md:block text-xl font-bold mb-4 text-accent">Select a Use Case:</h3>
              <h3 className="md:hidden text-lg text-center font-bold mb-4 text-accent-light">See use cases</h3>
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeCase === index
                      ? "glass border border-accent/30 shadow-lg"
                      : "hover:bg-background/50"
                  }`}
                  onClick={() => setActiveCase(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-sm md:text-base ${
                      activeCase === index ? "text-accent" : "text-foreground"
                    }`}>
                      {useCase.title}
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeCase === index ? "bg-accent/20" : "bg-background/50"
                    }`}>
                      {useCase.icon}
                    </div>
                  </div>
                  {activeCase === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs md:text-sm text-foreground/70 mt-2"
                    >
                      {useCase.description}
                    </motion.p>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Case Study Details */}
            <div className="hidden md:block relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass p-6 rounded-xl border border-white/5 h-full"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-full">
                    {useCases[activeCase].title} Benefits
                  </h3>
                  <ul className="space-y-3">
                    {useCases[activeCase].benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-accent mt-1 flex-shrink-0">✓</span>
                        <span className="text-sm md:text-base text-foreground/70">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {useCases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full ${
                      activeCase === index ? "bg-accent w-6" : "bg-accent/30 w-2"
                    }`}
                    animate={{
                      width: activeCase === index ? "1.5rem" : "0.5rem",
                      backgroundColor: activeCase === index ? "rgba(251, 86, 7, 1)" : "rgba(251, 86, 7, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIUseCase;
