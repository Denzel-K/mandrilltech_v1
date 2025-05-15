"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBrain, FaArrowRight } from "react-icons/fa";

const AIIntegration = () => {
  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent text-center lg:hidden">AI Integration</h2>

      <div className="container mx-auto px-4 md:px-6">
        <div className="glass rounded-xl p-4 md:p-10 border border-white/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden"
            >
              <Image
                src="/Digital brain.jpg"
                alt="Digital Brain AI Visualization"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
              
              {/* Floating Icon */}
              <motion.div
                className="absolute top-6 left-6 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <FaBrain className="text-primary text-2xl" />
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl md:text-3xl font-bold mb-4 text-gradient-full">
                AI-Enhanced Development
              </h2>
              
              <p className="text-base md:text-lg text-gray-300 mb-6">
                I integrate cutting-edge AI tools into my development workflow to accelerate 
                project delivery, enhance code quality, and solve complex problems more efficiently.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-400 text-sm md:text-base">Faster development cycles with AI-assisted coding</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-400 text-sm md:text-base">More innovative solutions through AI-powered brainstorming</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-400 text-sm md:text-base">Higher quality code with AI-enhanced testing and optimization</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-400 text-sm md:text-base">Continuous learning and improvement with AI research tools</span>
                </li>
              </ul>
              
              <Link
                href="/ai"
                className="inline-flex items-center px-4 py-3 md:px-6 rounded-full bg-primary text-sm md:text-lg text-gray-300 hover:bg-primary/90 transition-all group"
              >
                Learn More About My AI Process
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIIntegration;
