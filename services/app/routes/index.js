const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require('../middlewares/authentication.js');
const ControllerLeaderBoard = require("../controllers/leaderboard.js");
const router = express.Router();


router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google", UserController.google);

router.use(authentication)

router.get('/',ControllerLeaderBoard.start)
router.post('/',ControllerLeaderBoard.stop)

module.exports = router;
