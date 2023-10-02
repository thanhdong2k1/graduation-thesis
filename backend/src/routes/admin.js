const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/change-password", middlewareController.verifyToken,adminController.changePassword);
router.post("/change-information", middlewareController.verifyToken, adminController.changeInformation);
router.post("/get-information", middlewareController.verifyToken, adminController.getInformation);
router.post("/get-allcode", middlewareController.verifyToken, adminController.getAllcode);
router.post("/councils", middlewareController.verifyToken, adminController.getCouncils);
router.post("/import-councils", middlewareController.verifyTokenImport, adminController.importCouncils);
router.post("/create-councils", middlewareController.verifyTokenImport, adminController.addCouncils);

router.post("/refresh", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
