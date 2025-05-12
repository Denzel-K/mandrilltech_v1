"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaCode, FaRocket, FaChartLine, FaArrowDown } from "react-icons/fa";
import "./process-tree.css";

const ProcessTree = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      icon: <FaLightbulb />,
      title: "Discovery & Planning",
      description:
        "I start by understanding your business goals, target audience, and project requirements to create a comprehensive roadmap for success.",
      details: [
        "Initial consultation to understand your vision",
        "Market and competitor analysis",
        "Project scope definition and timeline planning",
        "Technology stack selection based on your needs"
      ]
    },
    {
      icon: <FaCode />,
      title: "Design & Development",
      description:
        "I design intuitive interfaces and develop robust solutions using the latest technologies and best practices to bring your vision to life.",
      details: [
        "UI/UX design with user-centered approach",
        "Frontend development with responsive design",
        "Backend development with secure architecture",
        "Regular progress updates and feedback integration"
      ]
    },
    {
      icon: <FaRocket />,
      title: "Testing & Deployment",
      description:
        "I thoroughly test all aspects of your project and deploy it to your preferred hosting environment with minimal downtime to ensure a smooth launch.",
      details: [
        "Comprehensive testing across devices and browsers",
        "Performance optimization and security audits",
        "Seamless deployment to production environment",
        "Documentation and knowledge transfer"
      ]
    },
    {
      icon: <FaChartLine />,
      title: "Maintenance & Growth",
      description:
        "I provide ongoing support, monitor performance, and implement improvements to ensure your digital presence continues to evolve and succeed.",
      details: [
        "Regular maintenance and security updates",
        "Performance monitoring and analytics",
        "Continuous improvement based on user feedback",
        "Strategic planning for future enhancements"
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const handleStepClick = (index) => {
    setActiveStep(activeStep === index ? null : index);
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">My Process</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            I follow a structured approach to deliver high-quality digital solutions that meet your business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical line connecting all steps */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2 hidden md:block tree-connector"></div>

          {steps.map((step, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <motion.div
                variants={itemVariants}
                className={`relative ${index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-8 md:text-left md:mr-auto md:ml-1/2'} md:w-1/2 w-full process-tree-container`}
              >
                {/* Connector for desktop */}
                <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0 md:right-0' : 'left-0 md:left-0'} w-8 h-1 bg-primary hidden md:block tree-connector`}></div>

                {/* Step card */}
                <div
                  className={`process-card glass p-6 rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 ${activeStep === index ? 'active' : ''}`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} items-center text-center md:text-left`}>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 text-2xl">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className={`text-foreground/70 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>{step.description}</p>

                    {/* Expandable details */}
                    <motion.div
                      className={`mt-4 w-full step-details ${activeStep === index ? 'expanded' : 'collapsed'}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeStep === index ? 'auto' : 0,
                        opacity: activeStep === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className={`space-y-2 text-sm ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 ${index % 2 === 0 ? 'md:order-last' : ''}`}></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Step number */}
                  <div className="step-number">
                    <span>{index + 1}</span>
                  </div>
                </div>

                {/* Center node for desktop */}
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center tree-node">
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>
              </motion.div>

              {/* Arrow down between steps (except last) */}
              {index < steps.length - 1 && (
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center my-6 md:hidden"
                >
                  <FaArrowDown className="text-primary text-2xl animate-bounce" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTree;
