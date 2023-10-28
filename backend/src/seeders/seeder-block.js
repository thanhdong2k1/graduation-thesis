"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("blocks", [
      {
        name: "59",
        description: "Mô tả khối 59",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "60",
        description: "Mô tả khối 60",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "61",
        description: "Mô tả khối 61",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "62",
        description: "Mô tả khối 62",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "63",
        description: "Mô tả khối 63",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "64",
        description: "Mô tả khối 64",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "65",
        description: "Mô tả khối 65",
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
