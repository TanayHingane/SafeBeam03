import Footer from "@/components/Footer";
import SafeBeamHomepage from "@/components/homepage";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto">
        <SafeBeamHomepage />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
