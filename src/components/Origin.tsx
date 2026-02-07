"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const Origin = () => (
  <section className="py-24 px-4 bg-white dark:bg-black">
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          The Spark Behind SafeBeam03
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          This project was born from a simple, recurring frustration.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-center justify-center">
        <motion.div
          className="md:col-span-1 md:-mt-20 mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          {/* Placeholder for developer photo */}
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center">
            <Image
              src="/developer-image.jpg"
              alt="Developer Photo"
              className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg"
              width={176}
              height={176}
              priority
            />
          </div>
        </motion.div>
        <motion.div
          className="md:col-span-2 space-y-6 text-base md:text-lg text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <p>
            &quot;While trying to send a file to my friend in the college lab, I
            discovered my desktop&apos;s LAN cable was faulty, leaving me
            without an internet connection. I attempted to use my mobile hotspot
            to email the file, but the login process was a hassle. With no flash
            drive available either, I was unable to transfer it.&quot;
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            &quot;I wanted a tool that was as fast as sending a text message but
            as secure as a bank vault. A digital &apos;dead drop&apos; where
            data exists only for the brief moment it&apos;s needed.&quot;
          </p>
          <p>
            &quot;That&apos;s why I built{" "}
            <span className="font-semibold font-sans">SafeBeam</span>. It&apos;s
            the tool I always wished I had: simple, secure, and respects privacy
            above all else. It solves my problem, and I hope it solves yours
            too!.&quot;
          </p>
          <p className="text-right font-bold text-gray-800 dark:text-gray-200">
            - Tanay Hingane, <br /> Creator of SafeBeam03
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);
