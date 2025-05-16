"use client";

import { motion } from "framer-motion";
import { FaBrain, FaCode, FaRobot, FaLightbulb, FaTools, FaChartLine } from "react-icons/fa";

const AIWorkflow = () => {
  const steps = [
    {
      icon: <FaLightbulb className="text-yellow-400" />,
      title: "Ideation & Planning",
      description: "I use AI to brainstorm ideas, explore possibilities, and plan project architectures. This helps me consider approaches I might not have thought of initially."
    },
    {
      icon: <FaCode className="text-blue-400" />,
      title: "Code Generation",
      description: "AI assists me in generating boilerplate code, suggesting optimizations, and implementing complex algorithms, allowing me to focus on the unique aspects of each project."
    },
    {
      icon: <FaTools className="text-green-400" />,
      title: "Problem Solving",
      description: "When faced with challenging bugs or implementation issues, I collaborate with AI to analyze problems from different angles and develop effective solutions."
    },
    {
      icon: <FaRobot className="text-purple-400" />,
      title: "Learning & Research",
      description: "I leverage AI to accelerate my learning of new technologies, frameworks, and best practices, ensuring I stay at the cutting edge of development."
    },
    {
      icon: <FaChartLine className="text-red-400" />,
      title: "Testing & Optimization",
      description: "AI helps me identify potential edge cases, optimize performance, and ensure code quality through automated testing suggestions and performance analysis."
    },
    {
      icon: <FaBrain className="text-primary" />,
      title: "Human Oversight",
      description: "While AI is a powerful tool, I maintain complete oversight of all code and solutions. Every line is reviewed, tested, and refined by me to ensure quality and security."
    }
  ];

  return (
    <section id="workflow" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">My AI-Enhanced Workflow</h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-400">
            Here's how I integrate AI into my development process to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-4 md:p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-gradient-full">{step.title}</h3>
                <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>
              <p className="text-xs md:text-base text-gray-400">{step.description}</p>
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
          <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto italic">
            "AI doesn't replace human creativity and expertise—it amplifies it. The combination of human intuition and AI capabilities creates outcomes greater than either could achieve alone."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIWorkflow;
