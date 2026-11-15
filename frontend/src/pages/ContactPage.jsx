
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Your message form is ready. Backend connection will be added next.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  const inputClass =
    "w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/40 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#71816A] focus:ring-2 focus:ring-[#71816A]/10";

  const contactItems = [
    {
      icon: "⌖",
      title: "Our Location",
      detail: "Visit VELOURA BEAUTY at our salon location.",
    },
    {
      icon: "✉",
      title: "Email Address",
      detail: "info@velourabeauty.com",
    },
    {
      icon: "☎",
      title: "Phone Number",
      detail: "+92 300 1234567",
    },
    {
      icon: "◷",
      title: "Opening Hours",
      detail: "Monday – Saturday | 10:00 AM – 8:00 PM",
    },
  ];

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

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      {/* Animated Hero Heading */}
      <motion.section
        className="px-4 py-14 text-center sm:px-6 sm:py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[5px] text-[#71816A]">
          Get In Touch
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl">
          Contact Us
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">
          We'd love to hear from you. Contact our team for
          appointments, questions or more information.
        </p>
      </motion.section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-2">

          {/* Animated Contact Information */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-[#292D28] p-7 text-white sm:p-10 lg:p-12"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative z-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[#D9CBB8]">
                Let's Connect
              </p>

              <h2 className="max-w-md font-serif text-3xl leading-tight sm:text-4xl">
                We'd Love to Hear From You
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
                Have a question or want to book an appointment?
                Get in touch with us. We're happy to help.
              </p>

              <div className="mt-10 grid gap-7 sm:grid-cols-2">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.12,
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#71816A] text-xl text-white"
                    >
                      {item.icon}
                    </motion.div>

                    <div className="min-w-0">
                      <h3 className="mb-2 text-sm font-semibold text-[#D9CBB8]">
                        {item.title}
                      </h3>

                      <p className="break-words text-sm leading-6 text-gray-300">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated Decorative Circles */}
            <motion.div
              className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="pointer-events-none absolute -bottom-16 -right-12 h-48 w-48 rounded-full border border-white/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Animated Contact Form */}
          <motion.div
            className="rounded-3xl border border-[#D9CBB8] bg-white p-6 shadow-sm sm:p-10 lg:p-12"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#71816A]">
                Send A Message
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl">
                Let's Talk
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Fill out the form below and tell us how we can help.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Your Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-[#71816A] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#596950] hover:shadow-lg"
              >
                Send Message →
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Animated Bottom Brand Section */}
      <motion.section
        className="border-t border-[#D9CBB8] bg-white px-5 py-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-serif text-2xl tracking-[5px] text-[#292D28]">
          VELOURA BEAUTY
        </p>

        <p className="mt-3 text-xs tracking-[3px] text-[#71816A]">
          BEAUTY • CARE • RELAXATION
        </p>
      </motion.section>
    </div>
  );
}

export default ContactPage;
