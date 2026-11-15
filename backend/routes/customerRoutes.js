const express = require("express");
const bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Customer Registration
// Customer Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingCustomer = await Customer.findOne({
      email: normalizedEmail
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password: hashedPassword
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer registered successfully"
    });

  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});
// Customer Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      customer.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
  { id: customer._id, role: "customer" },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

   res.status(200).json({
  message: "Login successful",
  token: token,
  customer: {
    id: customer._id,
    name: customer.name,
    email: customer.email
  }
});

  } catch (error) {
    res.status(500).json({
      message: "Login failed"
    });
  }
});

// Get All Customers - Admin Only
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find().select("-password");

    res.status(200).json({
      message: "Customers fetched successfully",
      customers
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers"
    });
  }
});

// Update Customer - Admin Only
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update customer"
    });
  }
});


// Delete Customer - Admin Only
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer"
    });
  }
});

module.exports = router;