import Navbar from "@/app/components/Navbar";
import BusinessHero from "@/app/components/BusinessHero";
import Services from "@/app/components/Services";
import Process from "@/app/components/Process";
import Testimonials from "@/app/components/Testimonials";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Business Services | Mandrill Technologies",
  description: "Professional digital services for businesses. Web development, mobile apps, and custom software solutions.",
};

export default function Business() {
  return (
    <>
      <Navbar />
      <main>
        <BusinessHero />
        <Services />
        <Process />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
