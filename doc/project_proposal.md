# Uber for Trucks Project Proposal

## Project Title
Uber for Trucks: Smart Freight Transportation and Logistics Platform
## Project Summary
The Uber for Trucks project is designed to offer a ride-sharing platform specifically tailored for individuals and businesses needing freight transportation. The app connects users with truck drivers for efficient and reliable transportation of goods, allowing users to choose from different vehicle types based on their load size and delivery requirements. With an easy-to-use interface, users can input pick-up and drop-off locations, select the appropriate truck, and track the delivery in real-time. The platform also offers an estimated cost calculator that factors in distance, truck size, and delivery urgency, making the process transparent and convenient for both users and drivers.

In addition to standard transportation services, the app incorporates advanced features such as route optimization and dynamic pricing systems. The route optimization algorithm helps drivers navigate the most efficient routes by taking into account real-time traffic, weather conditions, and road restrictions. Meanwhile, the dynamic pricing system adjusts rental costs based on real-time supply and demand, ensuring that users get competitive rates and drivers are fairly compensated during peak times. These features create a more intelligent, cost-effective, and reliable solution for freight transportation.

## Project Description

The Uber for Trucks app addresses a prevalent challenge in the logistics industry—finding affordable and dependable truck rentals for transporting goods. Traditional methods of renting trucks can be cumbersome, often involving multiple phone calls, quotes, and limited availability. By developing a centralized platform, we streamline the process, making it easier for users to connect with drivers and book trucks based on their needs. Users can input basic information such as pick-up and drop-off locations, select a truck type, and specify details about their cargo. This ensures that the right vehicle is matched with the right job, preventing under- or over-utilization of vehicle capacity.

The app also introduces features that enhance both user and driver experiences. Drivers create profiles that highlight their experience, availability, vehicle types, and rates. This transparency allows users to choose the best option for their transportation needs. Additionally, users can track deliveries in real-time through GPS integration, ensuring they are always aware of the delivery's progress. The app also tackles the issue of fluctuating pricing in the logistics industry by implementing a dynamic pricing system. This system takes into account real-time demand and supply, ensuring prices are fair for both users and drivers while helping balance peak and off-peak demand for truck rentals. The combination of these features provides a comprehensive solution to the challenges of modern-day freight transportation.

## Challenging features (requires TA approval)

**1.Route Optimization Algorithm**
This algorithm will take into account various real-time factors such as traffic conditions, weather patterns, road restrictions, and delivery constraints to calculate the most efficient delivery routes. Unlike traditional routing methods that only consider distance, this algorithm will combine multiple data points—real-time traffic data, predicted congestion from historical data, and real-time weather updates—to ensure that the truck can navigate the quickest and safest route to the destination. This feature will involve integrating multiple APIs (Google Maps Traffic API for live congestion information, OpenWeatherMap for real-time weather conditions), processing the data efficiently, and applying advanced graph algorithms like Dijkstra’s or A*.

**2.Dynamic Pricing Optimization**
This system will adjust the cost of truck rentals in real time based on supply and demand factors, traffic conditions, and urgency of delivery. The algorithm will use pricing trends, availability of trucks nearby, and historical data to suggest optimal prices for both drivers and users. For instance, during peak times or in high-traffic areas, the system will adjust pricing accordingly to incentivize drivers and provide users with more transparent and competitive rates. This involves predictive modeling using machine learning algorithms like linear regression or random forest, as well as seamless integration of pricing APIs to gather industry trend data.
## Usefulness
The Uber for Trucks app is a highly useful platform for individuals and businesses alike, providing an efficient, transparent, and flexible solution for goods transportation. One of the primary benefits of the app is its ability to connect users with truck drivers who offer the appropriate vehicle types and services based on specific needs. Users no longer have to navigate complex logistics or rely on multiple intermediaries to find truck rentals; instead, they can easily browse available drivers and vehicles, calculate costs, and schedule deliveries within a single platform. This significantly reduces the time and effort typically associated with booking transportation services.

