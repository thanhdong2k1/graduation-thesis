"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("majors", [
      {
        name: "Công nghệ thông tin",
        description: "Mô tả ngành Công nghệ thông tin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khoa học máy tính",
        description: "Mô tả ngành Khoa học máy tính",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kế toán",
        description: "Mô tả ngành Kế toán",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thương mại điện tử",
        description: "Mô tả ngành Thương mại điện tử",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ngôn ngữ Anh",
        description: "Mô tả ngành Ngôn ngữ Anh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quản trị kinh doanh",
        description: "Mô tả ngành Quản trị kinh doanh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marketing",
        description: "Mô tả ngành Marketing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Công nghệ kỹ thuật công trình xây dựng",
        description: "Mô tả ngành Công nghệ kỹ thuật công trình xây dựng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quản lý xây dựng",
        description: "Mô tả ngành Quản lý xây dựng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Công nghệ kỹ thuật công trình thủy",
        description: "Mô tả ngành Công nghệ kỹ thuật công trình thủy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cấp thoát nước",
        description: "Mô tả ngành Cấp thoát nước",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Logistic - Quản lí chuỗi cung ứng",
        description: "Mô tả ngành Logistic - Quản lí chuỗi cung ứng",
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
