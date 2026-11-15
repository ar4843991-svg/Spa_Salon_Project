
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import velouraLogo from "../assets/veloura-logo.png";

function Footer() {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
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

  const columns = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", to: "/" },
        { name: "About Us", to: "/about" },
        { name: "Services", to: "/services" },
        { name: "Contact", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#292D28] px-6 py-14 text-[#F5F0E8] md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="inline-block">
              <div className="rounded-xl bg-[#F5F0E8] p-2">
                <img
                  src={velouraLogo}
                  alt="Veloura Beauty Logo"
                  className="h-20 w-40 object-contain"
                />
              </div>
            </Link>
          </motion.div>

          <p className="mt-6 max-w-xs text-sm leading-7 text-gray-300">
            Discover beauty, relaxation and self-care in an elegant
            and peaceful environment.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="mb-5 font-serif text-xl text-[#D9CBB8]">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            {columns[0].items.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.to}
                  className="inline-block transition hover:text-[#D9CBB8]"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-5 font-serif text-xl text-[#D9CBB8]">
            Our Services
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            {[
              "Hair Styling",
              "Facial & Skin Care",
              "Professional Makeup",
              "Spa & Massage",
              "Nail Art",
            ].map((service, index) => (
              <motion.span
                key={index}
                whileHover={{ x: 6, color: "#D9CBB8" }}
                transition={{ duration: 0.2 }}
              >
                {service}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.45 }}
        >
          <h3 className="mb-5 font-serif text-xl text-[#D9CBB8]">
            Contact Us
          </h3>

          <div className="space-y-4 text-sm text-gray-300">
            <p>info@velourabeauty.com</p>
            <p>+92 300 1234567</p>
            <p>Monday – Saturday</p>
            <p>10:00 AM – 8:00 PM</p>
          </div>

          <motion.div
            className="mt-6 inline-block"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/booking"
              className="inline-block rounded-full bg-[#71816A] px-6 py-3 text-sm text-white transition hover:bg-[#596950]"
            >
              Book Appointment
            </Link>
          </motion.div>
        </motion.div>

      </div>

      {/* Animated Copyright */}
      <motion.div
        className="mx-auto mt-12 max-w-7xl border-t border-[#596950] pt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} VELOURA BEAUTY. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
