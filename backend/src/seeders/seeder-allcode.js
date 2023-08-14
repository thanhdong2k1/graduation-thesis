"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Allcodes", [
      {
        code: "M",
        type: "GENDER",
        valueEn: "Male",
        valueVi: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "F",
        type: "GENDER",
        valueEn: "Female",
        valueVi: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "O",
        type: "GENDER",
        valueEn: "Other",
        valueVi: "Khác",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "R1",
        type: "ROLE",
        valueEn: "Admin",
        valueVi: "Quản trị viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "R2",
        type: "ROLE",
        valueEn: "Secretary",
        valueVi: "Thư kí",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "R3",
        type: "ROLE",
        valueEn: "Lecturer",
        valueVi: "Giảng viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "R4",
        type: "ROLE",
        valueEn: "Student",
        valueVi: "Sinh viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "P0",
        type: "POSITION",
        valueEn: "Lecturer",
        valueVi: "Giảng viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "P1",
        type: "POSITION",
        valueEn: "Chairman",
        valueVi: "Chủ tịch",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "P2",
        type: "POSITION",
        valueEn: "Secretary",
        valueVi: "Thư kí",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "P3",
        type: "POSITION",
        valueEn: "Examiner",
        valueVi: "Phản biện",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "P4",
        type: "POSITION",
        valueEn: "Thesis Advisor",
        valueVi: "Giảng viên hướng dẫn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "S1",
        type: "STATUS",
        valueEn: "Active",
        valueVi: "Kích hoạt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "S2",
        type: "STATUS",
        valueEn: "Disable",
        valueVi: "Vô hiệu hóa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "H1",
        type: "HANDLE",
        valueEn: "New",
        valueVi: "Mới",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "H2",
        type: "HANDLE",
        valueEn: "Pending",
        valueVi: "Đang chờ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "H3",
        type: "HANDLE",
        valueEn: "Confirmed",
        valueVi: "Đã xác nhận",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "H4",
        type: "HANDLE",
        valueEn: "Cancel",
        valueVi: "Đã hủy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};