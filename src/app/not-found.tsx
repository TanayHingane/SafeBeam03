import Image from "next/image";
import Link from "next/link";
import React from "react";

// For Next.js, you would typically use the Link component for client-side navigation.
// Since this is a self-contained example, a standard <a> tag is used.
// import Link from 'next/link';

// You can copy and paste this directly into a `not-found.tsx` (App Router)
// or `404.tsx` (Pages Router) file in your Next.js project.

const NotFoundPage = () => {
  return (
    <>
      {/* This style block defines the custom animations for the superhero image.
        - `zip-in`: Makes the image slide in from the left.
        - `pulse-glow`: Creates a subtle glowing effect on the lightning trail, now in blue.
      */}
      <style>{`
        @keyframes zip-in {
          0% {
            transform: translateX(-50%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(0, 191, 255, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(0, 191, 255, 0.9));
          }
        }
        .animate-zip-in {
          animation: zip-in 0.8s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>

      <main className="dark:bg-black dark:text-white bg-white text-black min-h-screen flex flex-col items-center justify-center text-center p-6 font-sans overflow-hidden">
        <div className="max-w-xl w-full">
          {/* Superhero Image with Animations - Updated with the new sticker-style image */}
          <div className="mb-8">
            <Image
              src="/fl.png" // Ensure this image is in your public directory
              alt="A sticker of a cartoon superhero in blue running at super speed"
              className="w-full max-w-sm mx-auto animate-zip-in animate-pulse-glow"
              width={300}
              height={300}
            />
          </div>

          {/* Sarcastic and Playful Text Content - Colors updated to match the new theme */}
          <h1
            className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 animate-zip-in"
            style={{ animationDelay: "0.2s" }}
          >
            Whoa, slow down!
          </h1>
          <p
            className="text-lg md:text-xl text-black dark:text-white mb-4 animate-zip-in"
            style={{ animationDelay: "0.3s" }}
          >
            Flash ran so fast, even he lost this page. It seems you&apos;ve
            discovered a file lost in the digital cosmos.
          </p>
          <p
            className="text-gray-400 mb-8 animate-zip-in"
            style={{ animationDelay: "0.4s" }}
          >
            Error 404: Page Not Found
          </p>

          {/* Call-to-Action Button - Colors updated to match the new theme */}
          <Link
            href="/" // In a real Next.js app, you'd use: <Link href="/" passHref>
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 animate-zip-in"
            style={{ animationDelay: "0.5s" }}
          >
            Return to SafeBeam
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
