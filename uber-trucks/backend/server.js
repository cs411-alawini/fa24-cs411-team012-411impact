const express = require("express");
const cors = require("cors");
const driversRoute = require("./routes/drivers");
const userRoutes = require("./routes/user");
const rideRoutes = require("./routes/ride");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/drivers", driversRoute);

app.use("/api/user", userRoutes);

app.use("/api/rides", rideRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
