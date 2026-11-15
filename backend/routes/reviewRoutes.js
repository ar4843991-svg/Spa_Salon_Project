const express = require("express");
const Review = require("../models/Review");
const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Customer Review
router.post("/add", async (req, res) => {
  try {
    const { customer, appointment, rating, comment } = req.body;

    if (!customer || !appointment || !rating || !comment) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const completedAppointment = await Appointment.findOne({
      _id: appointment,
      customer: customer,
      status: "Completed"
    });

    if (!completedAppointment) {
      return res.status(400).json({
        message: "Review is allowed only after completed appointment"
      });
    }

    const newReview = new Review({
      customer,
      appointment,
      rating,
      comment
    });

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully",
      review: newReview
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add review"
    });
  }
});


// Get All Reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name")
      .populate("appointment");

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews"
    });
  }
});

// Get All Reviews - Admin Only
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name email")
      .populate("appointment");

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews"
    });
  }
});


// Delete Review - Admin Only
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    res.status(200).json({
      message: "Review deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review"
    });
  }
});

module.exports = router;