# Salon Management System

A full-featured web application for managing salon operations, including service listings, online bookings, employee management, job vacancies, and more.

## Features
- User registration and authentication
- Service management (add, update, delete, view)
- Online booking system with PayPal payment integration
- Employee salary and attendance management
- Job vacancy posting and application management
- Admin dashboard and protected routes
- Responsive, modern UI

## Technologies Used
- **Frontend:** React, Redux, React Router, Bootstrap, PayPal SDK
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, Passport.js
- **Payment:** PayPal

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Backend Setup
```sh
cd backend
npm install
# Create a .env file with your MongoDB URI and other secrets
npm run dev
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

### Environment Variables
- Configure your MongoDB URI and PayPal Client ID in the respective `.env` files.

## Usage
- Visit `http://localhost:3000` for the frontend.
- Admin and user roles are supported.
- Book services, manage employees, and handle job applications all in one place.

## Contact
For questions or support, contact [adityakakkad227@gmail.com](mailto:adityakakkad227@gmail.com)

---
**Enjoy managing your salon with ease!** 