"use client";

import { motion } from "framer-motion";
import { FaRocket, FaRegClock, FaRegLightbulb, FaRegChartBar, FaRegCheckCircle, FaRegComments } from "react-icons/fa";

const AIBenefits = () => {
  const benefits = [
    {
      icon: <FaRocket />,
      title: "Accelerated Development",
      description: "AI tools help me deliver projects faster without compromising on quality, reducing time-to-market for your business solutions."
    },
    {
      icon: <FaRegLightbulb />,
      title: "Enhanced Innovation",
      description: "By leveraging AI for ideation and problem-solving, I can explore more creative and effective approaches to your business challenges."
    },
    {
      icon: <FaRegClock />,
      title: "Cost Efficiency",
      description: "The efficiency gains from AI integration translate to more competitive pricing and better value for your investment."
    },
    {
      icon: <FaRegChartBar />,
      title: "Data-Driven Solutions",
      description: "AI helps me analyze patterns and insights from data, leading to more informed decisions and optimized solutions."
    },
    {
      icon: <FaRegCheckCircle />,
      title: "Higher Quality Code",
      description: "AI assists with code reviews, testing, and optimization, resulting in more robust, maintainable, and secure applications."
    },
    {
      icon: <FaRegComments />,
      title: "Better Communication",
      description: "AI tools help me translate technical concepts into clear explanations, ensuring you always understand the work being done."
    }
  ];

  return (
    <section id="benefits" className="py-20 relative bg-background/50">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary">Benefits for Your Business</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            When you work with me, you gain all the advantages of AI-enhanced development without any of the complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-xl border border-white/5 hover:border-secondary/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-semibold">{benefit.title}</h3>
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
              </div>
              <p className="text-sm md:text-base text-foreground/70">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto">
            By combining human expertise with AI capabilities, I deliver solutions that are not only technically excellent but also aligned with your business goals and user needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIBenefits;
