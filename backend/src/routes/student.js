const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.post("/change-password", middlewareController.verifyToken,studentController.changePasswordStudent);
router.post("/change-information", middlewareController.verifyToken, studentController.changeInformationStudent);
router.post("/get-information", middlewareController.verifyToken, studentController.getInformationStudent);

// Api Lecturer
router.post("/lecturers", middlewareController.verifyToken, studentController.getLecturers);
router.get("/lecturer/:id", middlewareController.verifyToken, studentController.getLecturerById);
router.get("/register-advisor/:id", middlewareController.verifyToken, studentController.registerAdvisorById);

// Api Thesis
router.post("/theses", middlewareController.verifyToken, studentController.getTheses);
router.get("/thesis/:id", middlewareController.verifyToken, studentController.getThesisById);
router.put("/update-thesis/:id", middlewareController.verifyTokenUpdate, studentController.updateThesis);

// Api Topic
router.post("/topics", middlewareController.verifyToken, studentController.getTopics);
router.get("/topic/:id", middlewareController.verifyToken, studentController.getTopicById);



module.exports = router;
