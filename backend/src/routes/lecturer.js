const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const lecturerController = require("../controllers/lecturerController");
const router = express.Router();

router.post("/change-password", middlewareController.verifyToken,lecturerController.changePasswordAdmin);
router.post("/change-information", middlewareController.verifyToken, lecturerController.changeInformationAdmin);
router.post("/get-information", middlewareController.verifyToken, lecturerController.getInformationAdmin);

router.post("/get-allcode", middlewareController.verifyToken, lecturerController.getAllcode);
// Api Council
router.post("/councils", middlewareController.verifyToken, lecturerController.getCouncils);
router.post("/thesis-councils", middlewareController.verifyToken, lecturerController.getThesisCouncils);
router.get("/evaluation-criteria-by-thesis-session-id/:id", middlewareController.verifyToken, lecturerController.getEvaluationCriteriaByThesisSessionId);



router.get("/council/:id", middlewareController.verifyToken, lecturerController.getCouncilById);
// router.post("/import-councils", middlewareController.verifyTokenImport, lecturerController.importCouncils);
router.post("/create-council", middlewareController.verifyTokenAdd, lecturerController.addCouncil);
router.put("/update-council/:id", middlewareController.verifyTokenUpdate, lecturerController.updateCouncil);
router.delete("/delete-council/:id", middlewareController.verifyTokenDelete, lecturerController.deleteCouncil);

// Api Council
router.post("/council-detail/:id", middlewareController.verifyToken, lecturerController.getCouncilDetailByIdCouncil);

// Api Thesis
// router.get("/thesis-councils/:id", middlewareController.verifyToken, lecturerController.getThesisCouncilsById);
router.post("/import-theses", middlewareController.verifyTokenImport, lecturerController.importTheses);
router.post("/create-thesis", middlewareController.verifyTokenAdd, lecturerController.addThesisCouncils);
// router.put("/update-thesis-councils/:id", middlewareController.verifyTokenUpdate, lecturerController.updateThesisCouncils);
router.delete("/delete-thesis/:id", middlewareController.verifyTokenDelete, lecturerController.deleteThesisCouncils);



// // Api Department
// router.post("/departments", middlewareController.verifyToken, lecturerController.getDepartments);
// router.get("/department/:id", middlewareController.verifyToken, lecturerController.getDepartmentById);
// router.post("/import-departments", middlewareController.verifyTokenImport, lecturerController.importDepartments);
// router.post("/create-department", middlewareController.verifyTokenAdd, lecturerController.addDepartment);
// router.put("/update-department/:id", middlewareController.verifyTokenUpdate, lecturerController.updateDepartment);
// router.delete("/delete-department/:id", middlewareController.verifyTokenDelete, lecturerController.deleteDepartment);

// // Api Block
// router.post("/blocks", middlewareController.verifyToken, lecturerController.getBlocks);
// router.get("/block/:id", middlewareController.verifyToken, lecturerController.getBlockById);
// router.post("/import-blocks", middlewareController.verifyTokenImport, lecturerController.importBlocks);
// router.post("/create-block", middlewareController.verifyTokenAdd, lecturerController.addBlock);
// router.put("/update-block/:id", middlewareController.verifyTokenUpdate, lecturerController.updateBlock);
// router.delete("/delete-block/:id", middlewareController.verifyTokenDelete, lecturerController.deleteBlock);

// // Api Major
// router.post("/majors", middlewareController.verifyToken, lecturerController.getMajors);
// router.get("/major/:id", middlewareController.verifyToken, lecturerController.getMajorById);
// router.post("/import-majors", middlewareController.verifyTokenImport, lecturerController.importMajors);
// router.post("/create-major", middlewareController.verifyTokenAdd, lecturerController.addMajor);
// router.put("/update-major/:id", middlewareController.verifyTokenUpdate, lecturerController.updateMajor);
// router.delete("/delete-major/:id", middlewareController.verifyTokenDelete, lecturerController.deleteMajor);

// // Api Class
// router.post("/classes", middlewareController.verifyToken, lecturerController.getClasses);
// router.get("/class/:id", middlewareController.verifyToken, lecturerController.getClassById);
// router.post("/import-classes", middlewareController.verifyTokenImport, lecturerController.importClasses);
// router.post("/create-class", middlewareController.verifyTokenAdd, lecturerController.addClass);
// router.put("/update-class/:id", middlewareController.verifyTokenUpdate, lecturerController.updateClass);
// router.delete("/delete-class/:id", middlewareController.verifyTokenDelete, lecturerController.deleteClass);

