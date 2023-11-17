const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const UserController = require("../controllers/UserController");
const HistoryController = require("../controllers/HistoryController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google", UserController.google);

router.use(authentication);

router.get("/users", UserController.getUser);

router.get("/histories", HistoryController.readHistories);
router.post("/histories", HistoryController.createHistory);
router.get("/histories/:id", HistoryController.readHistoryDetail);
router.put("/histories/:id", HistoryController.updateHistory);

module.exports = router;
