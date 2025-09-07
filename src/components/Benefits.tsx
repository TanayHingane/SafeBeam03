"use client";
import { motion } from "framer-motion";
import { FiShield, FiZap, FiUserX } from "react-icons/fi";

const benefits = [
  {
    icon: <FiShield className="w-10 h-10 text-accent-green" />,
    title: "Unmatched Security",
    description:
      "Unlike traditional services, we use end-to-end encryption with ephemeral storage. Your files are encrypted on your device and permanently deleted after 10 minutes. We never have access to your unencrypted data.",
  },
  {
    icon: <FiZap className="w-10 h-10 text-accent-blue" />,
    title: "Blazing Fast Transfers",
    description:
      "No accounts, no ads, no friction. Just a simple, fast interface to get your files from A to B as quickly as possible. Perfect for quick transfers on the go.",
  },
  {
    icon: <FiUserX className="w-10 h-10 text-accent-green" />,
    title: "Absolute Anonymity",
    description:
      "We don't require an account, and we don't track you. Your privacy is paramount. Share files without leaving a trace, a feature most cloud storage providers can't promise.",
  },
];

export const Benefits = () => (
  <section className="py-24 px-4 bg-white dark:bg-black">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        Why Choose SafeBeam?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        In a world of data breaches and privacy concerns, SafeBeam offers a
        refreshingly simple and secure alternative.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 p-8 text-left rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-6">{benefit.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {benefit.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
