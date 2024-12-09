const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", async (req, res) => {
  const {
    keyword = "",
    source = "",
    destination = "",
    peopleCount,
    luxuryLevel,
  } = req.query;

  try {
    // Map luxury level to numeric values
    const luxuryMapping = {
      cheap: 30,
      economic: 60,
      business: 100,
    };

    const luxuryValue = luxuryMapping[luxuryLevel] || 100; // Default to max luxury level

    // Map people count to vehicle size
    let vehicleSize = "Large";
    if (peopleCount) {
      const count = parseInt(peopleCount, 10);
      if (count <= 3) vehicleSize = "Small";
      else if (count <= 6) vehicleSize = "Medium";
      else if (count <= 10) vehicleSize = "Large";
    }

    let rows = [];

    if (keyword.trim() !== "") {
      // Simple query for keyword search
      const simpleQuery = `
        SELECT 
          dr.empID,
          dr.Phone,
          dr.Email,
          dr.Address,
          dr.Ratings
        FROM 
          Driver dr
        WHERE 
          dr.Email LIKE ? OR dr.Address LIKE ?
      `;

      const simpleParams = [`%${keyword}%`, `%${keyword}%`];
      [rows] = await db.query(simpleQuery, simpleParams);
    } else {
      const complexQuery = `
        WITH FilteredDrivers AS (
          SELECT 
            dr.empID,
            dr.VIN,
            dr.Phone,
            dr.Email,
            TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(dr.Address, ',', 2), ',', -1)) AS City,
            dr.Address,
            dr.Pricing,
            dr.Ratings
          FROM 
            Driver dr
          WHERE 
            (TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(dr.Address, ',', 2), ',', -1)) = ?
            OR TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(dr.Address, ',', 2), ',', -1)) = ?)
            AND dr.Pricing <= ?
        ),
        FilteredVehicles AS (
          SELECT 
            v.VIN,
            vt.ProductID,
            vt.Size,
            vt.Type AS VehicleType,
            vt.BrandName AS VehicleBrand
          FROM 
            Vehicle v
          JOIN 
            VehicleType vt ON v.VehicleTypeID = vt.ProductID
          WHERE 
            vt.Size = ?
        ),
        DriverAggregations AS (
          SELECT 
            fd.City,
            ROUND(AVG(fd.Ratings), 2) AS AvgRating,
            COUNT(fd.empID) AS TotalDrivers
          FROM 
            FilteredDrivers fd
          GROUP BY 
            fd.City
        )
        SELECT 
          fd.empID,
          fd.Phone,
          fd.Email,
          fd.Address,
          fd.Ratings,
          fv.VehicleType AS VehicleName,
          fv.VehicleBrand,
          fv.Size AS VehicleSize,
          da.AvgRating AS AverageCityRating,
          da.TotalDrivers AS DriversInCity,
          RANK() OVER (PARTITION BY fd.City ORDER BY fd.Ratings DESC) AS CityRatingRank
        FROM 
          FilteredDrivers fd
        JOIN 
          FilteredVehicles fv ON fd.VIN = fv.VIN
        JOIN 
          DriverAggregations da ON fd.City = da.City
        ORDER BY 
          fd.Ratings DESC;
      `;

      const complexParams = [
        `${source}`, // Match source city
        `${destination}`, // Match destination city
        luxuryValue, // Pricing threshold based on luxury level
        vehicleSize, // Vehicle size filter based on people count
      ];

      [rows] = await db.query(complexQuery, complexParams);
    }
    // Format the results into a frontend-friendly structure
    const formattedRows = rows.map((row) => ({
      empID: row.empID,
      phone: row.Phone,
      email: row.Email,
      address: row.Address,
      ratings: row.Ratings,
      vehicleName: row.VehicleName,
      vehicleBrand: row.VehicleBrand,
      vehicleSize: row.VehicleSize,
      averageCityRating: row.AverageCityRating || null,
      driversInCity: row.DriversInCity || null,
      cityRatingRank: row.CityRatingRank || null,
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.post("/create", async (req, res) => {
  const { Phone, Email, Address } = req.body;

  if (!Phone || !Email || !Address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = "INSERT INTO Driver (Phone, Email, Address) VALUES (?, ?, ?)";
    const result = await db.query(query, [Phone, Email, Address]);

    res.status(201).json({
      success: true,
      message: "Driver created successfully",
      driverID: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Delete the driver from the database using their email
    const query = "DELETE FROM Driver WHERE Email = ?";
    const [result] = await db.query(query, [email]);

    if (result.affectedRows === 0) {
      // No rows were deleted, meaning the email does not exist
      return res
        .status(404)
        .json({ success: false, message: "Driver not found." });
    }

    // Return success response
    res.json({ success: true, message: "Driver deleted successfully." });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the driver.",
    });
  }
});

module.exports = router;
