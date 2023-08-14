"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Lecturers", [
      {
        email: "admin@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "admin",
        fullName: "Quản trị viên",
        numberPhone: "0900000001",
        birthday: "01/01/1983",
        address: "Địa chỉ của Quản trị viên",
        genderId: "M",
        statusId: "S1",
        roleId: "R1",
      },
      {
        email: "thuky@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "thuky",
        fullName: "Thư ký",
        numberPhone: "0900000002",
        birthday: "01/02/1983",
        address: "Địa chỉ của Thư ký",
        genderId: "M",
        statusId: "S1",
        roleId: "R2",
      },
      {
        email: "gv00001@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00001",
        fullName: "Nguyễn Thiên Nam",
        numberPhone: "0900000003",
        birthday: "01/01/1983",
        address: "Địa chỉ của Nguyễn Thiên Nam",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00002@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00002",
        fullName: "Phan Trần Bảo Tuấn",
        numberPhone: "0900000004",
        birthday: "01/01/1983",
        address: "Địa chỉ của Phan Trần Bảo Tuấn",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00003@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00003",
        fullName: "Trần Duy Bảo",
        numberPhone: "0900000005",
        birthday: "01/01/1983",
        address: "Địa chỉ của Trần Duy Bảo",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00004@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00004",
        fullName: "Nguyễn Minh Hội",
        numberPhone: "0900000006",
        birthday: "01/01/1983",
        address: "Địa chỉ của Nguyễn Minh Hội",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00005@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00005",
        fullName: "Bùi Trần Thiên Hoan",
        numberPhone: "0900000007",
        birthday: "01/01/1983",
        address: "Địa chỉ của Bùi Trần Thiên Hoan",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00006@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00006",
        fullName: "Huỳnh Lê Khang",
        numberPhone: "0900000008",
        birthday: "01/01/1983",
        address: "Địa chỉ của Huỳnh Lê Khang",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00007@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00007",
        fullName: "Phan Minh Anh Khoa",
        numberPhone: "0900000009",
        birthday: "01/01/1983",
        address: "Địa chỉ của Phan Minh Anh Khoa",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00008@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00008",
        fullName: "Điệp Văn Lâm",
        numberPhone: "09000000010",
        birthday: "01/01/1983",
        address: "Địa chỉ của Điệp Văn Lâm",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00009@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00009",
        fullName: "Hồ Ngọc Linh",
        numberPhone: "09000000011",
        birthday: "01/01/1983",
        address: "Địa chỉ của Hồ Ngọc Linh",
        genderId: "F",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00010@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00010",
        fullName: "Đặng Hải Long",
        numberPhone: "0900000012",
        birthday: "01/01/1983",
        address: "Địa chỉ của Đặng Hải Long",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00011@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00011",
        fullName: "Hoàng Cao Lộc",
        numberPhone: "0900000013",
        birthday: "01/01/1983",
        address: "Địa chỉ của Hoàng Cao Lộc",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00012@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00012",
        fullName: "Phan Bảo Luân",
        numberPhone: "0900000014",
        birthday: "01/01/1983",
        address: "Địa chỉ của Phan Bảo Luân",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00013@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00013",
        fullName: "Trần Văn Nam",
        numberPhone: "0900000015",
        birthday: "01/01/1983",
        address: "Địa chỉ của Trần Văn Nam",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00014@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00014",
        fullName: "Nguyễn Thị Kim Nga",
        numberPhone: "0900000016",
        birthday: "01/01/1983",
        address: "Địa chỉ của Nguyễn Thị Kim Nga",
        genderId: "F",
        statusId: "S1",
        roleId: "R3",
      },
      {
        email: "gv00015@e.tlu.edu.vn",
        password:
          "$2a$10$Us9Y1AnSyNrlj46qV6Bt4eL9bTgU7GFEAErub8jIVOGdU8t34dAG2",
        code: "GV00015",
        fullName: "Bùi Phát",
        numberPhone: "0900000017",
        birthday: "01/01/1983",
        address: "Địa chỉ của Bùi Phát",
        genderId: "M",
        statusId: "S1",
        roleId: "R3",
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