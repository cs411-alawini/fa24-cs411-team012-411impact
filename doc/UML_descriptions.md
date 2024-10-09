# UML Graph Descriptions

## Descriptions (Assumptions, Cardinality, etc)
### User:
Assumptions: Users are people or entities requesting rides, and each user must have distinct identifying information (UID, name, phone, email, and address). Users are modeled as an entity rather than as attributes of Ride or Order, because a single user can create multiple ride requests and interact with multiple drivers.

Cardinality: The many-to-many relationship between users and drivers is justified because a user might take rides with different drivers on different occasions, and a driver can serve multiple users over time. Each user is independent and might have multiple rides, which justifies the separation as an entity.
### Driver:

Assumptions: Drivers are independent service providers with unique identifying features (empID, VIN, pricing, rating, etc.). The driver's vehicle is tied to their service, which is why the Driver has a relationship with Vehicle. Drivers are modeled as a separate entity because they interact with multiple users over time and have specific properties like experience, rating, and vehicle ownership that need to be tracked independently.

Cardinality: The one-to-one relationship between a driver and a vehicle stems from the assumption that each driver is tied to only one vehicle at a time, due to insurance, regulatory, or operational constraints (also easier for this project). 
### Ride:

Assumptions: A ride is a transaction between a user and a driver, but the relationship is dependent on both parties. The Ride entity captures the specifics of each interaction, such as pickup/drop-off location, order ID, etc. By modeling Ride as an independent entity, we can track each interaction over time, including details like where and when the ride took place, and which driver was involved.

Cardinality: The assumption here is that each ride involves one user and one driver, even if the user and driver can have multiple rides with others. This ensures the ride is uniquely tracked, separating each transaction. Additionally, orders are created based on a user-driver match, so rides are the bridge between them.
### Vehicle:

Assumptions: A vehicle is modeled as a separate entity because vehicles can have independent attributes like VIN and manufacturing date. Vehicles can also change owners (drivers) over time or may have technical details that need independent tracking. The vehicle's existence is significant because it can be associated with different drivers (in the future) or users might request rides based on vehicle characteristics (such as size).

Cardinality: One vehicle is tied to one driver to simplify the business model. This setup helps in maintenance, ownership tracking, and ensures a clear chain of responsibility for the vehicle.

### Vehicle Type:

Assumptions: The Vehicle Type entity represents different models or categories of vehicles (e.g., sedan, SUV, truck). This separation allows flexibility to support multiple types of vehicles, which might affect pricing, ride availability, or service options. Vehicle types include attributes like productID, name, size, release date, and brand name, which are independent from a specific vehicle’s VIN or manufacturing details.

Cardinality: One vehicle can have multiple types (for example, a vehicle could fit multiple categories like “SUV” and “Electric”), but each Vehicle Type only relates to one specific vehicle, reflecting a clear association to avoid confusion between types and individual vehicles.

### Travel Movement:

Assumptions: Travel Movement tracks the dynamic information related to a ride—such as pickup/drop-off location and time. Modeling it as an entity allows flexibility in capturing the specific movements and times of each ride, which is essential for providing analytics, billing, or scheduling functionalities.

Cardinality: The assumption here is that each travel movement is unique to one specific Ride and captures the details of that ride alone.
## BCNF Explanation

## Relational Schema Code