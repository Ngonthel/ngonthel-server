const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const UserController = require("../controllers/UserController");
const HistoryController = require("../controllers/HistoryController");
const EventController = require("../controllers/EventController");
const { updateEventAuthorization } = require("../middlewares/authorization");
const ProfileController = require('../controllers/ProfileController')

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google", UserController.google);

router.use(authentication); // Authentication

// User
router.get("/users", UserController.getUser);

// History
router.get("/histories", HistoryController.readHistories);
router.post("/histories", HistoryController.createHistory);
router.get("/histories/:id", HistoryController.readHistoryDetail);
router.put("/histories/:id", HistoryController.updateHistory);

// Event
router.get("/events", EventController.readEvents);
router.post("/events", EventController.createEvent);
router.get("/events/:id", EventController.readEventDetail);
router.patch("/events/:id", updateEventAuthorization, EventController.patchEventstatus);

module.exports = router;
