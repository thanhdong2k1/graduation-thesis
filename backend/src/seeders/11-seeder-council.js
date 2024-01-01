"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("councils", [
      {
        name: "HỘI ĐỒNG 0000000001",
        description: "Hội đồng 01 năm 2023",
        statusId: "S0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HỘI ĐỒNG 0000000002",
        description: "Hội đồng 01 năm 2024",
        statusId: "S0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HỘI ĐỒNG 0000000003",
        description: "Hội đồng 01 năm 2025",
        statusId: "S0",
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
