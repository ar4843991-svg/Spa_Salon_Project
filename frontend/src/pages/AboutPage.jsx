
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import About from "../components/About";

function AboutPage() {
  const values = [
    {
      icon: "✦",
      title: "Our Mission",
      description:
        "To provide a welcoming beauty experience through professional care and quality services.",
    },
    {
      icon: "♡",
      title: "Our Vision",
      description:
        "To create a relaxing space where every customer feels valued and cared for.",
    },
    {
      icon: "❀",
      title: "Our Values",
      description:
        "We believe in customer satisfaction, professionalism, comfort and attention to detail.",
    },
  ];

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

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      {/* Animated About Hero */}
      <section className="relative overflow-hidden bg-[#292D28] px-5 py-20 text-center text-white sm:px-8 sm:py-28">
        <motion.div
          className="relative z-10 mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-xs font-semibold uppercase tracking-[5px] text-[#D9CBB8]"
          >
            Get To Know Us
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl"
          >
            About Veloura Beauty
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:text-base"
          >
            Beauty, wellness and professional care come
            together to create a relaxing experience.
          </motion.p>

          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              to="/booking"
              className="mt-9 inline-block rounded-full bg-[#D9CBB8] px-8 py-3.5 text-sm font-semibold text-[#292D28] transition hover:bg-white"
            >
              Book Your Experience
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </section>

      {/* About Component */}
      <About />

      {/* Animated Mission Vision Values */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <motion.div
            className="mb-12 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#71816A]">
              What We Believe
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">
              Our Purpose & Values
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600">
              Everything we do is guided by our commitment
              to beauty, comfort and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="rounded-2xl border border-[#D9CBB8] bg-[#F5F0E8] p-7 text-center shadow-sm hover:shadow-lg sm:p-9"
              >
                <motion.div
                  className="mb-5 text-4xl text-[#71816A]"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>

                <h3 className="mb-4 font-serif text-2xl">
                  {value.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Bottom CTA */}
      <section className="bg-[#71816A] px-5 py-16 text-center text-white sm:px-8 sm:py-20">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 45 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">
            Your Self-Care Journey Starts Here
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-100">
            Give yourself a moment to relax, refresh and enjoy
            the Veloura Beauty experience.
          </p>

          <motion.div
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              to="/booking"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#292D28] transition hover:bg-[#D9CBB8]"
            >
              Book Appointment
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutPage;
