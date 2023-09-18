"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Evaluation_Criteria", [
      {
        name: "Điểm trình bày ĐATN",
        weight: "2",
        order: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nội dung kỹ thuật ",
        weight: null,
        order: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tính ứng dụng",
        weight: "1",
        order: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Giải pháp công nghệ",
        weight: "1",
        order: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tính đúng đắn và hợp lý",
        weight: "1",
        order: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khối lượng công việc hoàn thành",
        weight: "3",
        order: "6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tính sáng tạo, tính mới, áp dụng công nghệ và thuật toán tiên tiến vào đề tài",
        weight: "2",
        order: "7",
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
