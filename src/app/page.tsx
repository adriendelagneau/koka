import Hero from "@/components/hero/Hero";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Hero />

      <Marquee
        initialDirection={-1}
        speed={1.1}
        sentence="The beautiful landscape stretched out before us, filled with rolling hills, lush trees, and vibrant wildflowers swaying in the gentle breeze under a clear blue sky."
      />
      <div className="w-ful p-1 h-screen"></div>
    </div>
  );
}
