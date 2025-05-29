"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Navbar from "@/app/components/Navbar";
import AIHero from "@/app/components/AIHero";
import AIWorkflow from "@/app/components/AIWorkflow";
import AIBenefits from "@/app/components/AIBenefits";
import AIUseCase from "@/app/components/AIUseCase";
import Footer from "@/app/components/Footer";
import AILoading from "@/app/components/AILoading";

export default function AIPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update document title for client-side
    document.title = "AI Solutions | Mandrill Technologies";

    // Simulate loading time and ensure all components are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>AI Solutions | Mandrill Technologies</title>
        <meta name="description" content="AI-powered development solutions and intelligent automation for modern businesses." />
      </Head>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <AILoading key="loading" />
        ) : (
          <div key="content">
            <Navbar />
            <main>
              <AIHero />
              <AIWorkflow />
              <AIBenefits />
              <AIUseCase />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
