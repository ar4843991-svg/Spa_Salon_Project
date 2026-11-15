
const express = require("express");
const Service = require("../models/Service");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add New Service
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      duration === undefined ||
      Number(price) < 0 ||
      Number(duration) <= 0
    ) {
      return res.status(400).json({
        message: "Please provide valid service details"
      });
    }

    const newService = new Service({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      duration: Number(duration)
    });

    await newService.save();

    res.status(201).json({
      message: "Service added successfully",
      service: newService
    });
  } catch (error) {
    console.error("Add Service Error:", error);
    res.status(500).json({
      message: "Failed to add service"
    });
  }
});

// Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      message: "Services fetched successfully",
      services
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services"
    });
  }
});

// Update Service
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      duration === undefined ||
      !Number.isFinite(Number(price)) ||
      !Number.isFinite(Number(duration)) ||
      Number(price) < 0 ||
      Number(duration) <= 0
    ) {
      return res.status(400).json({
        message: "Please provide valid service details"
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        duration: Number(duration)
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService
    });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({
      message: "Failed to update service"
    });
  }
});

// Delete Service
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(
      req.params.id
    );

    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.status(200).json({
      message: "Service deleted successfully"
    });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({
      message: "Failed to delete service"
    });
  }
});

module.exports = router;
