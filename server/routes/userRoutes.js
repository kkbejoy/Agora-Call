const express = require("express");
const router = express.Router();
const { userLogin, getUsersList } = require("../controllers/userController");

router.route("/login").post(userLogin);
router.route("/users").get(getUsersList);
module.exports = router;
