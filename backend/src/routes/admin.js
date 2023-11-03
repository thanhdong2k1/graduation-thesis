const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/change-password-admin", middlewareController.verifyToken,adminController.changePasswordAdmin);
router.post("/change-information-admin", middlewareController.verifyToken, adminController.changeInformationAdmin);
router.post("/get-information-admin", middlewareController.verifyToken, adminController.getInformationAdmin);

router.post("/change-password-student", middlewareController.verifyToken,adminController.changePasswordStudent);
router.post("/change-information-student", middlewareController.verifyToken, adminController.changeInformationStudent);
router.post("/get-information-student", middlewareController.verifyToken, adminController.getInformationStudent);
router.post("/get-allcode", middlewareController.verifyToken, adminController.getAllcode);
// Api Council
router.post("/councils", middlewareController.verifyToken, adminController.getCouncils);
router.get("/council/:id", middlewareController.verifyToken, adminController.getCouncilById);
router.post("/import-councils", middlewareController.verifyTokenImport, adminController.importCouncils);
router.post("/create-council", middlewareController.verifyTokenAdd, adminController.addCouncil);
router.put("/update-council/:id", middlewareController.verifyTokenUpdate, adminController.updateCouncil);
router.delete("/delete-council/:id", middlewareController.verifyTokenDelete, adminController.deleteCouncil);

// Api Council
router.get("/council-detail/:id", middlewareController.verifyToken, adminController.getCouncilDetailByIdCouncil);

// Api Department
router.post("/departments", middlewareController.verifyToken, adminController.getDepartments);
router.get("/department/:id", middlewareController.verifyToken, adminController.getDepartmentById);
router.post("/import-departments", middlewareController.verifyTokenImport, adminController.importDepartments);
router.post("/create-department", middlewareController.verifyTokenAdd, adminController.addDepartment);
router.put("/update-department/:id", middlewareController.verifyTokenUpdate, adminController.updateDepartment);
router.delete("/delete-department/:id", middlewareController.verifyTokenDelete, adminController.deleteDepartment);

// Api Block
router.post("/blocks", middlewareController.verifyToken, adminController.getBlocks);
router.get("/block/:id", middlewareController.verifyToken, adminController.getBlockById);
router.post("/import-blocks", middlewareController.verifyTokenImport, adminController.importBlocks);
router.post("/create-block", middlewareController.verifyTokenAdd, adminController.addBlock);
router.put("/update-block/:id", middlewareController.verifyTokenUpdate, adminController.updateBlock);
router.delete("/delete-block/:id", middlewareController.verifyTokenDelete, adminController.deleteBlock);

// Api Major
router.post("/majors", middlewareController.verifyToken, adminController.getMajors);
router.get("/major/:id", middlewareController.verifyToken, adminController.getMajorById);
router.post("/import-majors", middlewareController.verifyTokenImport, adminController.importMajors);
router.post("/create-major", middlewareController.verifyTokenAdd, adminController.addMajor);
router.put("/update-major/:id", middlewareController.verifyTokenUpdate, adminController.updateMajor);
router.delete("/delete-major/:id", middlewareController.verifyTokenDelete, adminController.deleteMajor);

// Api Class
router.post("/classes", middlewareController.verifyToken, adminController.getClasses);
router.get("/class/:id", middlewareController.verifyToken, adminController.getClassById);
router.post("/import-classes", middlewareController.verifyTokenImport, adminController.importClasses);
router.post("/create-class", middlewareController.verifyTokenAdd, adminController.addClass);
router.put("/update-class/:id", middlewareController.verifyTokenUpdate, adminController.updateClass);
router.delete("/delete-class/:id", middlewareController.verifyTokenDelete, adminController.deleteClass);

// Api Evaluation Method
router.post("/evaluation-methods", middlewareController.verifyToken, adminController.getEvaluationMethods);
router.get("/evaluation-method/:id", middlewareController.verifyToken, adminController.getEvaluationMethodById);
router.post("/import-evaluation-methods", middlewareController.verifyTokenImport, adminController.importEvaluationMethods);
router.post("/create-evaluation-method", middlewareController.verifyTokenAdd, adminController.addEvaluationMethod);
router.put("/update-evaluation-method/:id", middlewareController.verifyTokenUpdate, adminController.updateEvaluationMethod);
router.delete("/delete-evaluation-method/:id", middlewareController.verifyTokenDelete, adminController.deleteEvaluationMethod);

