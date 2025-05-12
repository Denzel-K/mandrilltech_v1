"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      content:
        "Working with Denzel was a game-changer for our business. His technical expertise and creative approach helped us launch a website that perfectly represents our brand and has significantly increased our online conversions.",
    },
    {
      name: "Michael Chen",
      position: "Founder, EcoSolutions",
      content:
        "Denzel's ability to understand our unique business needs and translate them into a functional, beautiful digital solution exceeded our expectations. His attention to detail and commitment to quality is unmatched.",
    },
    {
      name: "Priya Patel",
      position: "Marketing Director, GlobalReach",
      content:
        "The mobile app Denzel developed for us has revolutionized how we engage with our customers. His technical skills combined with his understanding of user experience resulted in a product that our users love.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what my clients
            have to say about working with me.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="glass p-8 md:p-12 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_10px_25px_-15px_rgba(58,134,255,0.3)]"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 100,
                    position: activeIndex === index ? "relative" : "absolute",
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${
                    activeIndex === index ? "block" : "hidden"
                  } text-center`}
                >
                  <div className="mb-6 relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 flex items-center justify-center bg-primary/10">
                      <FaUserCircle className="w-12 h-12 text-white/80" />
                    </div>
                  </div>
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-primary/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base md:text-lg mb-6 italic text-foreground/80 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{testimonial.name}</h3>
                  <p className="text-foreground/70 text-sm">{testimonial.position}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-primary to-secondary scale-125"
                    : "bg-foreground/10 hover:bg-foreground/30 border border-white/10"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
