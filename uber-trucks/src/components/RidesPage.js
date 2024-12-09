import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const RidesPage = () => {
  const { user } = useUser(); // Get user details from context
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null); // Track the ride being rated
  const [rating, setRating] = useState(""); // Store the entered rating
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!user.UID) {
      alert("Please log in to access the search page.");
      navigate("/login"); // Redirect to login page
    }
  }, [user, navigate]);

  // Fetch rides
  useEffect(() => {
    const fetchRides = async () => {
      try {
        console.log("UID in frontend:", user.UID);
        const response = await fetch(
          `http://localhost:5000/api/rides?uid=${user.UID}`
        );
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error("Failed to fetch rides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [user.UID]);

  // Handle "Rate It" button click
  const handleRateClick = (ride) => {
    setSelectedRide(ride); // Set the ride to be rated
    setShowPopup(true); // Show the popup
  };

  // Handle rating submission
  const handleSubmitRating = async () => {
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      alert("Please enter a valid rating between 1 and 5.");
      return;
    }

    try {
      console.log(`Order id is ${selectedRide.OrderID}`);
      const response = await fetch(
        `http://localhost:5000/api/rides/updateRating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OrderID: selectedRide.OrderID, // Send the ride's OrderID
            Rating: parseFloat(rating), // Ensure the rating is a number
          }),
        }
      );

      if (response.ok) {
        alert("Rating submitted successfully!");
        setRides((prevRides) =>
          prevRides.map((ride) =>
            ride.OrderID === selectedRide.OrderID
              ? { ...ride, Rating: parseFloat(rating) } // Update the ride's rating
              : ride
          )
        );
        setShowPopup(false); // Close the popup
        setSelectedRide(null); // Clear the selected ride
        setRating(""); // Reset the rating input
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting the rating.");
    }
  };

  if (loading) {
    return <p>Loading rides...</p>;
  }

  if (rides.length === 0) {
    return <p>No rides found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Rides</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {rides.map((ride, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              width: "300px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{`Ride on ${new Date(ride.Date).toLocaleDateString()}`}</h3>
            <p>
              <strong>Pickup:</strong> {ride.PickupLocation}
            </p>
            <p>
              <strong>Dropoff:</strong> {ride.DropoffLocation}
            </p>
            <p>
              <strong>Price:</strong> ${ride.Price}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {ride.Rating ? `${ride.Rating}/5` : "Not rated"}
            </p>
            <button
              onClick={() => handleRateClick(ride)} // Handle rate button click
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Rate It
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h3>Rate the ride</h3>
          <p>
            Pickup: {selectedRide.PickupLocation} <br />
            Dropoff: {selectedRide.DropoffLocation}
          </p>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter rating (1-5)"
            style={{ padding: "10px", margin: "10px 0", width: "100%" }}
          />
          <div>
            <button
              onClick={handleSubmitRating}
              style={{
                padding: "10px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => {
                setShowPopup(false);
                setRating("");
              }}
              style={{
                padding: "10px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RidesPage;