// Api Evaluation Criteria
router.post("/evaluation-criterias", middlewareController.verifyToken, adminController.getEvaluationCriterias);
router.get("/evaluation-criteria/:id", middlewareController.verifyToken, adminController.getEvaluationCriteriaByIdMethod);
router.post("/import-evaluation-criterias", middlewareController.verifyTokenImport, adminController.importEvaluationCriterias);
router.post("/create-evaluation-criteria", middlewareController.verifyTokenAdd, adminController.addEvaluationCriteria);
router.put("/update-evaluation-criteria/:id", middlewareController.verifyTokenUpdate, adminController.updateEvaluationCriteria);
router.delete("/delete-evaluation-criteria/:id", middlewareController.verifyTokenDelete, adminController.deleteEvaluationCriteria);

// Api Lecturer
router.post("/lecturers", middlewareController.verifyToken, adminController.getLecturers);
router.get("/lecturer/:id", middlewareController.verifyToken, adminController.getLecturerById);
router.post("/import-lecturers", middlewareController.verifyTokenImport, adminController.importLecturers);
router.post("/create-lecturer", middlewareController.verifyTokenAdd, adminController.addLecturer);
router.put("/update-lecturer/:id", middlewareController.verifyTokenUpdate, adminController.updateLecturer);
router.put("/reset-password-lecturer/:id", middlewareController.verifyTokenUpdate, adminController.resetPasswordLecturer);
router.delete("/delete-lecturer/:id", middlewareController.verifyTokenDelete, adminController.deleteLecturer);

// Api Student
router.post("/students", middlewareController.verifyToken, adminController.getStudents);
router.get("/student/:id", middlewareController.verifyToken, adminController.getStudentById);
router.post("/import-students", middlewareController.verifyTokenImport, adminController.importStudents);
router.post("/create-student", middlewareController.verifyTokenAdd, adminController.addStudent);
router.put("/update-student/:id", middlewareController.verifyTokenUpdate, adminController.updateStudent);
router.put("/reset-password-student/:id", middlewareController.verifyTokenUpdate, adminController.resetPasswordStudent);
router.delete("/delete-student/:id", middlewareController.verifyTokenDelete, adminController.deleteStudent);

// Api Topic
router.post("/topics", middlewareController.verifyToken, adminController.getTopics);
router.get("/topic/:id", middlewareController.verifyToken, adminController.getTopicById);
router.post("/import-topics", middlewareController.verifyTokenImport, adminController.importTopics);
router.post("/create-topic", middlewareController.verifyTokenAdd, adminController.addTopic);
router.put("/update-topic/:id", middlewareController.verifyTokenUpdate, adminController.updateTopic);
router.delete("/delete-topic/:id", middlewareController.verifyTokenDelete, adminController.deleteTopic);


// Api ThesisSession
router.post("/thesis-session",middlewareController.verifyToken, adminController.getThesisSessions);
router.get("/thesis-session/:id", middlewareController.verifyToken, adminController.getThesisSessionById);
router.post("/import-thesis-sessions", middlewareController.verifyTokenImport, adminController.importThesisSessions);
router.post("/create-thesis-session", middlewareController.verifyTokenAdd, adminController.addThesisSession);
router.put("/update-thesis-session/:id", middlewareController.verifyTokenUpdate, adminController.updateThesisSession);
router.delete("/delete-thesis-session/:id", middlewareController.verifyTokenDelete, adminController.deleteThesisSession);

// Api Thesis
router.post("/theses", middlewareController.verifyToken, adminController.getTheses);
router.get("/thesis/:id", middlewareController.verifyToken, adminController.getThesisById);
router.post("/import-theses", middlewareController.verifyTokenImport, adminController.importTheses);
router.post("/create-thesis", middlewareController.verifyTokenAdd, adminController.addThesis);
router.put("/update-thesis/:id", middlewareController.verifyTokenUpdate, adminController.updateThesis);
router.delete("/delete-thesis/:id", middlewareController.verifyTokenDelete, adminController.deleteThesis);

router.post("/refresh", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
