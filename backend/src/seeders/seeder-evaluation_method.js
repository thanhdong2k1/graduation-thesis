"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Evaluation_Method", [
      {
        name: "Phương pháp đánh giá 2022",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phương pháp đánh giá 2023",
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
