"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("classes", [
      {
        name: "Lớp 59TH1",
        description: "Mô tả lớp 59TH1",
        // blockId: "1",
        // majorId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   name: "Lớp 59TH2",
      //   description: "Mô tả lớp 59TH2",
      //   // blockId: "1",
      //   // majorId: "1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 60TH1",
      //   description: "Mô tả lớp 60TH1",
      //   // blockId: "1",
      //   // majorId: "1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 60TH2",
      //   description: "Mô tả lớp 60TH2",
      //   // blockId: "1",
      //   // majorId: "1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61TH1",
      //   description: "Mô tả lớp 61TH1",
      //   // blockId: "1",
      //   // majorId: "1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61TH2",
      //   description: "Mô tả lớp 61TH2",
      //   // blockId: "1",
      //   // majorId: "1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61KH1",
      //   description: "Mô tả lớp 61KH1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61KH2",
      //   description: "Mô tả lớp 61KH2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61KT1",
      //   description: "Mô tả lớp 61KT1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61KT2",
      //   description: "Mô tả lớp 61KT2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61TMĐT1",
      //   description: "Mô tả lớp 61TMĐT1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61TMĐT2",
      //   description: "Mô tả lớp 61TMĐT2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61NNA1",
      //   description: "Mô tả lớp 61NNA1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61NNA2",
      //   description: "Mô tả lớp 61NNA2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61QTKD1",
      //   description: "Mô tả lớp 61QTKD1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61QTKD2",
      //   description: "Mô tả lớp 61QTKD2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61MKT1",
      //   description: "Mô tả lớp 61MKT1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61MKT2",
      //   description: "Mô tả lớp 61MKT2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61CX1",
      //   description: "Mô tả lớp 61CX1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61CX2",
      //   description: "Mô tả lớp 61CX2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61CTL1",
      //   description: "Mô tả lớp 61CTL1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61CTL2",
      //   description: "Mô tả lớp 61CTL2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61CTN1",
      //   description: "Mô tả lớp 61CTN1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61CTN2",
      //   description: "Mô tả lớp 61CTN2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61LG1",
      //   description: "Mô tả lớp 61LG1",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "Lớp 61LG2",
      //   description: "Mô tả lớp 61LG2",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
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
