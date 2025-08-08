import Hero from "@/components/hero/Hero";
import Marquee from "@/components/Marquee";
import ProductCherry from "@/components/productCherry/ProductCherry";
import ProductOriginal from "@/components/productOriginal/ProductOriginal";
import ProductZero from "@/components/productZero/ProductZero";
import Social from "@/components/social/Social";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
     <Hero />
      <Marquee
        initialDirection={1}
        speed={1}
        sentence="A gentle breeze swept through the meadow, rustling leaves and swaying tall grasses."
      />
      <Marquee
        initialDirection={-1}
        speed={0.7}
        sentence="The beautiful landscape stretched out before us, filled with rolling hills, lush trees, and vibrant wildflowers swaying in the gentle breeze under a clear blue sky."
      />
      <Marquee
        initialDirection={1}
        speed={0.9}
        sentence="The beautiful landscape stretched out before us, filled with rolling hills, lush trees, and vibrant wildflowers swaying in the gentle breeze under a clear blue sky."
      />
      <ProductOriginal />
      <Marquee
        initialDirection={-1}
        speed={1.1}
        sentence="The beautiful landscape stretched out before us, filled with rolling hills, lush trees, and vibrant wildflowers swaying in the gentle breeze under a clear blue sky."
      />

      <ProductZero />
      <Marquee
        initialDirection={1}
        speed={1.1}
        sentence="The beautiful landscape stretched out before us, filled with rolling hills, lush trees, and vibrant wildflowers swaying in the gentle breeze under a clear blue sky."
      />

      <ProductCherry />
      <Marquee
        initialDirection={-1}
        speed={1.1}
        sentence="The beautiful landscape stretched out before us, filled with rolling hills, lush trees, and vibrant wildflowers swaying in the gentle breeze under a clear blue sky."
      />
      <div className="w-full h-screen"></div>
      <Social />
    </div>
  );
}
