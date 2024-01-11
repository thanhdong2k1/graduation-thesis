const express = require("express");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const studentController = require("../controllers/studentController");
const router = express.Router();

export const storage = multer.diskStorage({
  destination: (req, file, res) => {
    const today = new Date()
      ?.toLocaleDateString("vi-VN")
      ?.split("/");
    return res(null, `./src/public/upload`); // './public/images/' directory name where save the file
  },
  filename: (req, file, res) => {
    const today = new Date()
      ?.toLocaleDateString("vi-VN")
      ?.split("/");
    console.log(req.body.data);
    let date = `${today[2]}-${today[1]}-${today[0]}`;
    const path = `./src/public/upload`;
    fs.mkdirSync(path, { recursive: true });
    // fs.unlinkSync("./src/public/upload/1704299738606Intern-ReactJS.docx.pdf-.pdf");
    const originalName = Buffer.from(file.originalname, "latin1")?.toString(
      "utf-8"
    );
    const sanitizedFileName = removeAccents(originalName);
    return res(null, `${date} - ${sanitizedFileName}`);
  },
});
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const upload = multer({
  storage: storage,
});

router.post(
  "/change-password",
  middlewareController.verifyToken,
  studentController.changePasswordStudent
);
router.post(
  "/change-information",
  middlewareController.verifyToken,
  studentController.changeInformationStudent
);
router.post(
  "/get-information",
  middlewareController.verifyToken,
  studentController.getInformationStudent
);

// Api Lecturer
router.post(
  "/lecturers",
  middlewareController.verifyToken,
  studentController.getLecturers
);
router.get(
  "/lecturer/:id",
  middlewareController.verifyToken,
  studentController.getLecturerById
);
router.get(
  "/register-advisor/:id",
  middlewareController.verifyToken,
  studentController.registerAdvisorById
);

router.get(
  "/register-topic/:id",
  middlewareController.verifyToken,
  studentController.registerTopicById
);

// Api Thesis
router.post(
  "/theses",
  middlewareController.verifyToken,
  studentController.getTheses
);
router.get(
  "/thesis/:id",
  middlewareController.verifyToken,
  studentController.getThesisById
);
router.put(
  "/upload-thesis/:id",
  upload.single("file"),
  studentController.updateThesis
);

// Api Topic
router.post(
  "/topics",
  middlewareController.verifyToken,
  studentController.getTopics
);
router.get(
  "/topic/:id",
  middlewareController.verifyToken,
  studentController.getTopicById
);

router.post("/create-topic", middlewareController.verifyToken, studentController.addTopic);

module.exports = router;
