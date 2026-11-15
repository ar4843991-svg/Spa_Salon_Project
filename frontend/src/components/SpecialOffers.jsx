
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SpecialOffers() {
  const offers = [
    {
      name: "Glow & Refresh",
      subtitle: "Facial + Skin Care",
      price: "Rs. 2,500",
      description: "A refreshing facial experience for your self-care routine.",
    },
    {
      name: "Beauty Essentials",
      subtitle: "Hair Styling + Manicure",
      price: "Rs. 3,500",
      description: "Enjoy two beauty services in one special package.",
    },
    {
      name: "Relax & Unwind",
      subtitle: "Spa + Massage",
      price: "Rs. 4,500",
      description: "Take a relaxing break with our spa experience.",
    },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#292D28] px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Animated Heading */}
        <motion.div
          className="mb-14 text-center"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[5px] text-[#D9CBB8]">
            Something Special
          </p>

          <h2 className="font-serif text-4xl text-white md:text-5xl">
            Special Offers
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-300">
            Explore our special beauty packages and enjoy
            a little extra care.
          </p>
        </motion.div>

        {/* Animated Offer Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="rounded-2xl border border-[#71816A] bg-[#F5F0E8] p-8 text-center shadow-lg"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[3px] text-[#71816A]">
                Special Package
              </p>

              <h3 className="font-serif text-2xl text-[#292D28]">
                {offer.name}
              </h3>

              <p className="mt-3 text-sm text-[#71816A]">
                {offer.subtitle}
              </p>

              <div className="my-6 border-y border-[#D9CBB8] py-5">
                <p className="font-serif text-3xl text-[#292D28]">
                  {offer.price}
                </p>
              </div>

              <p className="mb-8 text-sm leading-7 text-gray-600">
                {offer.description}
              </p>

              <Link
                to="/booking"
                className="inline-block rounded-full bg-[#71816A] px-8 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#292D28] hover:shadow-lg"
              >
                Book This Package
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SpecialOffers;
