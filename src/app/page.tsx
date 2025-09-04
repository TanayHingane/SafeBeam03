import Footer from "@/components/Footer";
import SafeBeamHomepage from "@/components/homepage";
// import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function Home() {
  return (
    <>
      <div className="mx-auto">
        <SafeBeamHomepage />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
