const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post(
  "/change-password",
  middlewareController.verifyToken,
  adminController.changePassword
);
router.post("/change-information", adminController.changeInformation);
router.post("/get-information", adminController.getInformation);
router.post("/get-allcode", adminController.getAllcode);
router.post("/councils", adminController.getCouncils);

router.post("/refresh", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
