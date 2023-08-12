"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Majors", [
      {
        name: "Công nghệ thông tin",
        description: "Mô tả ngành Công nghệ thông tin",
      },
      {
        name: "Khoa học máy tính",
        description: "Mô tả ngành Khoa học máy tính",
      },
      {
        name: "Kế toán",
        description: "Mô tả ngành Kế toán",
      },
      {
        name: "Thương mại điện tử",
        description: "Mô tả ngành Thương mại điện tử",
      },
      {
        name: "Ngôn ngữ Anh",
        description: "Mô tả ngành Ngôn ngữ Anh",
      },
      {
        name: "Quản trị kinh doanh",
        description: "Mô tả ngành Quản trị kinh doanh",
      },
      {
        name: "Marketing",
        description: "Mô tả ngành Marketing",
      },
      {
        name: "Công nghệ kỹ thuật công trình xây dựng",
        description: "Mô tả ngành Công nghệ kỹ thuật công trình xây dựng",
      },
      {
        name: "Quản lý xây dựng",
        description: "Mô tả ngành Quản lý xây dựng",
      },
      {
        name: "Công nghệ kỹ thuật công trình thủy",
        description: "Mô tả ngành Công nghệ kỹ thuật công trình thủy",
      },
      {
        name: "Cấp thoát nước",
        description: "Mô tả ngành Cấp thoát nước",
      },
      {
        name: "Logistic - Quản lí chuỗi cung ứng",
        description: "Mô tả ngành Logistic - Quản lí chuỗi cung ứng",
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
