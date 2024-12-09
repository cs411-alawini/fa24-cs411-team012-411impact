const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Check if a user exists by email
router.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const query = "SELECT * FROM User WHERE Email = ?";
    const [rows] = await db.query(query, [email]);

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        user: {
          UID: user.UID,
          Name: user.Name,
          Phone: user.Phone,
          Email: user.Email,
          Address: user.Address,
        },
      });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database query failed" });
  }
});

module.exports = router;
