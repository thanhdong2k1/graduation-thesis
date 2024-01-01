"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("blocks", [
      {
        name: "Khối 59",
        description: "Mô tả khối 59",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khối 60",
        description: "Mô tả khối 60",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khối 61",
        description: "Mô tả khối 61",
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
