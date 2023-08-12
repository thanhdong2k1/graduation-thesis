"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Classes", [
      {
        name: "61TH1",
        description: "Mô tả lớp 61TH1",
      },
      {
        name: "61TH2",
        description: "Mô tả lớp 61TH2",
      },
      {
        name: "61KH1",
        description: "Mô tả lớp 61KH1",
      },
      {
        name: "61KH2",
        description: "Mô tả lớp 61KH2",
      },
      {
        name: "61KT1",
        description: "Mô tả lớp 61KT1",
      },
      {
        name: "61KT2",
        description: "Mô tả lớp 61KT2",
      },
      {
        name: "61TMĐT1",
        description: "Mô tả lớp 61TMĐT1",
      },
      {
        name: "61TMĐT2",
        description: "Mô tả lớp 61TMĐT2",
      },
      {
        name: "61NNA1",
        description: "Mô tả lớp 61NNA1",
      },
      {
        name: "61NNA2",
        description: "Mô tả lớp 61NNA2",
      },
      {
        name: "61QTKD1",
        description: "Mô tả lớp 61QTKD1",
      },
      {
        name: "61QTKD2",
        description: "Mô tả lớp 61QTKD2",
      },
      {
        name: "61MKT1",
        description: "Mô tả lớp 61MKT1",
      },
      {
        name: "61MKT2",
        description: "Mô tả lớp 61MKT2",
      },
      {
        name: "61CX1",
        description: "Mô tả lớp 61CX1",
      },
      {
        name: "61CX2",
        description: "Mô tả lớp 61CX2",
      },
      {
        name: "61CTL1",
        description: "Mô tả lớp 61CTL1",
      },
      {
        name: "61CTL2",
        description: "Mô tả lớp 61CTL2",
      },
      {
        name: "61CTN1",
        description: "Mô tả lớp 61CTN1",
      },
      {
        name: "61CTN2",
        description: "Mô tả lớp 61CTN2",
      },
      {
        name: "61LG1",
        description: "Mô tả lớp 61LG1",
      },
      {
        name: "61LG2",
        description: "Mô tả lớp 61LG2",
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
