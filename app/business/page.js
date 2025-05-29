"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Navbar from "@/app/components/Navbar";
import BusinessHero from "@/app/components/BusinessHero";
import Services from "@/app/components/Services";
import Process from "@/app/components/Process";
import AIBusiness from "@/app/components/AIBusiness";
import ContactFormCompact from "@/app/components/ContactFormCompact";
import Footer from "@/app/components/Footer";
import BusinessLoading from "@/app/components/BusinessLoading";

export default function Business() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update document title for client-side
    document.title = "Business Services | Mandrill Technologies";

    // Simulate loading time and ensure all components are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Business Services | Mandrill Technologies</title>
        <meta name="description" content="Professional digital services for businesses. Web development, mobile apps, and custom software solutions." />
      </Head>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <BusinessLoading key="loading" />
        ) : (
          <div key="content">
            <Navbar />
            <main>
              <BusinessHero />
              <Services />
              <Process />
              <AIBusiness />
              <ContactFormCompact />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
