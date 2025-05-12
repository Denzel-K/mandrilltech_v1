"use client";

import { motion } from "framer-motion";
import { FaLightbulb, FaCode, FaRocket, FaChartLine } from "react-icons/fa";

const ProcessNew = () => {
  const steps = [
    {
      icon: <FaLightbulb />,
      title: "Discovery & Planning",
      description:
        "We start by understanding your business goals, target audience, and project requirements to create a comprehensive roadmap.",
    },
    {
      icon: <FaCode />,
      title: "Design & Development",
      description:
        "Our team designs intuitive interfaces and develops robust solutions using the latest technologies and best practices.",
    },
    {
      icon: <FaRocket />,
      title: "Testing & Deployment",
      description:
        "We thoroughly test all aspects of your project and deploy it to your preferred hosting environment with minimal downtime.",
    },
    {
      icon: <FaChartLine />,
      title: "Maintenance & Growth",
      description:
        "We provide ongoing support, monitor performance, and implement improvements to ensure your digital presence continues to evolve.",
    },
  ];

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
      },
    },
  };

  return (
    <section id="process" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Our Process</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We follow a structured approach to deliver high-quality digital solutions that meet your business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="process-card glass p-6 rounded-xl relative overflow-hidden group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 text-2xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
              
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-primary/5 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center">
                <span className="text-primary font-bold">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessNew;
