"use client";

import { motion } from "framer-motion";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "I start by understanding your business goals, target audience, and project requirements through in-depth consultation.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Based on the discovery phase, I create a detailed project plan including timeline, deliverables, and technical specifications.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "I design intuitive user interfaces and experiences that align with your brand identity and meet user needs.",
    },
    {
      number: "04",
      title: "Development",
      description:
        "Using modern technologies and best practices, I build robust, scalable, and secure digital solutions.",
    },
    {
      number: "05",
      title: "Testing",
      description:
        "Rigorous testing ensures your product works flawlessly across all devices and browsers before launch.",
    },
    {
      number: "06",
      title: "Deployment",
      description:
        "I handle the technical aspects of launching your product and provide training on how to use and maintain it.",
    },
    {
      number: "07",
      title: "Support",
      description:
        "Ongoing support and maintenance ensure your digital product continues to perform optimally and evolve with your business.",
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Work Process
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A structured approach to delivering high-quality digital solutions
            that meet your business needs.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_10px_25px_-15px_rgba(58,134,255,0.3)]">
                    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{step.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-14 h-14">
                  <div className="absolute w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse opacity-70"></div>
                  <div className="relative z-10 w-12 h-12 rounded-full glass flex items-center justify-center font-bold border border-white/20 backdrop-blur-md">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{step.number}</span>
                  </div>
                </div>

                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
