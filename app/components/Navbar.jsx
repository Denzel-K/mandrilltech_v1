"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GiMonkey } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-opacity-80 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-full">
              <GiMonkey className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-full">
              Mandrill Tech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/business"
              className="text-foreground hover:text-primary transition-colors"
            >
              Business
            </Link>
            <Link
              href="/business#contact"
              className="btn px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } glass mt-2 mx-4 rounded-xl overflow-hidden`}
      >
        <div className="flex flex-col py-4">
          <Link
            href="/"
            className="px-4 py-2 hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/business"
            className="px-4 py-2 hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Business
          </Link>
          <Link
            href="/business#contact"
            className="btn mx-4 mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-center"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
