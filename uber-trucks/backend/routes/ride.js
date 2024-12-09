const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Get rides for a specific user by UID
router.get("/", async (req, res) => {
  console.log("Request query:", req.query);
  const { uid } = req.query; // Use
  console.log(uid);
  try {
    // Query to fetch rides for the user's UID
    const ridesQuery = `
      SELECT r.OrderID, r.Date, r.PickupLocation, r.DropoffLocation, r.Price, r.Rating
      FROM Ride r
      WHERE r.UID = ?
    `;
    const [rides] = await db.query(ridesQuery, [uid]);
    console.log(rides);
    res.json(rides);
  } catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ error: "Failed to fetch rides." });
  }
});

router.post("/book", async (req, res) => {
  const { UID, email, pickupLocation, dropoffLocation } = req.body; // Get data from frontend

  try {
    // Begin transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    // Get driver and pricing details
    const [driverDetails] = await connection.query(
      `
      SELECT
        d.empID,
        d.VIN,
        d.Pricing,
        AVG(r.Price) AS AvgPrice
      FROM
        Driver d
      LEFT JOIN
        Ride r ON d.empID = r.empID
      WHERE
        d.Email = ?
      GROUP BY
        d.empID, d.VIN, d.Pricing
      FOR UPDATE
      `,
      [email]
    );

    if (driverDetails.length === 0) {
      throw new Error("Driver not found");
    }

    const { empID, VIN, Pricing, AvgPrice } = driverDetails[0];
    const price = AvgPrice || Pricing;

    // Insert into Ride
    await connection.query(
      `
      INSERT INTO Ride (UID, empID, Price, Date, PickupLocation, DropoffLocation, Rating)
      VALUES (?, ?, ?, NOW(), ?, ?, NULL)
      `,
      [UID, empID, price, pickupLocation, dropoffLocation]
    );

    // Insert into Travel_Movement
    await connection.query(
      `
      INSERT INTO Travel_Movement (PickupLocation, DropoffLocation, Date, Time)
      VALUES (?, ?, NOW(), NOW())
      `,
      [pickupLocation, dropoffLocation]
    );

    // Commit transaction
    await connection.commit();
    console.log(UID);
    console.log(email);
    res.status(200).json({ message: "Ride booked successfully!" });
  } catch (err) {
    console.error("Error booking ride:", err);
    res.status(500).json({ error: "Failed to book the ride." });
  }
});

router.post("/updateRating", async (req, res) => {
  const { OrderID, Rating } = req.body;

  if (!OrderID || Rating === undefined) {
    return res.status(400).json({ error: "OrderID and Rating are required." });
  }

  try {
    const updateQuery = `
      UPDATE Ride
      SET Rating = ?
      WHERE OrderID = ?
    `;
    const [result] = await db.query(updateQuery, [Rating, OrderID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ride not found." });
    }

    res.status(200).json({ message: "Rating updated successfully!" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Failed to update rating." });
  }
});

module.exports = router;
