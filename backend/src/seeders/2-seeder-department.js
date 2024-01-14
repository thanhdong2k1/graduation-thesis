"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("departments", [
      {
        name: "Công nghệ thông tin",
        description: "Mô tả khoa Công nghệ thông tin",
        founding: "2024-02-10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ngoại ngữ",
        description: "Mô tả khoa Ngoại ngữ",
        founding: "2024-02-10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quản trị kinh doanh",
        description: "Mô tả khoa Quản trị kinh doanh",
        founding: "2024-02-10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xây dựng",
        description: "Mô tả khoa Xây dựng",
        founding: "2024-02-10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thủy lợi",
        description: "Mô tả khoa Thủy lợi",
        founding: "2024-02-10",
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
