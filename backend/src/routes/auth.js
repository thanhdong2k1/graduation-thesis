const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const router = express.Router();

router.post("/login", authController.loginUser);

router.post("/register", authController.registerUser);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout",authController.userLogout);

module.exports = router;
