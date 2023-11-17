const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google", UserController.google);

router.use(authentication);

router.get("/users", UserController.getUser);
router.get("histories");
router.post("histories");
router.get("histories/:id");
router.patch("histories/:id");

module.exports = router;
