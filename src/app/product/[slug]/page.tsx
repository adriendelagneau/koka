import Carousel from "@/components/carousel/Carousel";
import HeroSingle from "@/components/heroSingle/HeroSingle";
import Social from "@/components/social/Social";


interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const slug = await params;
  console.log(slug);
  return (
    <div className="relative min-h-[300vh] pt-24">
      <HeroSingle />
      <h3 className="text-primary font-poppins w-full text-center text-6xl uppercase">
        choose your favorite one
      </h3>
      <Carousel />
      <Social />
    </div>
  );
};

export default Page;
