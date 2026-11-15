
import { motion } from "framer-motion";

function WhyChooseUs() {
  const features = [
    {
      icon: "✦",
      title: "Professional Experts",
      description:
        "Our skilled beauty professionals focus on quality and customer satisfaction.",
    },
    {
      icon: "❀",
      title: "Premium Products",
      description:
        "We use carefully selected beauty products for a comfortable experience.",
    },
    {
      icon: "♡",
      title: "Relaxing Environment",
      description:
        "Enjoy a peaceful and welcoming atmosphere during every visit.",
    },
    {
      icon: "✧",
      title: "Personalized Care",
      description:
        "We focus on your preferences and provide services suited to your needs.",
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
    <section className="bg-white px-6 py-20 md:px-12 md:py-24">
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
            The Veloura Experience
          </p>

          <h2 className="font-serif text-4xl text-[#292D28] md:text-5xl">
            Why Choose Us
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">
            Your comfort and satisfaction are at the heart
            of everything we do.
          </p>
        </motion.div>

        {/* Animated Feature Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: index * 0.12 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="rounded-2xl border border-[#D9CBB8] bg-[#F5F0E8] p-8 text-center shadow-sm hover:shadow-lg"
            >
              <motion.div
                className="mb-6 text-4xl text-[#71816A]"
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="mb-4 font-serif text-xl text-[#292D28]">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
