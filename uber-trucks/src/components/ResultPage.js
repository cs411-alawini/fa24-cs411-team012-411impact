import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DriverCard from "./DriverCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";
  const source = searchParams.get("source") || "";
  const destination = searchParams.get("destination") || "";
  const peopleCount = searchParams.get("peopleCount") || "";
  const luxuryLevel = searchParams.get("luxuryLevel") || "";
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Get user details from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.UID) {
      alert("Please log in to access the search page.");
      navigate("/login"); // Redirect to login page
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const queryString = new URLSearchParams({
          keyword,
          source,
          destination,
          peopleCount,
          luxuryLevel,
        }).toString();

        const response = await fetch(
          `http://localhost:5000/api/drivers?${queryString}`
        );
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [keyword, source, destination, peopleCount, luxuryLevel]);

  // Delete callback
  const handleDelete = async (email) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/drivers/${email}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setDrivers(drivers.filter((driver) => driver.Email !== email));
          alert("Driver deleted successfully.");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting driver:", error);
        alert("An error occurred while deleting the driver.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : drivers.length > 0 ? (
        drivers.map((driver, index) => (
          <DriverCard
            key={index}
            driver={driver}
            source={source} // Pass source city
            destination={destination} // Pass destination city
            onDelete={handleDelete} // Pass the delete callback
          />
        ))
      ) : (
        <p>No drivers found matching your search criteria.</p>
      )}
    </div>
  );
};

export default ResultPage;
