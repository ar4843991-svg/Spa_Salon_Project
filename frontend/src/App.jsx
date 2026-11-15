
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyBookings from "./pages/MyBookings";
import ContactPage from "./pages/ContactPage";

import AdminDashboard from "./admin/AdminDashboard";
import AdminAppointments from "./admin/AdminAppointments";
import AdminCustomers from "./admin/AdminCustomers";
import AdminStaff from "./admin/AdminStaff";
import AdminServices from "./admin/AdminServices";
import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminReviews from "./admin/AdminReviews";

import Footer from "./components/Footer";

function CustomerLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Routes>

        {/* Customer Pages */}
        <Route
          path="/"
          element={<CustomerLayout><Home /></CustomerLayout>}
        />

        <Route
          path="/services"
          element={<CustomerLayout><ServicesPage /></CustomerLayout>}
        />

        <Route
          path="/about"
          element={<CustomerLayout><AboutPage /></CustomerLayout>}
        />

        <Route
          path="/booking"
          element={<CustomerLayout><BookingPage /></CustomerLayout>}
        />

        <Route
          path="/register"
          element={<CustomerLayout><RegisterPage /></CustomerLayout>}
        />

        <Route
          path="/login"
          element={<CustomerLayout><LoginPage /></CustomerLayout>}
        />

        <Route
          path="/my-bookings"
          element={<CustomerLayout><MyBookings /></CustomerLayout>}
        />

        <Route
          path="/contact"
          element={<CustomerLayout><ContactPage /></CustomerLayout>}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin Pages */}
        <Route element={<AdminProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/appointments"
            element={<AdminAppointments />}
          />

          <Route
            path="/admin/customers"
            element={<AdminCustomers />}
          />

          <Route
            path="/admin/staff"
            element={<AdminStaff />}
          />

          <Route
            path="/admin/services"
            element={<AdminServices />}
          />

          <Route
  path="/admin/reviews"
  element={<AdminReviews />}
/>

        </Route>

      </Routes>
    </div>
  );
}

export default App;
