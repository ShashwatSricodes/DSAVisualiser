import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { TechStack } from "@/components/landing/tech-stack";
import { CTA } from "@/components/landing/cta";
import { Navbar } from "@/components/navigation/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-10">
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <CTA />
    </div>
  );
}
