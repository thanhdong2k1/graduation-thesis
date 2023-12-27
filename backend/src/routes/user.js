const express = require("express");
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");
const adminController = require("../controllers/adminController");
// const { verifyToken } = require("../controllers/middlewareController");
// const middlewareController = require("../controllers/middlewareController");
const router = express.Router();

router.post("/topics", userController.getTopics);
router.post("/departments", userController.getDepartments);
router.post("/councils", userController.getCouncils);

router.post("/get-allcode", middlewareController.verifyToken, adminController.getAllcode);


module.exports = router;
