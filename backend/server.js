const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const paypalRoutes = require('./routes/paypal');
const app = express();

// CORS Configuration - must be at the very top
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options('*', cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Now add PayPal routes after body parsers
app.use('/api', paypalRoutes);

const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const salaryroutes=require("./routes/job vacancy routes/applicattionroutes.js");
const vacancyroutes=require("./routes/job vacancy routes/vacancyroutes.js");
const onlineDetails = require("./routes/Booking/apoitmentroutes.js");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const serviceRouter = require("./routes/serviceRouter");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/contactus", contactRoute);
const employeesalarydetailesRouter = require("./routes/employeeSalaries.js");
app.use("/employee",employeesalarydetailesRouter);

const otSalariesRouter = require("./routes/otSalaries.js");
app.use("/employee",otSalariesRouter);

const  SpecialLeavingSalariesRouter = require("./routes/specialLeavingSalaries.js");
app.use("/employee",SpecialLeavingSalariesRouter)

app.use("/",salaryroutes);
app.use("/", onlineDetails);
app.use("/",vacancyroutes);
app.use("/services", serviceRouter);

// Session middleware (must be before passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'salon_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/salon_management" }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// --- OAuth Authentication Routes ---
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login', session: true }),
//   (req, res) => {
//     res.redirect('http://localhost:3000/dashboard');
//   }
// );

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: true }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

// Get current authenticated user
app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Logout
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

app.post('/api/test-direct', (req, res) => {
  console.log('Direct test:', req.body);
  res.json({ message: 'Direct test works!' });
});

const PORT = process.env.PORT || 5000;

// Error Middleware
app.use(errorHandler);

// Connect to DB and Start server
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/salon_management";
    console.log("Attempting to connect to MongoDB at:", mongoURI);
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB Connected Successfully");
    
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();