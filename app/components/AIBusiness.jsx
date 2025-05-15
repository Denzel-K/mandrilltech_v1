"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaRocket, FaArrowRight, FaChartLine, FaShieldAlt, FaRegLightbulb } from "react-icons/fa";

const AIBusiness = () => {
  const benefits = [
    {
      icon: <FaRocket className="text-primary" />,
      title: "Accelerated Time-to-Market",
      description: "AI-powered development significantly reduces project timelines, helping your business gain a competitive edge."
    },
    {
      icon: <FaChartLine className="text-green-400" />,
      title: "Data-Driven Solutions",
      description: "Leverage AI to extract actionable insights from your data, enabling more informed business decisions."
    },
    {
      icon: <FaShieldAlt className="text-secondary" />,
      title: "Enhanced Security",
      description: "AI helps identify potential vulnerabilities and implement robust security measures to protect your business."
    },
    {
      icon: <FaRegLightbulb className="text-yellow-400" />,
      title: "Innovative Features",
      description: "Explore cutting-edge capabilities that set your products apart from competitors and delight your users."
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent text-center lg:hidden">AI in Business</h2>

      <div className="container mx-auto px-4 md:px-6">
        <div className="glass rounded-xl p-4 md:p-10 border border-white/5 overflow-hidden">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 items-center">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold mb-4 text-gradient-full">
                AI-Powered Business Solutions
              </h2>
              
              <p className="text-base md:text-lg text-foreground/80 mb-6">
                I leverage artificial intelligence to create robust, scalable, and innovative 
                solutions that drive business growth and operational efficiency.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-background/30 border border-white/5"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-300">{benefit.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Link
                href="/ai"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all group"
              >
                Explore AI Capabilities
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden w-full lg:w-auto"
            >
              <Image
                src="/AI in business.jpg"
                alt="AI in Business"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-background/80 to-transparent"></div>
              
              {/* Animated overlay elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 rounded-full border-2 border-primary/30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                ></motion.div>
                <motion.div
                  className="absolute w-32 h-32 rounded-full border-2 border-secondary/30"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                ></motion.div>
                <motion.div
                  className="absolute w-44 h-44 rounded-full border-2 border-accent/20"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.1, 0.4, 0.1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIBusiness;
