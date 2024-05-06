const express = require("express");
const router = express.Router();
const eventControl = require("./controller/eventController");

router.get("/events", eventControl.getAllEvents);
router.post("/events", eventControl.addEvent);
router.delete("/events/:id", eventControl.deleteEvent);

module.exports = router;
