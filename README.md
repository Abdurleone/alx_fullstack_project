# Hotel Booking Web Application

## Overview

The **Hotel Booking Web Application** is designed to facilitate the process of finding and booking hotels. This platform allows users to search for available hotels, view details, and make reservations. Administrators can manage hotel listings, bookings, and user accounts to ensure a smooth operation.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Testing](#testing) 
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- **User Authentication**: Secure login for users and admins.
- **Hotel Management**: Admins can add, update, and delete hotel listings.
- **Booking System**: Users can search, book, and manage reservations.
- **Payment Integration**: (Optional) Integration with payment gateways for online transactions.
- **Search Functionality**: Users can search hotels by location, price, and availability.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (React.js)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Docker, Heroku (or any preferred platform)
- **Testing**: Jest, Supertest 
- **Version Control**: Git and GitHub

## Installation

### Prerequisites

- Node.js (v14.x or later)
- Yarn (Package Manager)
- MongoDB (or a MongoDB Atlas account for cloud storage)

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/abdurleone/alx-fullstack_project.git
   cd alx-fullstack_project
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   http://localhost:2704/api
   http://localhost:3000/client
   http://localhost:3001/admin
   MONGO_URI= MONGO = mongodb+srv://abdurleone:SaidGumba02!@cluster0.qukeyv1.mongodb.net/
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application**:

   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. **Accessing the Application**:
   - Open a web browser and go to `http://localhost:3000`.

2. **User Registration and Login**:
   - Users can register for an account or log in if they already have one.

3. **Searching for Hotels**:
   - Use the search functionality to find hotels by location, date, and price.

4. **Booking a Room**:
   - Users can select a hotel, choose available rooms, and complete the booking process.

5. **Admin Management**:
   - Admins can log in to manage hotel listings, bookings, and user accounts.

## Testing <!-- New Section for Unit Testing -->

We use **Jest** for unit testing and **Supertest** for testing our API endpoints.

### Steps to Run Unit Tests

1. **Install Jest and Supertest**:

   If you haven’t installed these libraries already, run:

   ```bash
   yarn add jest supertest --dev
   ```

2. **Add a `test` script** to your `package.json`:

   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

3. **Write Unit Tests**:

   Create a folder named `tests` in your project root and write unit test files for your backend API.

   Example of a test for the authentication route (`tests/auth.test.js`):

   ```javascript
   const request = require('supertest');
   const app = require('../app'); // Your Express app

   describe('POST /api/auth/login', () => {
     it('should return a JWT token when login is successful', async () => {
       const res = await request(app)
         .post('/api/auth/login')
         .send({
           email: 'user@example.com',
           password: 'password123',
         });
       expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty('token');
     });

     it('should return 400 if login details are incorrect', async () => {
       const res = await request(app)
         .post('/api/auth/login')
         .send({
           email: 'wronguser@example.com',
           password: 'wrongpassword',
         });
       expect(res.statusCode).toEqual(400);
     });
   });
   ```

4. **Run the Tests**:

   Run the following command to execute your tests:

   ```bash
   yarn test
   ```

### Example Test Results

The output of the tests will show whether your routes, models, and logic work correctly:

```bash
 PASS  tests/auth.test.js
  POST /api/auth/login
    ✓ should return a JWT token when login is successful (44 ms)
    ✓ should return 400 if login details are incorrect (32 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.784 s
Ran all test suites.
```

## API Documentation

The API is built using RESTful principles. Here are some key endpoints:

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in and receive a JWT for authentication.
- **GET /api/hotels**: Retrieve all hotel listings.
- **POST /api/hotels**: Create a new hotel listing (admin only).
- **GET /api/hotels/:id**: Retrieve a specific hotel by ID.
- **PUT /api/hotels/:id**: Update a specific hotel listing (admin only).
- **DELETE /api/hotels/:id**: Delete a specific hotel listing (admin only).
- **POST /api/bookings**: Create a new booking.
- **GET /api/bookings/:id**: Retrieve a specific booking by ID.

### Example Request

Here’s an example of how to create a new hotel listing using `curl`:

```bash
curl -X POST http://localhost:3000/api/hotels \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{"name": "Grand Hotel", "location": "Paris", "rooms": 100, "pricePerNight": 150}'
```

## Contributing

We welcome contributions! To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Summary of Changes:

1. Added **Testing** section in the README with provisions for **Jest** and **Supertest**.
2. Included instructions on how to install testing libraries, write unit tests, and run them using **yarn**.
3. Provided an example of unit tests for an authentication route.