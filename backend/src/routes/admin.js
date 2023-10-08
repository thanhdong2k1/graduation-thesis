const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/change-password", middlewareController.verifyToken,adminController.changePassword);
router.post("/change-information", middlewareController.verifyToken, adminController.changeInformation);
router.post("/get-information", middlewareController.verifyToken, adminController.getInformation);
router.post("/get-allcode", middlewareController.verifyToken, adminController.getAllcode);
// Api Council
router.post("/councils", middlewareController.verifyToken, adminController.getCouncils);
router.get("/council/:id", middlewareController.verifyToken, adminController.getCouncilById);
router.post("/import-councils", middlewareController.verifyTokenImport, adminController.importCouncils);
router.post("/create-council", middlewareController.verifyTokenAdd, adminController.addCouncil);
router.put("/update-council/:id", middlewareController.verifyTokenUpdate, adminController.updateCouncil);
router.delete("/delete-council/:id", middlewareController.verifyTokenDelete, adminController.deleteCouncil);

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

// Api Lecturer
router.post("/lecturers", middlewareController.verifyToken, adminController.getLecturers);
router.get("/lecturer/:id", middlewareController.verifyToken, adminController.getLecturerById);
router.post("/import-lecturers", middlewareController.verifyTokenImport, adminController.importLecturers);
router.post("/create-lecturer", middlewareController.verifyTokenAdd, adminController.addLecturer);
router.put("/update-lecturer/:id", middlewareController.verifyTokenUpdate, adminController.updateLecturer);
router.delete("/delete-lecturer/:id", middlewareController.verifyTokenDelete, adminController.deleteLecturer);

// Api ThesisSession
router.post("/thesis-session",middlewareController.verifyToken, adminController.getThesisSessions);

router.post("/refresh", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
