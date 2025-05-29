"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import ExpertiseNew from "@/app/components/ExpertiseNew";
import Projects from "@/app/components/Projects";
import AIIntegration from "@/app/components/AIIntegration";
import Footer from "@/app/components/Footer";
import HomeLoading from "@/app/components/HomeLoading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and ensure all components are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <HomeLoading key="loading" />
        ) : (
          <div key="content">
            <Navbar />
            <main>
              <Hero />
              <ExpertiseNew />
              <Projects />
              <AIIntegration />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
