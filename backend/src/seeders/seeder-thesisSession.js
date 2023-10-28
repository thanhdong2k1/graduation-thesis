"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("thesis_session", [
      {
        name: "Đợt 1 2022-2023",
        description: "Mô tả khóa luận Đợt 1 2022-2023",
        startDate: "18/01/2023",
        endDate: "21/01/2023",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đợt 2 2022-2023",
        description: "Mô tả khóa luận Đợt 2 2022-2023",
        startDate: "22/07/2023",
        endDate: "25/07/2023",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đợt 1 2023-2024",
        description: "Mô tả khóa luận Đợt 1 2023-2024",
        startDate: "18/01/2024",
        endDate: "21/01/2024",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đợt 2 2023-2024",
        description: "Mô tả khóa luận Đợt 2 2023-2024",
        startDate: "22/07/2024",
        endDate: "25/07/2024",
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
