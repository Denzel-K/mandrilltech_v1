"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/denzel-ndegwa-7a4031313/",
      icon: FaLinkedinIn,
    },
    {
      name: "GitHub",
      url: "https://github.com/Denzel-K",
      icon: FaGithub,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/i_denzel_k/",
      icon: FaInstagram,
    },
    // {
    //   name: "Upwork",
    //   url: "https://www.upwork.com/freelancers/~01c4f9a98e72c97f34?viewMode=1",
    //   icon: SiUpwork,
    // },
    {
      name: "WhatsApp",
      url: "https://wa.me/qr/WGRJEI7HI2J4E1",
      icon: FaWhatsapp,
    },
  ];

  return (
    <footer className="py-12 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-dark-surface/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/icons/mandrill-vector.svg"
                  alt="Mandrill Technologies Logo"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gradient-full">
                Mandrill Tech
              </span>
            </Link>
            <p className="text-foreground/70 mb-4">
              Empowering Your Future with Digital Innovation
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full glass hover:bg-primary/10 transition-colors"
                >
                  <link.icon className="w-4 h-4 text-foreground" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm md:text-base text-foreground/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#expertise"
                  className="text-sm md:text-base text-foreground/70 hover:text-primary transition-colors"
                >
                  Expertise
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-sm md:text-base text-foreground/70 hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="text-sm md:text-base text-foreground/70 hover:text-primary transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/business#contact"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-foreground/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:denzelk741@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  denzelk741@gmail.com
                </a>
              </li>
              <li className="flex items-center text-foreground/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+254110725965"
                  className="hover:text-primary transition-colors"
                >
                  +254 110 725 965
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-foreground/10 pt-6 text-center text-foreground/60 text-sm"
        >
          <p>
            &copy; {currentYear} Mandrill Technologies. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
