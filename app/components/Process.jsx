"use client";

import { motion } from "framer-motion";
import styles from "./Process.module.css";
import {
  FaLightbulb, FaClipboardList, FaPaintBrush,
  FaCode, FaVial, FaRocket, FaHeadset
} from "react-icons/fa";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      icon: FaLightbulb,
      description:
        "I start by understanding your business goals, target audience, and project requirements through in-depth consultation.",
    },
    {
      number: "02",
      title: "Planning",
      icon: FaClipboardList,
      description:
        "Based on the discovery phase, I create a detailed project plan including timeline, deliverables, and technical specifications.",
    },
    {
      number: "03",
      title: "Design",
      icon: FaPaintBrush,
      description:
        "I design intuitive user interfaces and experiences that align with your brand identity and meet user needs.",
    },
    {
      number: "04",
      title: "Development",
      icon: FaCode,
      description:
        "Using modern technologies and best practices, I build robust, scalable, and secure digital solutions.",
    },
    {
      number: "05",
      title: "Testing",
      icon: FaVial,
      description:
        "Rigorous testing ensures your product works flawlessly across all devices and browsers before launch.",
    },
    {
      number: "06",
      title: "Deployment",
      icon: FaRocket,
      description:
        "I handle the technical aspects of launching your product and provide training on how to use and maintain it.",
    },
    {
      number: "07",
      title: "Support",
      icon: FaHeadset,
      description:
        "Ongoing support and maintenance ensure your digital product continues to perform optimally and evolve with your business.",
    },
  ];

  return (
    <section className={styles.processSection}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            My Work Process
          </h2>
          <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto">
            A structured approach to delivering high-quality digital solutions
            that meet your business needs.
          </p>
        </motion.div>

        <div className={styles.timelineContainer}>
          {/* Vertical timeline line */}
          <div className={styles.timelineLine}></div>

          <div className={styles.timelineItems}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${styles.timelineItem} ${
                  index % 2 === 0
                    ? styles.timelineItemLeft
                    : styles.timelineItemRight
                } lg:items-start`}
              >
                {/* Content for left side (even index) or right side (odd index) */}
                <div
                  className={`${styles.timelineContent} ${
                    index % 2 === 0
                      ? styles.timelineContentLeft
                      : styles.timelineContentRight
                  }`}
                >
                  {/* Connector line */}
                  <div
                    className={`${styles.connector} ${
                      index % 2 === 0 ? styles.connectorLeft : styles.connectorRight
                    }`}
                  ></div>

                  {/* Floating elements in empty space */}
                  <motion.div
                    className={`${styles.floatingElement} ${
                      index % 2 === 0 ? styles.floatingElementLeft1 : styles.floatingElementRight1
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  ></motion.div>
                  <motion.div
                    className={`${styles.floatingElement} ${
                      index % 2 === 0 ? styles.floatingElementLeft2 : styles.floatingElementRight2
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  ></motion.div>

                  <div className={styles.timelineCard}>
                    <div
                      className={`${styles.timelineCardHeader} ${
                        index % 2 === 0 ? styles.timelineCardHeaderLeft : styles.timelineCardHeaderRight
                      }`}
                    >
                      <h3 className={styles.timelineCardTitle}>{step.title}</h3>
                      <div
                        className={`${styles.timelineCardIcon} ${
                          index % 2 === 0 ? styles.timelineCardIconLeft : styles.timelineCardIconRight
                        }`}
                      >
                        <step.icon size={20} />
                      </div>
                    </div>
                    <p className={styles.timelineCardDescription}>{step.description}</p>
                  </div>
                </div>

                {/* Timeline point with number */}
                <div className={styles.timelinePoint}>
                  <div className={styles.timelinePointPulse}></div>
                  <div className={styles.timelinePointCircle}>
                    <span className={styles.timelinePointNumber}>{step.number}</span>
                  </div>
                </div>

                {/* Empty space for the other side with floating elements */}
                <div className={styles.timelineSpacer}>
                  <motion.div
                    className={`${styles.floatingElement} ${
                      index % 2 === 0 ? styles.floatingElementRight1 : styles.floatingElementLeft1
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  ></motion.div>
                  <motion.div
                    className={`${styles.floatingElement} ${
                      index % 2 === 0 ? styles.floatingElementRight2 : styles.floatingElementLeft2
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