// // Api Evaluation Method
// router.post("/evaluation-methods", middlewareController.verifyToken, lecturerController.getEvaluationMethods);
// router.get("/evaluation-method/:id", middlewareController.verifyToken, lecturerController.getEvaluationMethodById);
// router.post("/import-evaluation-methods", middlewareController.verifyTokenImport, lecturerController.importEvaluationMethods);
// router.post("/create-evaluation-method", middlewareController.verifyTokenAdd, lecturerController.addEvaluationMethod);
// router.put("/update-evaluation-method/:id", middlewareController.verifyTokenUpdate, lecturerController.updateEvaluationMethod);
// router.delete("/delete-evaluation-method/:id", middlewareController.verifyTokenDelete, lecturerController.deleteEvaluationMethod);

// // Api Evaluation Criteria
// router.post("/evaluation-criterias", middlewareController.verifyToken, lecturerController.getEvaluationCriterias);
// router.get("/evaluation-criteria/:id", middlewareController.verifyToken, lecturerController.getEvaluationCriteriaByIdMethod);
// router.post("/import-evaluation-criterias", middlewareController.verifyTokenImport, lecturerController.importEvaluationCriterias);
// router.post("/create-evaluation-criteria", middlewareController.verifyTokenAdd, lecturerController.addEvaluationCriteria);
// router.put("/update-evaluation-criteria/:id", middlewareController.verifyTokenUpdate, lecturerController.updateEvaluationCriteria);
// router.delete("/delete-evaluation-criteria/:id", middlewareController.verifyTokenDelete, lecturerController.deleteEvaluationCriteria);

// // Api Lecturer
// router.post("/lecturers", middlewareController.verifyToken, lecturerController.getLecturers);
// router.get("/lecturer/:id", middlewareController.verifyToken, lecturerController.getLecturerById);
// router.post("/import-lecturers", middlewareController.verifyTokenImport, lecturerController.importLecturers);
// router.post("/create-lecturer", middlewareController.verifyTokenAdd, lecturerController.addLecturer);
// router.put("/update-lecturer/:id", middlewareController.verifyTokenUpdate, lecturerController.updateLecturer);
// router.put("/reset-password-lecturer/:id", middlewareController.verifyTokenUpdate, lecturerController.resetPasswordLecturer);
// router.delete("/delete-lecturer/:id", middlewareController.verifyTokenDelete, lecturerController.deleteLecturer);

// // Api Student
// router.post("/students", middlewareController.verifyToken, lecturerController.getStudents);
// router.get("/student/:id", middlewareController.verifyToken, lecturerController.getStudentById);
// router.post("/import-students", middlewareController.verifyTokenImport, lecturerController.importStudents);
// router.post("/create-student", middlewareController.verifyTokenAdd, lecturerController.addStudent);
// router.put("/update-student/:id", middlewareController.verifyTokenUpdate, lecturerController.updateStudent);
// router.put("/reset-password-student/:id", middlewareController.verifyTokenUpdate, lecturerController.resetPasswordStudent);
// router.delete("/delete-student/:id", middlewareController.verifyTokenDelete, lecturerController.deleteStudent);

// // Api Topic
// router.post("/topics", middlewareController.verifyToken, lecturerController.getTopics);
// router.get("/topic/:id", middlewareController.verifyToken, lecturerController.getTopicById);
// router.post("/import-topics", middlewareController.verifyTokenImport, lecturerController.importTopics);
// router.post("/create-topic", middlewareController.verifyTokenAdd, lecturerController.addTopic);
// router.put("/update-topic/:id", middlewareController.verifyTokenUpdate, lecturerController.updateTopic);
// router.delete("/delete-topic/:id", middlewareController.verifyTokenDelete, lecturerController.deleteTopic);


// // Api ThesisSession
// router.post("/thesis-session",middlewareController.verifyToken, lecturerController.getThesisSessions);
// router.get("/thesis-session/:id", middlewareController.verifyToken, lecturerController.getThesisSessionById);
// router.post("/import-thesis-sessions", middlewareController.verifyTokenImport, lecturerController.importThesisSessions);
// router.post("/create-thesis-session", middlewareController.verifyTokenAdd, lecturerController.addThesisSession);
// router.put("/update-thesis-session/:id", middlewareController.verifyTokenUpdate, lecturerController.updateThesisSession);
// router.delete("/delete-thesis-session/:id", middlewareController.verifyTokenDelete, lecturerController.deleteThesisSession);

// // Api Thesis
// router.post("/theses", middlewareController.verifyToken, lecturerController.getTheses);
// router.get("/thesis/:id", middlewareController.verifyToken, lecturerController.getThesisById);
// router.post("/import-theses", middlewareController.verifyTokenImport, lecturerController.importTheses);
// router.post("/create-thesis", middlewareController.verifyTokenAdd, lecturerController.addThesis);
// router.put("/update-thesis/:id", middlewareController.verifyTokenUpdate, lecturerController.updateThesis);
// router.delete("/delete-thesis/:id", middlewareController.verifyTokenDelete, lecturerController.deleteThesis);

router.post("/refresh", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
