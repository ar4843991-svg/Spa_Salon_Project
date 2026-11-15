
const express = require("express");
const Appointment = require("../models/Appointment");
const Staff = require("../models/Staff");

const authMiddleware = require("../middleware/authMiddleware");
const customerAuthMiddleware = require("../middleware/customerAuthMiddleware");

const router = express.Router();

// Book Appointment - Customer Only
router.post("/book", customerAuthMiddleware, async (req, res) => {
  try {
    const { service, staff, date, time } = req.body;

    // Check required fields
    if (!service || !staff || !date || !time) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        message: "Invalid booking date"
      });
    }

    // Get today's date in local timezone
    const today = new Date();

    const todayString =
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    // Validate actual calendar date
    const bookingDate = new Date(`${date}T00:00:00`);

    if (
      isNaN(bookingDate.getTime()) ||
      bookingDate.getFullYear() !== Number(date.slice(0, 4)) ||
      bookingDate.getMonth() + 1 !== Number(date.slice(5, 7)) ||
      bookingDate.getDate() !== Number(date.slice(8, 10))
    ) {
      return res.status(400).json({
        message: "Invalid booking date"
      });
    }

    // Prevent past date booking
    if (date < todayString) {
      return res.status(400).json({
        message: "You cannot book an appointment for a past date."
      });
    }

    // Check staff availability
const selectedStaff = await Staff.findById(staff);

if (!selectedStaff) {
  return res.status(404).json({
    message: "Staff member not found"
  });
}

if (!selectedStaff.isAvailable) {
  return res.status(400).json({
    message: "This staff member is currently unavailable."
  });
}

    // Check for existing booking
    const existingAppointment = await Appointment.findOne({
      staff,
      date: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`)
      },
      time,
      status: { $in: ["Pending", "Confirmed"] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This staff member is already booked at this time."
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      customer: req.customer.id,
      service,
      staff,
      date,
      time
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      message: "Failed to book appointment"
    });
  }
});

// Get All Appointments - Admin Only
router.get("/", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("customer", "name email")
      .populate("service", "name price duration")
      .populate("staff", "name speciality");

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments"
    });
  }
});

// Get One Customer's Appointments
router.get("/customer/:customerId", customerAuthMiddleware, async (req, res) => {
  try {
    if (req.params.customerId !== req.customer.id) {
      return res.status(403).json({
        message: "You can only view your own bookings."
      });
    }

    const appointments = await Appointment.find({
      customer: req.customer.id
    })
      .populate("service", "name price duration")
      .populate("staff", "name speciality");

    res.status(200).json({
      message: "Customer appointments fetched successfully",
      appointments
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer appointments"
    });
  }
});

// Customer Cancel Appointment
router.put("/cancel/:id", customerAuthMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    if (appointment.customer.toString() !== req.customer.id) {
      return res.status(403).json({
        message: "You can only cancel your own appointment."
      });
    }

    if (
      appointment.status === "Completed" ||
      appointment.status === "Cancelled"
    ) {
      return res.status(400).json({
        message: "This appointment cannot be cancelled"
      });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel appointment"
    });
  }
});

// Update Appointment Status - Admin Only
router.put("/update-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid appointment status"
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment status"
    });
  }
});

module.exports = router;
