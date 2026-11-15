
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await API.post("/api/customers/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, customer } = response.data;

      localStorage.setItem("customerToken", token);
      localStorage.setItem("customerInfo", JSON.stringify(customer));

      navigate("/my-bookings");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#D9CBB8] bg-[#F5F0E8]/50 px-4 py-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#71816A] focus:ring-2 focus:ring-[#71816A]/10";

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
        staggerChildren: 0.15,
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

          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex min-h-[260px] flex-col justify-center bg-cover bg-center px-7 py-12 text-white sm:min-h-[320px] sm:px-12 lg:min-h-full lg:px-14"
            style={{
              backgroundImage:
                "linear-gradient(rgba(35,40,32,0.75), rgba(35,40,32,0.75)), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200')",
            }}
          >
            <motion.div
              variants={formContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <motion.p
                variants={formItem}
                className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-[#D9CBB8]"
              >
                VELOURA BEAUTY
              </motion.p>

              <motion.h2
                variants={formItem}
                className="max-w-md font-serif text-4xl leading-tight sm:text-5xl"
              >
                Welcome Back
                <br />
                To Your Beauty Space
              </motion.h2>

              <motion.p
                variants={formItem}
                className="mt-6 max-w-md text-sm leading-7 text-gray-200"
              >
                Your self-care journey continues here.
                Login to manage your appointments and
                explore our beauty services.
              </motion.p>

              <motion.div
                variants={formItem}
                className="mt-8 border-t border-white/30 pt-6"
              >
                <p className="font-serif text-xl tracking-widest">
                  BEAUTY • CARE • RELAXATION
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          >
            {/* Form Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-9"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#71816A]">
                Welcome Back
              </p>

              <h1 className="font-serif text-3xl sm:text-4xl">
                Customer Login
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your details to access your account.
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={formContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-6"
            >
              <motion.div variants={formItem}>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={formItem}>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
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

              {/* Error Message */}
              <AnimatePresence>
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
              </AnimatePresence>

              {/* Login Button */}
              <motion.div variants={formItem}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-full bg-[#71816A] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#596950] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Logging In..." : "Login to Your Account →"}
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="mt-8 border-t border-[#D9CBB8] pt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#71816A] hover:underline"
                >
                  Register Now
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
