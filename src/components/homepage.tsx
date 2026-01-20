import { FiGithub } from "react-icons/fi";
import FeatureGrid from "./Benefits";
import { Origin } from "./Origin";
import { Shield, Zap } from "lucide-react";
import OTPShowcase from "./OTPShowCase";
import TransferDemo from "./TransferDemo";

const SafeBeamHomepage = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Animation */}

        <div className="container mx-auto lg:mx-20 text-center relative z-10 px-4">
          <span className="text-3xl md:text-7xl py-24 font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            <span className="relative">
              SafeBeam
              <span className="absolute bottom-0 sm:-bottom-1 left-0 right-0 h-2 sm:h-3 bg-blue-400 dark:bg-blue-500 -z-10 transform -rotate-1"></span>
            </span>
            {" -"} Secure,
            <br /> Instant File & Text Transfer.
          </span>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 mt-10 hidden md:block">
            Share files and text with a one-time OTP that expires in 10 minutes.
            No sign-ups, no limits, just secure, ephemeral transfers.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 mt-10 md:mt-0">
            <a href="/transfer">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 md:px-8 text-xs md:text-base rounded-full transition-transform transform hover:scale-105">
                Try SafeBeam Now
              </button>
            </a>
            <a
              href="https://github.com/TanayHingane/SafeBeam03"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <button className="border-2 border-gray-300 hover:bg-gray-100 text-gray-700 dark:border-gray-600 text-xs md:text-base dark:hover:bg-gray-800 dark:text-gray-300 font-bold py-3 px-5 md:px-8 rounded-full transition flex items-center gap-2">
                <FiGithub /> View on GitHub
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 ">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Zap className="w-3 h-3 md:w-5 md:h-5" />
                <span className="text-lg md:text-3xl font-bold">10 min</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                OTP Expiry
              </p>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Shield className="w-3 h-3 md:w-5 md:h-5" />
                <span className="text-lg md:text-3xl font-bold">100%</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Private
              </p>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="text-center">
              <div className="text-lg md:text-3xl font-bold text-primary mb-1">
                ∞
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                No Device Limits
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse-slow" />
          </div>
        </div>
      </section>

      {/* <hr className="border-gray-800" /> */}
      <div className="px-4">
        <FeatureGrid />
      </div>

      {/* System Architecture Section */}
      <section className="px-4">
        <OTPShowcase />
      </section>

      {/* <hr className="border-gray-800" /> */}

      <section className="px-4">
        <TransferDemo />
      </section>

      {/* <hr className="border-gray-800" /> */}

      <div className="mt-3 md:mt-10 px-4">
        <Origin />
      </div>
    </div>
  );
};

export default SafeBeamHomepage;
