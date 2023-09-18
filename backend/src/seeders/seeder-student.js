"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Students", [
      {
        email: "1951060000@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060000",
        fullName: "Đinh Việt Anh",
        numberPhone: "0900000001",
        birthday: "01/01/1996",
        address: "Địa chỉ của Đinh Việt Anh",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060001@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060001",
        fullName: "Vi Thị Mai Anh",
        numberPhone: "0900000002",
        birthday: "01/01/1996",
        address: "Địa chỉ của Vi Thị Mai Anh",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060002@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060002",
        fullName: "Lê Thị Ngọc ánh",
        numberPhone: "0900000003",
        birthday: "01/01/1996",
        address: "Địa chỉ của Lê Thị Ngọc ánh",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060003@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060003",
        fullName: "Nguyễn Duy Cảnh",
        numberPhone: "0900000004",
        birthday: "01/01/1996",
        address: "Địa chỉ của Nguyễn Duy Cảnh",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060004@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060004",
        fullName: "Hùng Huy Diệp",
        numberPhone: "0900000005",
        birthday: "01/01/1996",
        address: "Địa chỉ của Hùng Huy Diệp",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060005@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060005",
        fullName: "Hoàng Chí Dũng",
        numberPhone: "0900000006",
        birthday: "01/01/1996",
        address: "Địa chỉ của Hoàng Chí Dũng",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060006@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060006",
        fullName: "Nguyễn Hữu Đại",
        numberPhone: "0900000007",
        birthday: "01/01/1996",
        address: "Địa chỉ của Nguyễn Hữu Đại",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060007@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060007",
        fullName: "Lê Hải Đăng",
        numberPhone: "0900000008",
        birthday: "01/01/1996",
        address: "Địa chỉ của Lê Hải Đăng",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060008@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060008",
        fullName: "Bùi Văn Giang",
        numberPhone: "0900000009",
        birthday: "01/01/1996",
        address: "Địa chỉ của Bùi Văn Giang",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060009@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060009",
        fullName: "Nguyễn Thị Hải",
        numberPhone: "0900000010",
        birthday: "01/01/1996",
        address: "Địa chỉ của Nguyễn Thị Hải",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060010@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060010",
        fullName: "Hoàng Thị Hiền",
        numberPhone: "0900000011",
        birthday: "01/01/1996",
        address: "Địa chỉ của Hoàng Thị Hiền",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060011@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060011",
        fullName: "Tạ Văn Hòa",
        numberPhone: "0900000012",
        birthday: "01/01/1996",
        address: "Địa chỉ của Tạ Văn Hòa",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060012@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060012",
        fullName: "Nguyễn Thị Hồng",
        numberPhone: "0900000013",
        birthday: "01/01/1996",
        address: "Địa chỉ của Nguyễn Thị Hồng",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060013@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060013",
        fullName: "Vũ Thị Hồng",
        numberPhone: "0900000014",
        birthday: "01/01/1996",
        address: "Địa chỉ của Vũ Thị Hồng",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060014@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060014",
        fullName: "Hoàng Mạnh Hùng",
        numberPhone: "0900000015",
        birthday: "01/01/1996",
        address: "Địa chỉ của Hoàng Mạnh Hùng",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060015@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060015",
        fullName: "Trần Quốc Huy",
        numberPhone: "0900000016",
        birthday: "01/01/1996",
        address: "Địa chỉ của Trần Quốc Huy",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060016@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060016",
        fullName: "Đặng Thị Huyền",
        numberPhone: "0900000017",
        birthday: "01/01/1996",
        address: "Địa chỉ của Đặng Thị Huyền",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060017@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060017",
        fullName: "Đỗ Minh Khánh",
        numberPhone: "0900000018",
        birthday: "01/01/1996",
        address: "Địa chỉ của Đỗ Minh Khánh",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060018@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060018",
        fullName: "Trần Thị Tuyết Linh",
        numberPhone: "0900000019",
        birthday: "01/01/1996",
        address: "Địa chỉ của Trần Thị Tuyết Linh",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060019@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060019",
        fullName: "Phạm Thị Lương",
        numberPhone: "0900000020",
        birthday: "01/01/1996",
        address: "Địa chỉ của Phạm Thị Lương",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060020@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060020",
        fullName: "Nguyễn Hoài",
        numberPhone: "0900000021",
        birthday: "01/01/1996",
        address: "Địa chỉ của Nguyễn Hoài 1",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060021@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060021",
        fullName: "Đào Hằng Nga",
        numberPhone: "0900000022",
        birthday: "01/01/1996",
        address: "Địa chỉ của Đào Hằng Nga",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060022@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060022",
        fullName: "Đinh Thị Lê Nga",
        numberPhone: "0900000023",
        birthday: "01/01/1996",
        address: "Địa chỉ của Đinh Thị Lê Nga",
        genderId: "F",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060023@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060023",
        fullName: "Ưng Sỹ Ngà",
        numberPhone: "0900000024",
        birthday: "01/01/1996",
        address: "Địa chỉ của Ưng Sỹ Ngà",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "1951060024@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "1951060024",
        fullName: "Nguyễn Văn Nhân",
        numberPhone: "0900000025",
        birthday: "01/01/1996",
        address: "Địa chỉ của Nguyễn Văn Nhân",
        genderId: "M",
        statusId: "S1",
        roleId: "R4",
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
