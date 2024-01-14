"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("thesis_session", [
      {
        name: "Đợt 1 2022-2023",
        description: "Mô tả khóa luận Đợt 1 2022-2023",
        startDate: "2023/01/18",
        endDate: "2023/01/21",
        validMark: "1.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đợt 2 2022-2023",
        description: "Mô tả khóa luận Đợt 2 2022-2023",
        startDate: "2023/07/22",
        endDate: "2023/07/25",
        validMark: "1.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đợt 1 2023-2024",
        description: "Mô tả khóa luận Đợt 1 2023-2024",
        startDate: "2024/01/18",
        endDate: "2024/01/21",
        validMark: "1.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đợt 2 2023-2024",
        description: "Mô tả khóa luận Đợt 2 2023-2024",
        startDate: "2024/07/22",
        endDate: "2024/07/25",
        validMark: "1.5",
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
