
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

function Services() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const services = [
    {
      name: "Hair Styling",
      description: "Beautiful hairstyles for your special moments.",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
    },
    {
      name: "Facial & Skin Care",
      description: "Refresh your skin with our relaxing treatments.",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800",
    },
    {
      name: "Professional Makeup",
      description: "Enhance your natural beauty with expert makeup.",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800",
    },
    {
      name: "Spa & Massage",
      description: "Relax your mind and enjoy peaceful moments.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
    },
    {
      name: "Manicure & Pedicure",
      description: "Give your hands and feet a refreshing treatment.",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
    },
    {
      name: "Nail Art",
      description:
        "Add a creative touch to your nails with beautiful designs.",
      image:
        "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=800",
    },
    {
      name: "Bridal Makeup",
      description: "Elegant bridal looks for your unforgettable day.",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
    },
    {
      name: "Hair Treatment",
      description: "Nourishing care to keep your hair looking healthy.",
      image:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800",
    },
  ];

  const filteredServices = services.filter((service) =>
    `${service.name} ${service.description}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[#F5F0E8] px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Search Results */}
        {search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center sm:mb-10"
          >
            <p className="text-sm text-gray-600 sm:text-base">
              Search results for:
              <span className="ml-2 break-words font-semibold text-[#71816A]">
                {search}
              </span>
            </p>

            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              {filteredServices.length} service(s) found
            </p>
          </motion.div>
        )}

        {/* Services Grid */}
        {filteredServices.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.name}
                variants={cardVariants}
                whileHover={{
                  y: -9,
                  transition: { duration: 0.3 },
                }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Service Image */}
                <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/3]">
                  <motion.img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Service Details */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="mb-3 font-serif text-xl text-[#292D28] sm:text-2xl">
                    {service.name}
                  </h3>

                  <p className="mb-6 flex-1 text-sm leading-6 text-gray-500">
                    {service.description}
                  </p>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-fit"
                  >
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 border-b border-[#71816A] pb-1 text-sm font-semibold text-[#71816A] transition-colors hover:border-[#292D28] hover:text-[#292D28]"
                    >
                      Book Now
                      <span aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white px-5 py-14 text-center shadow-sm sm:px-8 sm:py-16"
          >
            <h3 className="font-serif text-2xl text-[#292D28] sm:text-3xl">
              No Services Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              We couldn't find a matching service.
              Try searching another service name.
            </p>

            <Link
              to="/services"
              className="mt-6 inline-block rounded-full bg-[#71816A] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#596950]"
            >
              View All Services
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Services;
