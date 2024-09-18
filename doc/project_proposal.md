# Uber for Trucks Project Proposal

## Project Title

## Project Summary

## Project Description

## Challenging features

## Usefulness

## Realness

## Functionality

**CRUD operations of profiles and keyword search functionality:**

- **Profile Creation:** Drivers can create detailed profiles that include their experience, available vehicle types (e.g., small vans, box trucks, flatbeds), availability, location, and expected price.
- **Profile Search:** Users can search for driver profiles based on various criteria such as name, location, experience, vehicle types, availability, and price.
- **Profile Updates:** Drivers can update their profiles to reflect changes in their availability, experience, or other details.
- **Profile Deletion:** Drivers have the ability to delete their profiles when necessary.

**Advanced Database Feature (stored procedure(s), transaction(s), constraints, and trigger(s)):**

- **Stored Procedure (Recommendation Feature):**  
  Our application will include a recommendation system (for users who are unsure how to filter drivers and need a smart recommendation) implemented via stored procedures. This feature will allow users to input details such as source, destination, goods size, budget (affordable price), and preferred time. Based on this input, the stored procedure will return a list of available drivers along with the expected price.

- **Transactions:**  
  Transactions ensure consistency by grouping multiple operations so that they either succeed or fail as a whole. For example, when a user books a ride, a transaction will handle updating the driver's availability, inserting a new record in the Rides database, and other related operations. If any part of the process fails, the entire transaction will be rolled back, maintaining data integrity.

- **Constraints:**  
  We will apply constraints to drivers' profiles to ensure data integrity and enforce business rules. Examples include constraints on the format of driver information (such as email format validation) and ensuring that required fields (like vehicle type, availability, or rates) are properly filled.

- **Triggers:**  
  A trigger will be implemented to automatically update a driver's rating after a ride is completed and user feedback is submitted. When a new feedback entry is added, the trigger will calculate the driver's new average rating based on all submitted feedback and update the driver's profile accordingly.

**Other Features:**

- The application will provide a real-time tracking system for trucks during transportation. This feature will utilize GPS services to track the current location of the vehicle and display the estimated time of arrival (ETA) to the destination. Moreover, the tracking system might integrate other APIs as well, such as traffic data APIs, local weather data, and pricing trends for transportation services.

**UI Mockup:**

- Coming up soon.

**Project Work Distribution:**

- Coming up soon.
