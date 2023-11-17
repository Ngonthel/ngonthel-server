const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const authentication = require("../middlewares/authentication");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google", UserController.google);

router.use(authentication);

router.get("/histories");
router.post("/histories");
router.get("/histories/:id");

module.exports = router;
