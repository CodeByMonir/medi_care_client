import Image from "next/image";
import Hero from "../components/shared/Hero";
import Features from "../components/shared/Features";
import Services from "../components/shared/Services";
import Testimonials from "../components/shared/Testimonials";
import CTA from "../components/shared/CTA";

export default function Home() {
  return (
    <main>
      <Hero />

      <Features />

      <Services />

      <Testimonials />

      <CTA />
      
    </main>
  );
}
