const express = require("express");
const Staff = require("../models/Staff");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add New Staff
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, speciality } = req.body;

    if (!name || !email || !phone || !speciality) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newStaff = new Staff({
      name,
      email,
      phone,
      speciality
    });

    await newStaff.save();

    res.status(201).json({
      message: "Staff added successfully",
      staff: newStaff
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add staff"
    });
  }
});



// Update Staff Availability - Admin Only
router.put("/availability/:id", authMiddleware, async (req, res) => {
  try {
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({
        message: "isAvailable must be true or false"
      });
    }

    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found"
      });
    }

    staff.isAvailable = isAvailable;
    await staff.save();

    res.status(200).json({
      message: "Staff availability updated successfully",
      staff
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update staff availability"
    });
  }
});


// Get All Staff
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();

    res.status(200).json({
      message: "Staff fetched successfully",
      staff
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch staff"
    });
  }
});

// Update Staff Details - Admin Only
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, speciality } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, speciality },
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found"
      });
    }

    res.status(200).json({
      message: "Staff updated successfully",
      staff
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update staff"
    });
  }
});

// Delete Staff - Admin Only
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found"
      });
    }

    res.status(200).json({
      message: "Staff deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete staff"
    });
  }
});

module.exports = router;