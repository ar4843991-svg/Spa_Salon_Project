const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const Customer = require("../models/Customer");
const Service = require("../models/Service");
const Staff = require("../models/Staff");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Admin Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Admin registration failed"
    });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
  { id: admin._id, role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

   res.status(200).json({
  message: "Admin login successful",
  token: token,
  admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email
  }
});

  } catch (error) {
    res.status(500).json({
      message: "Admin login failed"
    });
  }
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to Admin Dashboard!",
    admin: req.admin
  });
});

// Admin Dashboard Statistics
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const [
      totalCustomers,
      totalAppointments,
      totalServices,
      totalStaff
    ] = await Promise.all([
      Customer.countDocuments(),
      Appointment.countDocuments(),
      Service.countDocuments(),
      Staff.countDocuments()
    ]);

    res.status(200).json({
      message: "Dashboard statistics fetched successfully",
      stats: {
        totalCustomers,
        totalAppointments,
        totalServices,
        totalStaff
      }
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics"
    });
  }
});

module.exports = router;