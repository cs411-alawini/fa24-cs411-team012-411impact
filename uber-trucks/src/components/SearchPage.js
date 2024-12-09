import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const SearchPage = () => {
  const { user } = useUser(); // Get user details from context
  const navigate = useNavigate();

  // Redirect non-logged-in users
  useEffect(() => {
    if (!user.UID) {
      alert("Please log in to access the search page.");
      navigate("/login"); // Redirect to login page
    }
  }, [user, navigate]);

  const [searchParams, setSearchParams] = useState({
    keyword: "",
    peopleCount: "",
    luxuryLevel: "",
    source: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindMyRides = () => {
    navigate("/rides"); // Navigate to the rides page
  };

  const handleSearch = () => {
    // Construct query parameters
    const queryParams = new URLSearchParams(
      Object.entries(searchParams).filter(([_, value]) => value.trim() !== "")
    ).toString();

    // Navigate to the results page with individual parameters
    navigate(`/results?${queryParams}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <button
        onClick={handleFindMyRides}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Find My Rides
      </button>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Driver Search
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Keyword Input */}
        <div>
          <label
            htmlFor="keyword"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Keyword (Email or Address):
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="Search by keyword"
            value={searchParams.keyword}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* People Count Dropdown */}
        <div>
          <label
            htmlFor="peopleCount"
            style={{ display: "block", marginBottom: "5px" }}
          >
            People Count (Optional):
          </label>
          <select
            id="peopleCount"
            name="peopleCount"
            value={searchParams.peopleCount}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select People Count</option>
            {[...Array(10).keys()].map((count) => (
              <option key={count + 1} value={count + 1}>
                {count + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Luxury Level Dropdown */}
        <div>
          <label
            htmlFor="luxuryLevel"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Luxury Level (Optional):
          </label>
          <select
            id="luxuryLevel"
            name="luxuryLevel"
            value={searchParams.luxuryLevel}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Luxury Level</option>
            <option value="cheap">Cheap</option>
            <option value="economic">Economic</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Source Input */}
        <div>
          <label
            htmlFor="source"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Source:
          </label>
          <input
            type="text"
            id="source"
            name="source"
            placeholder="Enter source location"
            value={searchParams.source}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Destination Input */}
        <div>
          <label
            htmlFor="destination"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="Enter destination location"
            value={searchParams.destination}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007BFF";
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
