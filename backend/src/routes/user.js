const express = require("express");
const userController = require("../controllers/userController");
// const { verifyToken } = require("../controllers/middlewareController");
// const middlewareController = require("../controllers/middlewareController");
const router = express.Router();

router.post("/topics", userController.getTopics);
router.post("/departments", userController.getDepartments);
router.post("/councils", userController.getCouncils);

module.exports = router;
