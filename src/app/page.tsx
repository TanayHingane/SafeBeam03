import Hero1 from "@/components/home/Hero";
import Pricing1 from "@/components/home/pricing-1";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-8 lg:mx-60">
        <Hero1 />
        <HeroVideoDialog videoSrc={""} thumbnailSrc={"/dashboard.png"} />
        <Pricing1 />
      </div>
    </div>
  );
}
