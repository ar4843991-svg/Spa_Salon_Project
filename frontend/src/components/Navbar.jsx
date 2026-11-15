
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import velouraLogo from "../assets/veloura-logo.png";

function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `block py-2 transition-colors duration-300 hover:text-[#71816A] ${
      isActive
        ? "font-semibold text-[#71816A]"
        : "text-[#292D28]"
    }`;

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/services?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.07,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-[#D9CBB8] bg-[#F5F0E8] px-5 py-3 sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center"
          >
            <motion.img
              src={velouraLogo}
              alt="Veloura Beauty Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-12 w-24 object-contain sm:h-14 sm:w-28"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-sm font-medium lg:flex xl:gap-7">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15 + index * 0.1,
              }}
              whileHover={{ y: -2 }}
            >
              <NavLink
                to={item.to}
                end={item.end}
                className={navClass}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Desktop Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden items-center rounded-full border border-[#D9CBB8] bg-white px-4 py-2 md:flex"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-28 bg-transparent text-sm outline-none placeholder:text-gray-400 xl:w-36"
          />

          <button
            type="submit"
            aria-label="Search services"
            className="text-[#71816A] transition hover:text-[#292D28]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </motion.form>

        {/* Desktop Booking Button */}
        <motion.div
          className="hidden shrink-0 lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link
            to="/booking"
            className="block rounded-full bg-[#71816A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#596950]"
          >
            Book Now
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9CBB8] text-[#292D28] transition hover:bg-[#D9CBB8] lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile / Tablet Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t border-[#D9CBB8] lg:hidden"
          >
            <div className="flex flex-col gap-1 pt-4 text-sm font-medium">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={navClass}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Mobile Search */}
            <motion.form
              onSubmit={handleSearch}
              variants={itemVariants}
              className="mt-4 flex w-full items-center rounded-full border border-[#D9CBB8] bg-white px-4 py-3"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                aria-label="Search services"
                className="ml-2 text-[#71816A]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </motion.form>

            {/* Mobile Booking Button */}
            <motion.div
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              className="pb-4"
            >
              <Link
                to="/booking"
                onClick={closeMenu}
                className="mt-4 block rounded-full bg-[#71816A] px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-[#596950]"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
