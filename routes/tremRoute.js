const express = require("express");
const router = express.Router();
const sendDirectionsController = require("../controllers/tremController");

router.post("/send-directions", sendDirectionsController);

module.exports = router;
