import { FaReact, FaServer } from "react-icons/fa";
import {
  FiClock,
  FiDownload,
  FiGithub,
  FiKey,
  FiLock,
  FiShare2,
  FiUploadCloud,
} from "react-icons/fi";
import { SiAppwrite, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { Benefits } from "./Benefits";
import { Origin } from "./Origin";

const SafeBeamHomepage = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Animation */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute bg-sky-400 rounded-full w-96 h-96 -top-20 -left-20 opacity-40 hidden dark:block"></div>
          <div className="absolute bg-emerald-500 rounded-full w-96 h-96 -bottom-20 -right-20 opacity-40 hidden dark:block"></div>
        </div>

        <div className="container mx-auto lg:mx-20 text-center relative z-10 px-4">
          <span className="text-4xl md:text-7xl  py-24 font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            <span className="relative">
              SafeBeam
              <span className="absolute bottom-0 sm:-bottom-1 left-0 right-0 h-2 sm:h-3 bg-blue-400 dark:bg-blue-500 -z-10 transform -rotate-1"></span>
            </span>
            {" -"} Secure,
            <br /> Instant File & Text Transfer.
          </span>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 mt-10">
            Share files and text with a one-time OTP that expires in 10 minutes.
            No sign-ups, no limits, just secure, ephemeral transfers.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="/transfer">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105">
                Try SafeBeam Now
              </button>
            </a>
            <a
              href="https://github.com/TanayHingane/SafeBeam"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <button className="border-2 border-gray-300 hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300 font-bold py-3 px-8 rounded-full transition flex items-center gap-2">
                <FiGithub /> View on GitHub
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* <hr className="border-gray-800" /> */}
      <div className="px-4">
        <Benefits />
      </div>

      {/* System Architecture Section */}
      <section className="py-20 mt-5 px-24">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-xl md:text-4xl font-bold mb-12">
            How It Works: Secure by Design
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 pt-9">
            {/* Step 1: Upload */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none p-6 rounded-full">
                <FiUploadCloud className="text-green-400 text-4xl" />
              </div>
              <p className="mt-4 font-semibold">1. Upload</p>
              <p className="text-gray-400 text-sm">
                File is uploaded to the Next.js frontend.
              </p>
            </div>
            <div className="h-1 w-16 bg-gray-700 md:h-px md:w-24 md:rotate-0 rotate-90"></div>

            {/* Step 2: Store */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none p-6 rounded-full">
                <FiLock className="text-green-400 text-4xl" />
              </div>
              <p className="mt-4 font-semibold">2. Store</p>
              <p className="text-gray-400 text-sm">
                Securely stored in the Appwrite database.
              </p>
            </div>
            <div className="h-1 w-16 bg-gray-700 md:h-px md:w-24 md:rotate-0 rotate-90"></div>

            {/* Step 3: Generate OTP */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none p-6 rounded-full">
                <FiKey className="text-green-400 text-4xl" />
              </div>
              <p className="mt-4 font-semibold">3. Generate</p>
              <p className="text-gray-400 text-sm">
                One-Time OTP is generated.
              </p>
            </div>
            <div className="h-1 w-16 bg-gray-700 md:h-px md:w-24 md:rotate-0 rotate-90"></div>

            {/* Step 4: Share */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none p-6 rounded-full">
                <FiShare2 className="text-green-400 text-4xl" />
              </div>
              <p className="mt-4 font-semibold">4. Share</p>
              <p className="text-gray-400 text-sm">
                Share the OTP with the recipient.
              </p>
            </div>
            <div className="h-1 w-16 bg-gray-700 md:h-px md:w-24 md:rotate-0 rotate-90"></div>

            {/* Step 5: Retrieve */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none p-6 rounded-full">
                <FiDownload className="text-green-400 text-4xl" />
              </div>
              <p className="mt-4 font-semibold">5. Retrieve</p>
              <p className="text-gray-400 text-sm">
                Recipient enters OTP to download.
              </p>
            </div>
            <div className="h-1 w-16 bg-gray-700 md:h-px md:w-24 md:rotate-0 rotate-90"></div>

            {/* Step 6: Cleanup */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none p-6 rounded-full">
                <FiClock className="text-green-400 text-4xl" />
              </div>
              <p className="mt-4 font-semibold">6. Cleanup</p>
              <p className="text-gray-400 text-sm">
                Data is deleted after 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <hr className="border-gray-800" /> */}

      {/* Tech Stack Section */}
      <section className="py-20 bg-white dark:bg-black mt-5 px-24">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-xl md:text-4xl font-bold mb-12">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-9">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <SiNextdotjs className="text-5xl mb-4" />
              <p className="font-semibold">Next.js</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <FaReact className="text-5xl mb-4 text-blue-400" />
              <p className="font-semibold">React.js</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <SiTailwindcss className="text-5xl mb-4 text-teal-400" />
              <p className="font-semibold">Tailwind CSS</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <SiAppwrite className="text-5xl mb-4 text-pink-500" />
              <p className="font-semibold">Appwrite</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <FaServer className="text-5xl mb-4 text-yellow-400" />
              <p className="font-semibold">Serverless</p>
            </div>
          </div>
        </div>
      </section>

      {/* <hr className="border-gray-800" /> */}

      {/* Pricing Section */}
      <section className="py-20 mt-5">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-xl md:text-4xl font-bold mb-12">
            Simple & Transparent Pricing
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 p-8 rounded-lg max-w-sm w-full">
              <h3 className="text-2xl font-bold mb-4">Community Plan</h3>
              <p className="text-5xl font-extrabold mb-6">Free</p>
              <ul className="text-left space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span> Unlimited File
                  Transfers
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span> All File Types
                  Supported
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span> Secure Text Notes
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span> 10-Minute OTP Expiry
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span> Cross-Platform
                  Compatibility
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-700 p-8 rounded-lg max-w-sm w-full opacity-50 cursor-not-allowed">
              <h3 className="text-2xl font-bold mb-4">Business Plan</h3>
              <p className="text-3xl font-bold text-gray-500 mb-6">
                Coming Soon
              </p>
              <ul className="text-left space-y-2 text-gray-500">
                <li>Custom Expiry Times</li>
                <li>Larger File Limits</li>
                <li>Team Collaboration</li>
                <li>Dedicated Support</li>
                <li>And much more...</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-10 px-4">
        <Origin />
      </div>
    </div>
  );
};

export default SafeBeamHomepage;
