# flower-delivery-app

## Table of Contents

- [Project Overview](#Project-Overview)

  - [Features](#Features)

  - [Prerequisites](#Prerequisites)

  - [Installation](#Installation)

  - [Project Structure](#Project-Structure)

  - [Implementation Details](#Implementation-Details)

  - [Server Configuration](#Server-Configuration)

  - [API Endpoints](#API-Endpoints)

  - [Notes](#Notes)

  - [License](#license)

  - [Author(s)](#authors)

## Project Overview

The Flower Delivery App is a web application that allows customers to browse, order, and have flowers delivered directly to their chosen locations. This full-stack project is built using modern web technologies, ensuring a seamless user experience for both customers and administrators. The app features a user-friendly interface for ordering flowers, a secure payment system, and an admin dashboard for managing inventory and orders.

## Features

- **Customer Features** 
-  Browse through a wide range of flowers and arrangements
- Checkout with multiple payment options
- Enter delivery details 
 - User authentication and profile management.

## Technologies Used

- **Node.js**
- **MongoDB Atlas account**
- **React**
 - **Mongoose**
- **Express**
- **JWT (JSON Web Tokens)**
  

## Setup and Installation

 follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
cd <flower-delivery-App>
   
2. **Install Dependencies:**

   npm install
   
3. **Install the backend dependencies:**

  cd backend
npm install


4. **Install the frontend dependencies**
  cd frontend
npm install

   

5.  **Set up environment variables:**

MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key


6. **In the frontend, set variables for API base URL:**
REACT_APP_API_URL=http://localhost:3000

7. **Run the backend and frontend servers:**
   npm run dev
   
8. **In the frontend directory:**
   npm start
Open your browser and go to http://localhost:3000 to view the app.


  **Usage**

1.Register an account or log in if you already have one.

2.Browse the flower catalog and add items to your cart.

3.Complete the checkout process with payment and delivery details.
   **Server Configuration**
  The server is configured to run on the port specified in the .env file or defaults to port 3000 if not set. MongoDB Atlas is used for database management, with connection details stored securely in environment variables.

 

 
     
## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Author(s)
If you have any questions or feedback, feel free to contact:

**Name:** Fatima Abubakar 

**Email:** fatimammcy@gmail.com 

**GitHub:**  Flower delivery 
App

**website:** https://flower-delivery-app-fontend-client.onrender.com

**backend:** https://flower-delivery-app-backend.onrender.com

**watch my loom video** https://www.loom.com/share/b4f5b687e2314e308de1a2f2eeb40c14















