const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Add Service
router.post("/addservice", serviceController.addService);

// get data
router.get("/getservicedata", serviceController.getServiceData);

// get individual service
router.get("/getservice/:id", serviceController.getIndividualService);

// update service
router.patch("/updateservice/:id", serviceController.updateService);

// DELETE service
router.delete("/deleteservice/:id", serviceController.deleteService);

module.exports = router;
