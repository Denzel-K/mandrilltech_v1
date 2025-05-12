import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import ExpertiseNew from "@/app/components/ExpertiseNew";
import Projects from "@/app/components/Projects";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExpertiseNew />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
