const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },

  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);