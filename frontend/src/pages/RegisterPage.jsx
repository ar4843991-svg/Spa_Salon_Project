
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/api/customers/register", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      setSuccess(response.data.message || "Registration successful!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#71816A] focus:ring-2 focus:ring-[#71816A]/10";

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
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

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex min-h-[260px] flex-col justify-center overflow-hidden bg-cover bg-center px-7 py-12 text-white sm:min-h-[320px] sm:px-12 lg:min-h-full lg:px-14"
            style={{
              backgroundImage:
                "linear-gradient(rgba(35,40,32,0.75), rgba(35,40,32,0.75)), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200')",
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={formContainer}
            >
              <motion.p
                variants={formItem}
                className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-[#D9CBB8]"
              >
                Welcome to Veloura
              </motion.p>

              <motion.h2
                variants={formItem}
                className="max-w-md font-serif text-4xl leading-tight sm:text-5xl"
              >
                Your Beauty Journey Starts Here
              </motion.h2>

              <motion.p
                variants={formItem}
                className="mt-6 max-w-md text-sm leading-7 text-gray-200"
              >
                Create your account and discover a beautiful
                experience of relaxation, beauty and self-care.
              </motion.p>

              <motion.div
                variants={formItem}
                className="mt-8 border-t border-white/30 pt-6"
              >
                <p className="font-serif text-xl tracking-widest">
                  VELOURA BEAUTY
                </p>

                <p className="mt-2 text-xs tracking-[3px] text-[#D9CBB8]">
                  BEAUTY • CARE • RELAXATION
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
          >
            {/* Form Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-8"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#71816A]">
                Join Our Community
              </p>

              <h1 className="font-serif text-3xl sm:text-4xl">
                Create Account
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Fill in your details to create your Veloura account.
              </p>
            </motion.div>

            {/* Registration Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={formContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="space-y-5"
            >
              <motion.div variants={formItem}>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
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
              </motion.div>

              <motion.div variants={formItem}>
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
              </motion.div>

              <motion.div variants={formItem}>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  autoComplete="tel"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={formItem}>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={formItem}>
                <label className="mb-2 block text-sm font-medium">
                  Confirm Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </motion.div>

              {/* Show Password */}
              <motion.label
                variants={formItem}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="accent-[#71816A]"
                />
                Show password
              </motion.label>

              {/* Error and Success Messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div variants={formItem}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-full bg-[#71816A] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#596950] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Account..." : "Create My Account →"}
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="mt-7 border-t border-[#D9CBB8] pt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#71816A] hover:underline"
                >
                  Login
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
