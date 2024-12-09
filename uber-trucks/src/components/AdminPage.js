import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminPage = () => {
  const { user } = useUser(); // Get user details from context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Phone: "",
    Email: "",
    Address: "",
  });

  const [message, setMessage] = useState("");

  // Redirect non-admin users
  useEffect(() => {
    if (!user.isAdmin) {
      alert("You do not have access to this page.");
      navigate("/login"); // Redirect to login page
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/drivers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Driver created successfully!");
        setFormData({ Phone: "", Email: "", Address: "" }); // Reset form
      } else {
        const error = await response.json();
        setMessage("Error creating driver: " + error.message);
      }
    } catch (error) {
      console.error("Error creating driver:", error);
      setMessage("An error occurred while creating the driver.");
    }
  };

  const handleSearchRedirect = () => {
    navigate("/"); // Redirect to the search page
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Create New Driver</h1>
      {message && (
        <p
          style={{
            color: message.includes("successfully") ? "green" : "red",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Phone:</label>
          <input
            type="text"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          Create Driver
        </button>
      </form>

      {/* Button to redirect to the Search Page */}
      <button
        onClick={handleSearchRedirect}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search Drivers
      </button>
    </div>
  );
};

export default AdminPage;
