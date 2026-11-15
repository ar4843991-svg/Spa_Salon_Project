
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function BookingPage() {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [staff, setStaff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [services, setServices] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const [serviceResponse, staffResponse] = await Promise.all([
          API.get("/api/services"),
          API.get("/api/staff"),
        ]);

        setServices(serviceResponse.data.services || []);

        const availableStaff = (
          staffResponse.data.staff || []
        ).filter((member) => member.isAvailable !== false);

        setStaffMembers(availableStaff);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load services and staff. Please try again."
        );
      } finally {
        setLoadingData(false);
      }
    }

    fetchBookingData();
  }, []);

  const today = new Date().toLocaleDateString("en-CA");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!localStorage.getItem("customerToken")) {
      navigate("/login");
      return;
    }

    if (!service || !staff || !date || !time) {
      setError("Please complete all booking fields.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await API.post("/api/appointments/book", {
        service,
        staff,
        date,
        time,
      });

      setSuccess(
        response.data.message || "Appointment booked successfully!"
      );

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Booking failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const selectedService = services.find(
    (item) => item._id === service
  );

  const selectedStaff = staffMembers.find(
    (item) => item._id === staff
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const formContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const formItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">

          {/* Page Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[5px] text-[#71816A]">
              Your Moment of Beauty
            </p>

            <h1 className="font-serif text-4xl md:text-6xl">
              Book Your Appointment
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">
              Take a moment for yourself. Choose your preferred
              treatment and let us take care of the rest.
            </p>
          </motion.div>

          {/* Booking Layout */}
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-5">

            {/* Left Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col justify-between bg-[#292D28] p-8 text-white md:col-span-2 md:p-10"
            >
              <div>
                <p className="mb-5 text-xs uppercase tracking-[4px] text-[#D9CBB8]">
                  VELOURA BEAUTY
                </p>

                <h2 className="font-serif text-3xl leading-snug md:text-4xl">
                  Your Beauty,
                  <br />
                  Your Time.
                </h2>

                <p className="mt-6 text-sm leading-7 text-gray-300">
                  Experience professional beauty treatments
                  in a peaceful and welcoming environment.
                  Your self-care journey starts here.
                </p>
              </div>

              <div className="mt-12 border-t border-white/20 pt-7">
                <p className="mb-4 text-xs uppercase tracking-[3px] text-[#D9CBB8]">
                  Booking Summary
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Service</span>
                    <span className="text-right">
                      {selectedService?.name || "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Staff</span>
                    <span className="text-right">
                      {selectedStaff?.name || "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Date</span>
                    <span>{date || "Not selected"}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Time</span>
                    <span>{time || "Not selected"}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-7 md:col-span-3 md:p-12"
            >
              <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#71816A]">
                  Appointment Details
                </p>

                <h2 className="font-serif text-3xl">
                  Reserve Your Visit
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {loadingData ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-10 text-center text-sm text-gray-500"
                >
                  Loading services and staff...
                </motion.p>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  variants={formContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  className="space-y-6"
                >
                  <motion.div variants={formItem}>
                    <label className="mb-2 block text-sm font-medium">
                      Select Service
                    </label>

                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/50 px-4 py-4 text-sm outline-none transition focus:border-[#71816A]"
                    >
                      <option value="">Choose your service</option>

                      {services.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name} - Rs. {item.price}
                        </option>
                      ))}
                    </select>

                    {services.length === 0 && (
                      <p className="mt-2 text-xs text-red-600">
                        No services available. Please contact the salon.
                      </p>
                    )}
                  </motion.div>

                  <motion.div variants={formItem}>
                    <label className="mb-2 block text-sm font-medium">
                      Select Staff
                    </label>

                    <select
                      value={staff}
                      onChange={(e) => setStaff(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/50 px-4 py-4 text-sm outline-none transition focus:border-[#71816A]"
                    >
                      <option value="">Choose your preferred staff</option>

                      {staffMembers.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name} - {item.speciality}
                        </option>
                      ))}
                    </select>

                    {staffMembers.length === 0 && (
                      <p className="mt-2 text-xs text-red-600">
                        No staff members are currently available.
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={formItem}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Appointment Date
                      </label>

                      <input
                        type="date"
                        min={today}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/50 px-4 py-4 text-sm outline-none focus:border-[#71816A]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Appointment Time
                      </label>

                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/50 px-4 py-4 text-sm outline-none focus:border-[#71816A]"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={formItem}>
                    <motion.button
                      type="submit"
                      disabled={
                        submitting ||
                        services.length === 0 ||
                        staffMembers.length === 0
                      }
                      whileHover={
                        !submitting
                          ? { scale: 1.02, y: -2 }
                          : {}
                      }
                      whileTap={{ scale: 0.97 }}
                      className="w-full rounded-full bg-[#71816A] px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-[#596950] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting
                        ? "Submitting Booking..."
                        : "Continue Booking →"}
                    </motion.button>
                  </motion.div>

                  <motion.p
                    variants={formItem}
                    className="text-center text-xs leading-6 text-gray-500"
                  >
                    Your appointment will be submitted for confirmation.
                  </motion.p>
                </motion.form>
              )}
            </motion.div>
          </div>

          {/* Contact Link */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Need help?{" "}
            <Link
              to="/contact"
              className="font-semibold text-[#71816A] underline"
            >
              Contact Us
            </Link>
          </motion.p>
        </div>
      </section>
    </div>
  );
}

export default BookingPage;
