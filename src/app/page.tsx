import Hero1 from "@/components/home/Hero";
import Pricing1 from "@/components/home/pricing-1";
// import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function Home() {
  return (
    <div className=" pb-16 px-8 lg:px-60 lg:pb-10 bg-white dark:bg-black">
      <Hero1 />
      {/* <HeroVideoDialog videoSrc={""} thumbnailSrc={"/dashboard.png"} /> */}
      <Pricing1 />
    </div>
  );
}
