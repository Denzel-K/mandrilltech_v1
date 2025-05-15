import Navbar from "@/app/components/Navbar";
import AIHero from "@/app/components/AIHero";
import AIWorkflow from "@/app/components/AIWorkflow";
import AIBenefits from "@/app/components/AIBenefits";
import AIUseCase from "@/app/components/AIUseCase";
import Footer from "@/app/components/Footer";

export default function AIPage() {
  return (
    <>
      <Navbar />
      <main>
        <AIHero />
        <AIWorkflow />
        <AIBenefits />
        <AIUseCase />
      </main>
      <Footer />
    </>
  );
}
