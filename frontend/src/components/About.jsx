
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -70,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">

        {/* Animated About Image */}
        <motion.div
          className="relative mx-auto w-full max-w-xl md:max-w-none"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <div className="overflow-hidden rounded-2xl shadow-lg sm:rounded-3xl">
            <motion.img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000"
              alt="Veloura Beauty Spa"
              loading="lazy"
              className="h-[280px] w-full object-cover sm:h-[380px] md:h-[420px] lg:h-[480px]"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {/* Floating Animated Badge */}
          <motion.div
            className="absolute -bottom-4 right-2 rounded-xl bg-[#71816A] px-5 py-4 text-white shadow-lg sm:-bottom-5 sm:right-4 sm:rounded-2xl sm:px-7 sm:py-5 md:-right-5"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            animate={{ y: [0, -8, 0] }}
          >
            <p className="font-serif text-xl sm:text-2xl">
              Beauty &
            </p>

            <p className="text-[10px] tracking-[3px] sm:text-sm sm:tracking-widest">
              WELLNESS
            </p>
          </motion.div>
        </motion.div>

        {/* Animated About Content */}
        <motion.div
          className="pt-5 md:pt-0 md:pl-3 lg:pl-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#71816A] sm:tracking-[5px]">
            About Veloura
          </p>

          <h2 className="mb-5 font-serif text-3xl leading-tight text-[#292D28] sm:text-4xl md:text-4xl lg:text-5xl">
            Your Beauty, Our
            <span className="block italic text-[#71816A]">
              Passion
            </span>
          </h2>

          <p className="mb-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            Welcome to VELOURA BEAUTY, where beauty meets
            relaxation. We believe every person deserves a
            little time to refresh, relax and feel confident.
          </p>

          <p className="mb-7 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            From professional hair styling and makeup to
            soothing spa treatments, our goal is to make
            every visit a special experience in a peaceful
            and elegant environment.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/about"
              className="inline-block rounded-full bg-[#71816A] px-7 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#596950] sm:px-8 sm:py-3.5"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
