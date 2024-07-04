const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const serviceRouter = require("./routes/serviceRouter");
const salaryroutes=require("./routes/job vacancy routes/applicattionroutes.js");
const vacancyroutes=require("./routes/job vacancy routes/vacancyroutes.js");
const leavingDetails=require("./routes/leaving routes/leavingroutes.js");
const specialDetails=require("./routes/leaving routes/soecialroutes.js");
const onlineDetails = require("./routes/Booking/apoitmentroutes.js");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
app.use("/services", serviceRouter)
const employeesalarydetailesRouter = require("./routes/employeeSalaries.js");
app.use("/employee",employeesalarydetailesRouter);

const otSalariesRouter = require("./routes/otSalaries.js");
app.use("/employee",otSalariesRouter);

const  SpecialLeavingSalariesRouter = require("./routes/specialLeavingSalaries.js");
app.use("/employee",SpecialLeavingSalariesRouter)

app.use("/",salaryroutes);
app.use("/", onlineDetails);
app.use("/leaving", leavingDetails);
app.use("/special", specialDetails);


app.use("/",vacancyroutes);

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

// Error Middleware
app.use(errorHandler);
// Connect to DB and Start server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
