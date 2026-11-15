require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes = require("./routes/staffRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");



const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use("/api/customers", customerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
    console.log("Database Name:", mongoose.connection.name);

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Spa & Salon Backend is Running!");
});