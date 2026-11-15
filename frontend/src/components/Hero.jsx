
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
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
      scale: 0.9,
      x: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="overflow-hidden bg-[#F5F0E8] px-4 pt-0 pb-6 sm:px-6 sm:pt-1 md:pb-8 lg:px-10 lg:pt-2 lg:pb-10">
      <div className="mx-auto grid max-w-6xl items-center gap-7 lg:grid-cols-2 lg:gap-10">

        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >

          {/* Welcome Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#D9CBB8] px-5 py-2"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-[#71816A]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#71816A] sm:text-xs">
              Welcome to Veloura Beauty
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl font-medium leading-tight text-[#292D28] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Discover Your
            <br />
            <span className="italic text-[#71816A]">
              Natural Beauty
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#666B61] sm:text-base lg:mx-0"
          >
            Experience the perfect blend of beauty, relaxation and
            self-care. Let our expert team make every visit special
            in a peaceful and elegant environment.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/booking"
                className="block rounded-full bg-[#71816A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#71816A]/20 transition-colors duration-300 hover:bg-[#596950]"
              >
                Book Your Appointment →
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/services"
                className="block rounded-full border border-[#71816A] px-7 py-3.5 text-sm font-semibold text-[#71816A] transition-colors duration-300 hover:bg-[#71816A] hover:text-white"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom Details */}
          <motion.div
            variants={containerVariants}
            className="mt-7 flex flex-wrap justify-center gap-6 border-t border-[#D9CBB8] pt-5 lg:justify-start"
          >
            {[
              {
                title: "Beauty",
                description: "Expert Care",
              },
              {
                title: "Relax",
                description: "Peaceful Space",
              },
              {
                title: "Glow",
                description: "Feel Confident",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <h3 className="font-serif text-xl text-[#71816A]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] tracking-wider text-[#777B72]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="relative order-1 mx-auto -mt-8 w-full max-w-sm sm:-mt-10 lg:order-2 lg:-mt-12 lg:max-w-full"
        >
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#D9CBB8]/60 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-white shadow-2xl">
            <motion.img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1200"
              alt="Luxury spa and relaxation experience"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.8 }}
              className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
            />
          </div>

          {/* Floating Label */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            whileHover={{ y: -5 }}
            className="absolute -bottom-3 left-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl sm:-left-4 sm:px-5"
          >
            <p className="font-serif text-sm text-[#71816A] sm:text-base">
              Your Beauty, Our Passion
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[1.5px] text-[#777B72]">
              Beauty • Relaxation • Wellness
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
