import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DriverCard = ({ driver, source, destination, onDelete }) => {
  const { user } = useUser(); // Get user details from context
  const navigate = useNavigate();
  // Book callback
  const handleBook = async () => {
    console.log("Book button clicked");
    console.log("Sending request to backend with:", {
      UID: user.UID,
      email: driver.email,
      pickupLocation: source,
      dropoffLocation: destination,
    });

    if (!user?.UID) {
      alert("User not logged in. Cannot book ride.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/rides/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UID: user.UID,
          email: driver.email, // Driver's email
          pickupLocation: source, // Source city
          dropoffLocation: destination, // Destination city
        }),
      });

      if (response.ok) {
        alert("Ride booked successfully!");
        navigate("/rides");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error booking ride:", error);
      alert("An error occurred while booking the ride.");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{driver.email}</h3>
      <p>Address: {driver.address}</p>
      <p>Rating: {driver.ratings}</p>

      {user.isAdmin ? (
        <button
          onClick={() => onDelete(driver.email)} // Use the delete callback
          style={{
            padding: "10px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      ) : (
        <button
          onClick={handleBook} // Use the book callback
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Book
        </button>
      )}
    </div>
  );
};

export default DriverCard;
