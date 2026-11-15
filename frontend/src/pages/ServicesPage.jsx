
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Services from "../components/Services";

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      {/* Animated Page Heading */}
      <motion.div
        className="px-4 py-10 text-center sm:px-6 sm:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={{
          hidden: {
            opacity: 0,
            y: 40,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#71816A] sm:text-sm"
        >
          Explore Our Services
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0 },
          }}
          className="font-serif text-3xl text-[#292D28] sm:text-4xl md:text-5xl"
        >
          All Our Services
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base"
        >
          Discover our professional spa and salon treatments,
          designed to refresh your beauty and wellness.
        </motion.p>
      </motion.div>

      {/* Services Component */}
      <Services />
    </div>
  );
}

export default ServicesPage;
