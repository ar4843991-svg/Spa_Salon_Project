
import { motion } from "framer-motion";

function Testimonials() {
  const reviews = [
    {
      name: "Ayesha Khan",
      service: "Facial & Skin Care",
      message:
        "A wonderful experience! The environment was peaceful and the service was excellent.",
      stars: 5,
    },
    {
      name: "Sarah Ahmed",
      service: "Hair Styling",
      message:
        "I loved the professional service and beautiful atmosphere. Highly recommended!",
      stars: 5,
    },
    {
      name: "Fatima Ali",
      service: "Spa & Massage",
      message:
        "A relaxing experience from start to finish. I would definitely visit again.",
      stars: 5,
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
    <section className="bg-[#F5F0E8] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Animated Heading */}
        <motion.div
          className="mb-14 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[5px] text-[#71816A]">
            Customer Experiences
          </p>

          <h2 className="font-serif text-4xl text-[#292D28] md:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">
            We love making every visit special. Here's what our
            clients say about their experiences.
          </p>
        </motion.div>

        {/* Animated Review Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
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
              className="rounded-2xl border border-[#D9CBB8] bg-white p-8 shadow-sm hover:shadow-lg"
            >
              {/* Animated Stars */}
              <motion.div
                className="mb-5 text-lg tracking-widest text-[#71816A]"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {"★".repeat(review.stars)}
              </motion.div>

              <p className="mb-7 text-sm leading-7 text-gray-600">
                "{review.message}"
              </p>

              <div className="border-t border-[#D9CBB8] pt-5">
                <h3 className="font-serif text-lg text-[#292D28]">
                  {review.name}
                </h3>

                <p className="mt-1 text-xs text-[#71816A]">
                  {review.service}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
