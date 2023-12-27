"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("departments", [
      {
        name: "Công nghệ thông tin",
        description: "Mô tả khoa Công nghệ thông tin",
        founding: "26-07-1979",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ngoại ngữ",
        description: "Mô tả khoa Ngoại ngữ",
        founding: "26-07-1979",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quản trị kinh doanh",
        description: "Mô tả khoa Quản trị kinh doanh",
        founding: "26-07-1979",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xây dựng",
        description: "Mô tả khoa Xây dựng",
        founding: "26-07-1979",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thủy lợi",
        description: "Mô tả khoa Thủy lợi",
        founding: "26-07-1979",
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
