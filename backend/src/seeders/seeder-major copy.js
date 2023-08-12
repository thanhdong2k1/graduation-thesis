"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Topics", [
      {
        name: "CNTT-Phát triển ứng dụng di động cho quản lý việc làm tự động.",
        description:
          "Mô tả đề tài CNTT-Phát triển ứng dụng di động cho quản lý việc làm tự động.",
        statusId: "H1",
      },
      {
        name: "CNTT-Thiết kế hệ thống giám sát an ninh thông minh sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài CNTT-Thiết kế hệ thống giám sát an ninh thông minh sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
      },
      {
        name: "CNTT-Nghiên cứu và triển khai hệ thống blockchain trong quản lý tài chính.",
        description:
          "Mô tả đề tài CNTT-Nghiên cứu và triển khai hệ thống blockchain trong quản lý tài chính.",
        statusId: "H1",
      },
      {
        name: "NN-Nghiên cứu và phát triển ứng dụng học ngôn ngữ trực tuyến sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và phát triển ứng dụng học ngôn ngữ trực tuyến sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
      },
      {
        name: "NN-Tổ chức sự kiện giao lưu văn hóa quốc tế nhằm tăng cường hiểu biết về các nền văn hóa khác nhau.",
        description:
          "Mô tả đề tài NN-Tổ chức sự kiện giao lưu văn hóa quốc tế nhằm tăng cường hiểu biết về các nền văn hóa khác nhau.",
        statusId: "H1",
      },
      {
        name: "NN-Nghiên cứu và phát triển phần mềm dịch thuật tự động sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và phát triển phần mềm dịch thuật tự động sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
      },
      {
        name: "QTKD-Nghiên cứu và phát triển hệ thống quản lý khách hàng sử dụng trí tuệ nhân tạo để cải thiện trải nghiệm khách hàng.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và phát triển hệ thống quản lý khách hàng sử dụng trí tuệ nhân tạo để cải thiện trải nghiệm khách hàng.",
        statusId: "H1",
      },
      {
        name: "QTKD-Phân tích và đánh giá hiệu quả của chiến lược tiếp thị số trong kinh doanh.",
        description:
          "Mô tả đề tài QTKD-Phân tích và đánh giá hiệu quả của chiến lược tiếp thị số trong kinh doanh.",
        statusId: "H1",
      },
      {
        name: "QTKD-Nghiên cứu và phát triển hệ thống quản lý tài chính sử dụng trí tuệ nhân tạo để tối ưu chi phí và tăng hiệu suất kinh doanh.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và phát triển hệ thống quản lý tài chính sử dụng trí tuệ nhân tạo để tối ưu chi phí và tăng hiệu suất kinh doanh.",
        statusId: "H1",
      },
      {
        name: "XD-Thiết kế và xây dựng các công trình xây dựng sử dụng các vật liệu tái chế để bảo vệ môi trường.",
        description:
          "Mô tả đề tài XD-Thiết kế và xây dựng các công trình xây dựng sử dụng các vật liệu tái chế để bảo vệ môi trường.",
        statusId: "H1",
      },
      {
        name: "XD-Nghiên cứu và phát triển các công nghệ xây dựng thông minh sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài XD-Nghiên cứu và phát triển các công nghệ xây dựng thông minh sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
      },
      {
        name: "XD-Thiết kế và xây dựng các công trình xây dựng hiệu quả năng lượng để tiết kiệm chi phí vận hành.",
        description:
          "Mô tả đề tài XD-Thiết kế và xây dựng các công trình xây dựng hiệu quả năng lượng để tiết kiệm chi phí vận hành.",
        statusId: "H1",
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
