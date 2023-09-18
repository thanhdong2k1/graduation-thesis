-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 04, 2023 lúc 04:55 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `graduation-thesis-full`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `allcodes`
--

CREATE TABLE `allcodes` (
  `code` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `valueEn` varchar(255) DEFAULT NULL,
  `valueVi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `majorId` int(11) DEFAULT NULL,
  `blockId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `thesisId` int(11) DEFAULT NULL,
  `lecturerId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `councils`
--

CREATE TABLE `councils` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `thesisSessionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `council_detail`
--

CREATE TABLE `council_detail` (
  `id` int(11) NOT NULL,
  `positionId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `councilId` int(11) DEFAULT NULL,
  `lecturerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `founding` varchar(255) DEFAULT NULL,
  `deanId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `evaluation_criteria`
--

CREATE TABLE `evaluation_criteria` (
  `id` int(11) NOT NULL,
  `evaluationMethodId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `evaluation_method`
--

CREATE TABLE `evaluation_method` (
  `id` int(11) NOT NULL,
  `name` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lecturers`
--

CREATE TABLE `lecturers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `numberPhone` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `genderId` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `majors`
--

CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `points`
--

CREATE TABLE `points` (
  `id` int(11) NOT NULL,
  `totalPoint` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `councilDetailId` int(11) DEFAULT NULL,
  `thesisId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `point_criteria`
--

CREATE TABLE `point_criteria` (
  `id` int(11) NOT NULL,
  `point` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `evaluationCriteriaId` int(11) DEFAULT NULL,
  `pointId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `numberPhone` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `genderId` varchar(255) DEFAULT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `theses`
--

CREATE TABLE `theses` (
  `id` int(11) NOT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `complateDate` varchar(255) DEFAULT NULL,
  `thesisStartDate` varchar(255) DEFAULT NULL,
  `thesisEndDate` varchar(255) DEFAULT NULL,
  `reportFile` varchar(255) DEFAULT NULL,
  `totalScore` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `topicId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `thesisAdvisor` int(11) DEFAULT NULL,
  `thesisAdvisorStatus` varchar(255) DEFAULT NULL,
  `thesisSessionId` int(11) DEFAULT NULL,
  `councilId` int(11) DEFAULT NULL,
  `councilStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thesis_session`
--

CREATE TABLE `thesis_session` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `validPoint` float DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `endDate` varchar(255) DEFAULT NULL,
  `evaluationMethodId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `majorId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  ADD PRIMARY KEY (`code`);

--
-- Chỉ mục cho bảng `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `majorId` (`majorId`),
  ADD KEY `blockId` (`blockId`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `thesisId` (`thesisId`),
  ADD KEY `lecturerId` (`lecturerId`),
  ADD KEY `studentId` (`studentId`);

--
-- Chỉ mục cho bảng `councils`
--
ALTER TABLE `councils`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statusId` (`statusId`),
  ADD KEY `thesisSessionId` (`thesisSessionId`);

--
-- Chỉ mục cho bảng `council_detail`
--
ALTER TABLE `council_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `council_detail_lecturerId_councilId_unique` (`councilId`,`lecturerId`),
  ADD KEY `positionId` (`positionId`),
  ADD KEY `lecturerId` (`lecturerId`);

--
-- Chỉ mục cho bảng `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deanId` (`deanId`);

--
-- Chỉ mục cho bảng `evaluation_criteria`
--
ALTER TABLE `evaluation_criteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evaluationMethodId` (`evaluationMethodId`);

--
-- Chỉ mục cho bảng `evaluation_method`
--
ALTER TABLE `evaluation_method`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `numberPhone` (`numberPhone`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `code_2` (`code`),
  ADD UNIQUE KEY `numberPhone_2` (`numberPhone`),
  ADD KEY `genderId` (`genderId`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `statusId` (`statusId`),
  ADD KEY `departmentId` (`departmentId`);

--
-- Chỉ mục cho bảng `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departmentId` (`departmentId`);

--
-- Chỉ mục cho bảng `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Points_thesisId_councilDetailId_unique` (`councilDetailId`,`thesisId`),
  ADD KEY `thesisId` (`thesisId`);

--
-- Chỉ mục cho bảng `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `numberPhone` (`numberPhone`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `code_2` (`code`),
  ADD UNIQUE KEY `numberPhone_2` (`numberPhone`),
  ADD KEY `genderId` (`genderId`),
  ADD KEY `statusId` (`statusId`),
  ADD KEY `classId` (`classId`),
  ADD KEY `roleId` (`roleId`);

--
-- Chỉ mục cho bảng `theses`
--
ALTER TABLE `theses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `result` (`result`),
  ADD KEY `topicId` (`topicId`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `thesisAdvisor` (`thesisAdvisor`),
  ADD KEY `thesisAdvisorStatus` (`thesisAdvisorStatus`),
  ADD KEY `thesisSessionId` (`thesisSessionId`),
  ADD KEY `councilId` (`councilId`),
  ADD KEY `councilStatus` (`councilStatus`);

--
-- Chỉ mục cho bảng `thesis_session`
--
ALTER TABLE `thesis_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evaluationMethodId` (`evaluationMethodId`);

--
-- Chỉ mục cho bảng `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statusId` (`statusId`),
  ADD KEY `majorId` (`majorId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `councils`
--
ALTER TABLE `councils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `council_detail`
--
ALTER TABLE `council_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `evaluation_criteria`
--
ALTER TABLE `evaluation_criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `evaluation_method`
--
ALTER TABLE `evaluation_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `majors`
--
ALTER TABLE `majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `points`
--
ALTER TABLE `points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `theses`
--
ALTER TABLE `theses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thesis_session`
--
ALTER TABLE `thesis_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`majorId`) REFERENCES `majors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`blockId`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `councils`
--
ALTER TABLE `councils`
  ADD CONSTRAINT `councils_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `councils_ibfk_2` FOREIGN KEY (`thesisSessionId`) REFERENCES `thesis_session` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `council_detail`
--
ALTER TABLE `council_detail`
  ADD CONSTRAINT `council_detail_ibfk_1` FOREIGN KEY (`positionId`) REFERENCES `allcodes` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `council_detail_ibfk_2` FOREIGN KEY (`councilId`) REFERENCES `councils` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `council_detail_ibfk_3` FOREIGN KEY (`lecturerId`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`deanId`) REFERENCES `lecturers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `evaluation_criteria`
--
ALTER TABLE `evaluation_criteria`
  ADD CONSTRAINT `evaluation_criteria_ibfk_1` FOREIGN KEY (`evaluationMethodId`) REFERENCES `evaluation_method` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`genderId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lecturers_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lecturers_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lecturers_ibfk_4` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `majors`
--
ALTER TABLE `majors`
  ADD CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `points`
--
ALTER TABLE `points`
  ADD CONSTRAINT `points_ibfk_1` FOREIGN KEY (`councilDetailId`) REFERENCES `council_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `points_ibfk_2` FOREIGN KEY (`thesisId`) REFERENCES `theses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`genderId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`statusId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`roleId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `theses`
--
ALTER TABLE `theses`
  ADD CONSTRAINT `theses_ibfk_1` FOREIGN KEY (`result`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_2` FOREIGN KEY (`topicId`) REFERENCES `topics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_3` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_4` FOREIGN KEY (`thesisAdvisor`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_5` FOREIGN KEY (`thesisAdvisorStatus`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_6` FOREIGN KEY (`thesisSessionId`) REFERENCES `thesis_session` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_7` FOREIGN KEY (`councilId`) REFERENCES `councils` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theses_ibfk_8` FOREIGN KEY (`councilStatus`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `thesis_session`
--
ALTER TABLE `thesis_session`
  ADD CONSTRAINT `thesis_session_ibfk_1` FOREIGN KEY (`evaluationMethodId`) REFERENCES `evaluation_method` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `allcodes` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topics_ibfk_2` FOREIGN KEY (`majorId`) REFERENCES `majors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
