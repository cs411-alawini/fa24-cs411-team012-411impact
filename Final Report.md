# Final Project Report

## 1. Differences from the Original Proposal
In our original proposal, we planned to create a platform where users could request rides, select a driver, and receive a dynamically calculated fare based on distance and traffic conditions. By the final stage, our main direction remained the same—facilitating user-driver interactions and handling ride requests. However, some advanced features we initially aimed for did not materialize.

For example, we wanted a fully dynamic pricing system that adjusted automatically based on real-time distances and route conditions. Due to complexity and limited time, we ended up implementing a more static pricing approach. We also intended to incorporate real-time route optimization and map integration, but these features remained only partially developed or were not implemented at all.

## 2. Achievements and Usefulness
Our application successfully enabled user registration, order placement, and basic interaction with drivers. When a user placed an order, the system recorded all details in the database, ensuring a reliable and consistent record of ride requests.

Despite these successes, we did not achieve our goal of fully dynamic fare calculation. Without real-time map data or distance-based pricing, our fare calculations were simplified and less accurate. We also missed out on providing route optimization and real-time traffic considerations. While the application is functional and useful at a basic level, it is not as robust or feature-rich as originally envisioned.

## 3. Data Source Changes
We did not change our data sources during development. The data schema, tables, and relationships that we originally planned remained the same. We did not integrate new data feeds or external APIs beyond what was initially determined.

## 4. Schema and ER Diagram Changes
Our original ER diagram and database schema provided tables for users, drivers, vehicles, and orders. These tables and relationships were sufficient for the core functionality we delivered. Since we did not fully implement advanced features such as dynamic distance-based pricing or driver availability states, we did not need to adjust the schema.

A more advanced design might have included additional tables for tracking real-time driver availability, dynamic route data, or detailed ride statistics. However, given our final scope, the initial schema remained adequate.

## 5. Functionalities Added or Removed
**Added:**
- **User Registration and Interaction:** Users could create accounts, log in, and place orders.
- **Order Recording in the Database:** Each ride request generated an order entry in the database, maintaining a full record of completed and pending rides.

**Removed or Not Implemented:**
- **Driver Idle Status Tracking:** We did not add a system to track when drivers were idle or in-between trips. Initially, we wanted this to manage driver workloads, but our simplified logic did not require it.
- **Dynamic Distance-Based Pricing and Real-Time Optimization:** We did not implement a feature to calculate fares based on actual distances or real-time map data. Instead, pricing remained more static due to time constraints and complexity.

## 6. How Advanced Database Programs Helped
Our database allowed for reliable and efficient data storage and retrieval. Even though we did not implement complex, dynamic features, the database structure supported quick queries, record insertion, and order management. With more advanced procedures, triggers, or stored functions, we could have automated fare adjustments or driver selection. The solid database foundation gives us a platform to build upon for future enhancements.

## 7. Technical Challenges by Each Team Member
Bo: I think it difficult to determine which database columns should be indexed. While designing the database, it was unclear which fields would benefit most from indexing to improve query performance. It became apparent that careful thought about indexing should occur early in the design process, considering both the frequency and type of queries the application would run. 

Jun: I noted that the database design did not initially consider tracking driver availability. Although adding an availability state could enhance the application’s logic—allowing for more sophisticated matching of drivers to orders—the absence of this feature did not critically harm the application’s core functionality. If future teams want to improve upon this, they might consider more robust state management. Instead of a simple “available/unavailable” flag, the system could track various states (e.g., “on duty,” “off duty,” “en route,” “awaiting next trip”) to provide richer, more flexible logic for driver and ride management.

Nuoxing: One challenge I faced was data validation. Many of our API calls relied on the UID parameter for database queries. During the development phase, I initially overlooked implementing proper data validation, assuming it wouldn't be necessary early on. This oversight resulted in over an hour of debugging to identify why our backend API and SQL queries were failing. From this experience, I learned the importance of prioritizing robust data validation from the beginning to save time and prevent avoidable issues.

## 8. Other Changes Compared to the Original Proposal
Most other changes were minor tweaks rather than major shifts from our original plan. The core tables and workflows remained consistent. The main difference was our inability to implement some of the advanced, dynamic features we initially planned.

## 9. Future Work (Beyond the Interface)
In the future, we could:
- **Integrate Real-Time Maps:** Linking to a map API (e.g., Google Maps) would allow us to calculate actual distances, optimize routes, and factor in traffic conditions.
- **Dynamic Pricing Models:** Using map data, real-time traffic, and possibly additional factors like peak hours, we could introduce a more accurate, fair, and dynamic pricing system.
- **Driver State Management:** Implementing tables or fields to track driver availability, on-trip status, or break times would make the system more realistic and efficient.

## 10. Final Division of Labor and Teamwork Management
For final Stage:

Nuoxing: All the code of backend and front end for the final demo, including copies of the queries wrote for the transaction, stored procedure, trigger, and constraint.

Bo, Jun, Hewei: queries wrote for the transaction, stored procedure, trigger, and constraint.

In every phase of the project, we shared and distributed responsibilities among us. Each member was involved in different aspects of the work at one or another part of the process. For example, while one worked on database schema design, another implemented the backend logic, and the third handled the user interface. A bit later in the process, we readjusted roles: some members switched to testing and debugging, while others fine-tuned queries and performance optimization.

---

**In Summary:**  
We mostly followed our original direction but scaled back on dynamic and complex features. The application works as a basic ride request platform, storing user and order data reliably. Future improvements would focus on integrating real-time data sources, refining the pricing model, and enhancing the overall user experience.

**Code of transaction, stored procedure, trigger, and constraint**
```sql
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
        vt.Size = IF(? = '', vt.Size, ?)
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
START TRANSACTION;
SELECT 
    d.VIN, 
    d.Pricing, 
    d.Phone, 
    d.Email, 
    d.Address, 
    d.Experience,
    AVG(r.Price) AS AvgPrice
INTO 
    @VIN, 
    @Pricing, 
    @Phone, 
    @Email, 
    @Address, 
    @Experience,
    @AvgPrice
FROM 
    Driver d
LEFT JOIN
    Ride r ON d.empID = r.empID
WHERE 
    d.empID = ?
GROUP BY
    d.VIN, d.Pricing, d.Phone, d.Email, d.Address, d.Experience
FOR UPDATE;

SET @Price = IFNULL(@AvgPrice, @Pricing);

INSERT INTO Ride (UID, empID, Price, Date, PickupLocation, DropoffLocation, Rating)
VALUES (
    ?,                               
    ?,                               
    @Price,                           
    NOW(),                            
    @Address,                         
    ?,  
    NULL                              
);

INSERT INTO Travel_Movement (PickupLocation, DropoffLocation, Date, Time)
VALUES (
    @Address,                         
    ?,   
    NOW(),                            
    NOW()                             
);

COMMIT;
DELIMITER $$
CREATE TRIGGER update_driver_rating
AFTER UPDATE ON Ride
FOR EACH ROW
BEGIN
    IF NEW.Rating IS NOT NULL AND (OLD.Rating IS NULL OR OLD.Rating != NEW.Rating) THEN
        UPDATE Driver
        SET Ratings = (Ratings + NEW.Rating) / 2
        WHERE empID = NEW.empID;
    END IF;
END$$
DELIMITER ;
