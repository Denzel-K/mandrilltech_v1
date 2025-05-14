"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaShoppingCart, FaMobile, FaCode, FaPaintBrush, FaRocket } from "react-icons/fa";

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const services = [
    {
      title: "Business Website Development",
      icon: FaGlobe,
      description:
        "Create a professional online presence with a custom website that showcases your products or services, builds credibility, and attracts new customers.",
    },
    {
      title: "E-commerce Solutions",
      icon: FaShoppingCart,
      description:
        "Build a powerful online store with secure payment processing, inventory management, and a seamless shopping experience for your customers.",
    },
    {
      title: "Mobile App Development",
      icon: FaMobile,
      description:
        "Extend your reach with custom mobile applications for iOS and Android that engage users and provide value on the go.",
    },
    {
      title: "Custom Software Development",
      icon: FaCode,
      description:
        "Solve unique business challenges with tailor-made software solutions designed specifically for your organization's needs.",
    },
    {
      title: "UI/UX Design",
      icon: FaPaintBrush,
      description:
        "Create intuitive, engaging user experiences with beautiful interfaces that keep users coming back to your digital products.",
    },
    {
      title: "Digital Transformation",
      icon: FaRocket,
      description:
        "Modernize your business processes with digital solutions that increase efficiency, reduce costs, and improve customer satisfaction.",
    },
  ];

  return (
    <section id="services" className="py-20 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-dark">
            Services I Offer
          </h2>
          <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto">
            I provide comprehensive digital solutions to help your business
            thrive in the digital landscape.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_10px_25px_-15px_rgba(58,134,255,0.3)] hover:-translate-y-2"
            >
              <div className="flex items-center mb-5">
                <span className="mr-4 flex">
                  <service.icon className="w-5 h-5 text-primary" />
                </span>
                <h3 className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{service.title}</h3>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
