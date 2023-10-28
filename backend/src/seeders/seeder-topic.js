"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("topics", [
      {
        name: "CNTT-Phát triển ứng dụng di động cho quản lý việc làm tự động.",
        description:
          "Mô tả đề tài CNTT-Phát triển ứng dụng di động cho quản lý việc làm tự động.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Thiết kế hệ thống giám sát an ninh thông minh sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài CNTT-Thiết kế hệ thống giám sát an ninh thông minh sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Nghiên cứu và triển khai hệ thống blockchain trong quản lý tài chính.",
        description:
          "Mô tả đề tài CNTT-Nghiên cứu và triển khai hệ thống blockchain trong quản lý tài chính.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Phân tích và thiết kế hệ thống quản lý cơ sở dữ liệu phân tán.",
        description:
          "Mô tả đề tài CNTT-Phân tích và thiết kế hệ thống quản lý cơ sở dữ liệu phân tán.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Phát triển ứng dụng di động dựa trên nền tảng đám mây.",
        description:
          "Mô tả đề tài CNTT-Phát triển ứng dụng di động dựa trên nền tảng đám mây.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Xác định và giảm thiểu rủi ro bảo mật trong môi trường ảo hóa.",
        description:
          "Mô tả đề tài CNTT-Xác định và giảm thiểu rủi ro bảo mật trong môi trường ảo hóa.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Triển khai và tối ưu hóa hệ thống mạng viễn thông.",
        description:
          "Mô tả đề tài CNTT-Triển khai và tối ưu hóa hệ thống mạng viễn thông.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Nghiên cứu và ứng dụng trí tuệ nhân tạo trong xử lý ngôn ngữ tự nhiên.",
        description:
          "Mô tả đề tài CNTT-Nghiên cứu và ứng dụng trí tuệ nhân tạo trong xử lý ngôn ngữ tự nhiên.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Phân tích và thiết kế thuật toán tối ưu hóa đa nhiệm.",
        description:
          "Mô tả đề tài CNTT-Phân tích và thiết kế thuật toán tối ưu hóa đa nhiệm.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Nghiên cứu và phát triển hệ thống nhận diện hình ảnh sử dụng deep learning.",
        description:
          "Mô tả đề tài CNTT-Nghiên cứu và phát triển hệ thống nhận diện hình ảnh sử dụng deep learning.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Tìm hiểu và áp dụng kỹ thuật trí tuệ nhân tạo trong tự động hóa quy trình kiểm thử phần mềm.",
        description:
          "Mô tả đề tài CNTT-Tìm hiểu và áp dụng kỹ thuật trí tuệ nhân tạo trong tự động hóa quy trình kiểm thử phần mềm.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Xây dựng hệ thống phân tích dữ liệu lớn (big data) sử dụng công nghệ dựa trên đám mây.",
        description:
          "Mô tả đề tài CNTT-Xây dựng hệ thống phân tích dữ liệu lớn (big data) sử dụng công nghệ dựa trên đám mây.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CNTT-Nghiên cứu và phát triển công nghệ blockchain trong quản lý dữ liệu và bảo mật.",
        description:
          "Mô tả đề tài CNTT-Nghiên cứu và phát triển công nghệ blockchain trong quản lý dữ liệu và bảo mật.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Nghiên cứu và phát triển ứng dụng học ngôn ngữ trực tuyến sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và phát triển ứng dụng học ngôn ngữ trực tuyến sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Tổ chức sự kiện giao lưu văn hóa quốc tế nhằm tăng cường hiểu biết về các nền văn hóa khác nhau.",
        description:
          "Mô tả đề tài NN-Tổ chức sự kiện giao lưu văn hóa quốc tế nhằm tăng cường hiểu biết về các nền văn hóa khác nhau.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Nghiên cứu và phát triển phần mềm dịch thuật tự động sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và phát triển phần mềm dịch thuật tự động sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Nghiên cứu và phát triển phương pháp giảng dạy tiếng Anh sử dụng công nghệ thông tin và truyền thông.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và phát triển phương pháp giảng dạy tiếng Anh sử dụng công nghệ thông tin và truyền thông.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Phân tích và ứng dụng công nghệ trí tuệ nhân tạo trong việc hỗ trợ học tiếng Anh cho người nói tiếng nước ngoài.",
        description:
          "Mô tả đề tài NN-Phân tích và ứng dụng công nghệ trí tuệ nhân tạo trong việc hỗ trợ học tiếng Anh cho người nói tiếng nước ngoài.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Đánh giá hiệu quả của các phương pháp học tiếng Anh trực tuyến.",
        description:
          "Mô tả đề tài NN-Đánh giá hiệu quả của các phương pháp học tiếng Anh trực tuyến.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Nghiên cứu và phát triển ứng dụng di động hỗ trợ việc học từ vựng tiếng Anh.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và phát triển ứng dụng di động hỗ trợ việc học từ vựng tiếng Anh.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NN-Nghiên cứu và áp dụng phương pháp học tiếng Anh dựa trên trò chơi và giả lập ảo.",
        description:
          "Mô tả đề tài NN-Nghiên cứu và áp dụng phương pháp học tiếng Anh dựa trên trò chơi và giả lập ảo.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Nghiên cứu và phát triển hệ thống quản lý khách hàng sử dụng trí tuệ nhân tạo để cải thiện trải nghiệm khách hàng.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và phát triển hệ thống quản lý khách hàng sử dụng trí tuệ nhân tạo để cải thiện trải nghiệm khách hàng.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Phân tích và đánh giá hiệu quả của chiến lược tiếp thị số trong kinh doanh.",
        description:
          "Mô tả đề tài QTKD-Phân tích và đánh giá hiệu quả của chiến lược tiếp thị số trong kinh doanh.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Nghiên cứu và phát triển hệ thống quản lý tài chính sử dụng trí tuệ nhân tạo để tối ưu chi phí và tăng hiệu suất kinh doanh.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và phát triển hệ thống quản lý tài chính sử dụng trí tuệ nhân tạo để tối ưu chi phí và tăng hiệu suất kinh doanh.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Phân tích và đánh giá hiệu quả của hệ thống kiểm soát nội bộ trong doanh nghiệp.",
        description:
          "Mô tả đề tài QTKD-Phân tích và đánh giá hiệu quả của hệ thống kiểm soát nội bộ trong doanh nghiệp.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Nghiên cứu và áp dụng các tiêu chuẩn kế toán quốc tế (IFRS) trong báo cáo tài chính.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và áp dụng các tiêu chuẩn kế toán quốc tế (IFRS) trong báo cáo tài chính.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Đánh giá và tối ưu hóa hệ thống chi phí trong quản lý tài chính.",
        description:
          "Mô tả đề tài QTKD-Đánh giá và tối ưu hóa hệ thống chi phí trong quản lý tài chính.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Nghiên cứu và triển khai công nghệ blockchain trong quản lý giao dịch tài chính.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và triển khai công nghệ blockchain trong quản lý giao dịch tài chính.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Tìm hiểu và áp dụng phần mềm kế toán doanh nghiệp ERP (Enterprise Resource Planning).",
        description:
          "Mô tả đề tài QTKD-Tìm hiểu và áp dụng phần mềm kế toán doanh nghiệp ERP (Enterprise Resource Planning).",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Thiết kế và phát triển giao diện người dùng tương tác trong ứng dụng thương mại điện tử.",
        description:
          "Mô tả đề tài QTKD-Thiết kế và phát triển giao diện người dùng tương tác trong ứng dụng thương mại điện tử.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Phân tích và tối ưu hóa quy trình logistics trong hệ thống bán hàng trực tuyến.",
        description:
          "Mô tả đề tài QTKD-Phân tích và tối ưu hóa quy trình logistics trong hệ thống bán hàng trực tuyến.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Nghiên cứu và áp dụng kỹ thuật trí tuệ nhân tạo trong cá nhân hóa trải nghiệm người dùng.",
        description:
          "Mô tả đề tài QTKD-Nghiên cứu và áp dụng kỹ thuật trí tuệ nhân tạo trong cá nhân hóa trải nghiệm người dùng.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Đánh giá và phân tích hiệu quả của chiến dịch tiếp thị trực tuyến.",
        description:
          "Mô tả đề tài QTKD-Đánh giá và phân tích hiệu quả của chiến dịch tiếp thị trực tuyến.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "QTKD-Triển khai và quản lý hệ thống thanh toán điện tử an toàn và tiện lợi.",
        description:
          "Mô tả đề tài QTKD-Triển khai và quản lý hệ thống thanh toán điện tử an toàn và tiện lợi.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "XD-Thiết kế và xây dựng các công trình xây dựng sử dụng các vật liệu tái chế để bảo vệ môi trường.",
        description:
          "Mô tả đề tài XD-Thiết kế và xây dựng các công trình xây dựng sử dụng các vật liệu tái chế để bảo vệ môi trường.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "XD-Nghiên cứu và phát triển các công nghệ xây dựng thông minh sử dụng trí tuệ nhân tạo.",
        description:
          "Mô tả đề tài XD-Nghiên cứu và phát triển các công nghệ xây dựng thông minh sử dụng trí tuệ nhân tạo.",
        statusId: "H1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "XD-Thiết kế và xây dựng các công trình xây dựng hiệu quả năng lượng để tiết kiệm chi phí vận hành.",
        description:
          "Mô tả đề tài XD-Thiết kế và xây dựng các công trình xây dựng hiệu quả năng lượng để tiết kiệm chi phí vận hành.",
        statusId: "H1",
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