In terms of basic functions, the web application allows users to create accounts, search for truck drivers by availability, location, and vehicle type, and book drivers for transportation tasks. Users can input pick-up and drop-off locations, specify the type of goods being transported, and receive an estimated cost based on the load size and delivery urgency. Advanced features include real-time GPS tracking, which lets users monitor the progress of their delivery and a dynamic pricing system that adjusts rates according to real-time demand and supply. Drivers also benefit from the platform, as they can manage their profiles, set availability, and accept or reject job requests based on their schedules and preferences.

There are similar applications in the market, such as GoShare and Convoy, which also offer freight transportation services. However, Uber for Trucks distinguishes itself by incorporating more sophisticated features like route optimization and dynamic pricing. While other platforms primarily focus on connecting users with drivers, this app offers an added layer of intelligence by optimizing delivery routes based on real-time traffic, weather, and road conditions. Additionally, the dynamic pricing system ensures that both drivers and users receive fair pricing during high-demand periods, balancing costs for users while compensating drivers accordingly. This combination of real-time data integration, route optimization, and pricing intelligence makes Uber for Trucks a more robust and efficient solution compared to its competitors.
## Realness

In order to build a real Uber-for-Trucks application, we have identified and integrated multiple datasets that cover travel times, traffic predictions, weather conditions, and GPS information. These datasets will be used to support the core functionalities of the application, such as route optimization, live tracking system, and pricing calculations.

**1. Uber Travel Movement Data(Boston)**
- **Data Source(Format)**: [Kaggle: Uber Travel Movement Data - 2 Billion Trips](https://www.kaggle.com/datasets/ishandutta/uber-travel-movement-data-2-billion-trips?select=Travel_Times+-+Boston.csv)(CSV)
- **Data Size**: Extremely high cardinality, covering over 2 billion trips, and moderate degree
- **Description**: This dataset provides detail information on pickup and drop-off locations, travel time in minutes, and trip distances. It can be used to simulate travel patterns of trucks and help calculate the estimated arrival time for goods deliveries.

**2. Traffic Prediction Dataset**
- **Data Source(Format)**: [Kaggle: Traffic Prediction Dataset](https://www.kaggle.com/datasets/fedesoriano/traffic-prediction-dataset)(CSV)
- **Data Size**: Medium cardinality and high degree
- **Description**: This dataset includes historical traffic patterns and traffic volume data, which will be used to predict future traffic conditions. It contains information such as traffic volume, speed, and congestion levels across different locations and time periods.

**3. Weather Data**
- **Data Source(Format)**: [Kaggle: Weather Data](https://www.kaggle.com/datasets/bhanupratapbiswas/weather-data)(CSV)
- **Data Size**: Medium cardinality and moderate degree
- **Description**: This dataset provides historical weather data, including temperature, wind speed, precipitation, and humidity. The data covers multiple regions in the America, which is suitable for simulating weather impacts on truck deliveries.

**4. OpenStreetMap(North America)**
- **Data Source(Format)**: [Geofabrik: North America OSM Dataset](https://download.geofabrik.de/north-america-latest.osm.pbf)(XML)
- **Data Size**: High cardinality and high degree
- **Description**: This dataset provides detailed geospatial data and captures the geographical coordinates of roads and infrastructure, which is essential for GPS-based tracking and routing functionalities in the application.

**API settings that might be used in the future**

We have also find some useful APIs that can use to increase the functionality of the application.

**1. Real-Time Weather API**
- **API LINK**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Purpose**: The OpenWeatherMap API provides real-time weather updates such as temperature, precipitation, wind speed, and severe weather alerts.

**2. Real-Time Traffic API**
- **API LINK**: [Google Maps Traffic API](https://developers.google.com/maps/documentation/traffic)
- **Purpose**: The Google Maps Traffic API have the access to real-time traffic conditions, including congestion and road incidents, which can be integrate into the live truck system.


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

![Sample Image](UI_mockup.png)

**Project Work Distribution:**

- Jun Wen: Profile CRUD and key word search; Stored procedures, transactions, constraints, and triggers; Frontend & backend interface.

- Bo Zhu: Stored procedures, transactions, constraints, and triggers; Route optimization algorithm; Live Tracking system.

- Hewei Tang: Route optimization algorithm; Live Tracking system; integrating APIs.

- Nuoxing Shang: Route optimization algorithm; integrating APIs; Frontend & backend interface; GCP hosting.
