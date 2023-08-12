"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Blocks", [
      {
        name: "59",
        description: "Mô tả khối 59",
      },
      {
        name: "60",
        description: "Mô tả khối 60",
      },
      {
        name: "61",
        description: "Mô tả khối 61",
      },
      {
        name: "62",
        description: "Mô tả khối 62",
      },
      {
        name: "63",
        description: "Mô tả khối 63",
      },
      {
        name: "64",
        description: "Mô tả khối 64",
      },
      {
        name: "65",
        description: "Mô tả khối 65",
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
