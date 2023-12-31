const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op, where } = require("sequelize");
const evaluationCriteria = require("../models/evaluationCriteria");
const userController = require("./userController");
const salt = bcrypt.genSaltSync(10);

const adminController = {
  // Register

  changePasswordAdmin: async (req, res) => {
    try {
      const hashPasswordFromBcrypt = await bcrypt.hashSync(
        req?.body?.newPassword,
        salt
      );
      const user = await db.Lecturer.findOne({
        where: {
          email: req?.body?.email,
        },
      });
      if (user) {
        const comparePasswordFromBcrypt = await bcrypt.compareSync(
          req.body.oldPassword,
          user.password
        );
        if (comparePasswordFromBcrypt) {
          const changePassword = await db.Lecturer.update(
            { password: hashPasswordFromBcrypt },
            {
              where: {
                email: req?.body?.email,
              },
            }
          );
          if (changePassword) {
         // console.log("changePassword", changePassword);
            return res.status(200).json({
              errCode: 0,
              errMessage: "Mật khẩu đã được thay đổi.",
            });
          } else {
            return res.status(400).json({
              errCode: 3,
              errMessage: "Vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(400).json({
            errCode: 2,
            errMessage: "Mật khẩu cũ không đúng!",
          });
        }
      } else {
        return res
          .status(400)
          .json({ errCode: 1, errMessage: "Người dùng không hợp lệ." });
      }
    } catch (error) {
   // console.log(error);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  changeInformationAdmin: async (req, res) => {
    try {
      const user = await db.Lecturer.findOne({
        where: {
          email: req?.body?.email,
        },
      });
      if (user) {
        const changeInformation = await db.Lecturer.update(
          {
            fullName: req?.body?.fullName,
            numberPhone: req?.body?.numberPhone,
            birthday: req?.body?.birthday,
            address: req?.body?.address,
            genderId: req?.body?.genderId,
            image: req?.body?.image,
          },
          {
            where: {
              email: req?.body?.email,
            },
          }
        );
        if (changeInformation) {
       // console.log("changeInformation", changeInformation);
          return res.status(200).json({
            errCode: 0,
            errMessage: "Thông tin đã được thay đổi.",
          });
        } else {
          return res.status(200).json({
            errCode: 3,
            errMessage: "Vui lòng thử lại sau!",
          });
        }
      } else {
        return res
          .status(200)
          .json({ errCode: 1, errMessage: "Người dùng không hợp lệ." });
      }
    } catch (error) {
   // console.log(error);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getInformationAdmin: async (req, res) => {
    try {
      let userData = {};
      //   findOne
      let information = await db.Lecturer.findOne({
        where: { email: req.body.email },
        include: [
          //     genderId: DataTypes.STRING,
          // roleId: DataTypes.STRING,
          // statusId: DataTypes.STRING,
          // departmentId: DataTypes.INTEGER,
          {
            model: db.Allcode,
            as: "genderData",
          },
          {
            model: db.Allcode,
            as: "roleData",
          },
          {
            model: db.Allcode,
            as: "statusData",
          },
          {
            model: db.Department,
            as: "departmentData",
          },
        ],
        raw: true,
        nest: true,
      });
      if (information) {
        delete information.password;
        delete information.refreshToken;
        return res.status(200).json({
          errCode: 0,
          errMessage: "Truy xuất thông tin thành công.",
          information,
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: `Email của bạn không tồn tại trong hệ thống. Vui lòng thử đăng nhập lại!`,
        });
      }
    } catch (error) {
   // console.log("error", error);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  changePasswordStudent: async (req, res) => {
    try {
      const hashPasswordFromBcrypt = await bcrypt.hashSync(
        req?.body?.newPassword,
        salt
      );
      const user = await db.Student.findOne({
        where: {
          email: req?.body?.email,
        },
      });
      if (user) {
        const comparePasswordFromBcrypt = await bcrypt.compareSync(
          req.body.oldPassword,
          user.password
        );
        if (comparePasswordFromBcrypt) {
          const changePassword = await db.Lecturer.update(
            { password: hashPasswordFromBcrypt },
            {
              where: {
                email: req?.body?.email,
              },
            }
          );
          if (changePassword) {
         // console.log("changePassword", changePassword);
            return res.status(200).json({
              errCode: 0,
              errMessage: "Mật khẩu đã được thay đổi!",
            });
          } else {
            return res.status(400).json({
              errCode: 3,
              errMessage: "Vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(400).json({
            errCode: 2,
            errMessage: "Mật khẩu cũ không đúng!",
          });
        }
      } else {
        return res
          .status(400)
          .json({ errCode: 1, errMessage: "Người dùng không hợp lệ." });
      }
    } catch (error) {
   // console.log(error);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  changeInformationStudent: async (req, res) => {
    try {
      const user = await db.Lecturer.findOne({
        where: {
          email: req?.body?.email,
        },
      });
      if (user) {
        const changeInformation = await db.Student.update(
          {
            fullName: req?.body?.fullName,
            numberPhone: req?.body?.numberPhone,
            birthday: req?.body?.birthday,
            address: req?.body?.address,
            genderId: req?.body?.genderId,
            image: req?.body?.image,
          },
          {
            where: {
              email: req?.body?.email,
            },
          }
        );
        if (changeInformation) {
       // console.log("changeInformation", changeInformation);
          return res.status(200).json({
            errCode: 0,
            errMessage: "Thông tin đã được thay đổi.",
          });
        } else {
          return res.status(200).json({
            errCode: 3,
            errMessage: "Vui lòng thử lại sau!",
          });
        }
      } else {
        return res
          .status(200)
          .json({ errCode: 1, errMessage: "Người dùng không hợp lệ." });
      }
    } catch (error) {
   // console.log(error);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getInformationStudent: async (req, res) => {
    try {
      let userData = {};
      //   findOne
      let information = await db.Student.findOne({
        where: { email: req.body.email },
        include: [
          //     genderId: DataTypes.STRING,
          // roleId: DataTypes.STRING,
          // statusId: DataTypes.STRING,
          // departmentId: DataTypes.INTEGER,
          {
            model: db.Allcode,
            as: "genderData",
          },
          {
            model: db.Allcode,
            as: "roleData",
          },
          {
            model: db.Allcode,
            as: "statusData",
          },
          {
            model: db.Class,
            as: "classData",
          },
        ],
        raw: true,
        nest: true,
      });
   // console.log("information", information);
      if (information) {
        delete information.password;
        delete information.refreshToken;
        return res.status(200).json({
          errCode: 0,
          errMessage: "Truy xuất thông tin thành công.",
          information,
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: `Email của bạn không tồn tại trong hệ thống. Vui lòng thử đăng nhập lại!`,
        });
      }
    } catch (error) {
   // console.log("error", error);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getAllcode: async (req, res) => {
    try {
      //   findOne
      let code = await db.Allcode.findAll({
        where: { type: req.body.type },
      });
      if (code) {
        return res.status(200).json({
          errCode: 0,
          errMessage: "Truy xuất thông tin thành công.",
          code,
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: `Mã không hợp lệ hoặc không được tìm thấy. Vui lòng thử lại.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Council
  getCouncils: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause này", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.ThesisSession,
            as: "thesisSessionData",
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Council.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: councils, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, councils, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getCouncilById: async (req, res) => {
    try {
      const result = await db.Council.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.ThesisSession,
            as: "thesisSessionData",
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addCouncil: async (req, res) => {
    try {
      if (req?.body) {
        let result = await db.Council.create({
          name: req?.body?.name,
          description: req?.body?.description,
          statusId: req?.body?.statusId,
          thesisSessionId: req?.body?.thesisSessionId,
        });
        if (result) {
          let councilDetails = [];
          req?.body?.councilDetails.map((criteria) => {
            councilDetails.push({
              councilId: result?.dataValues?.id,
              ...criteria,
            });
          });
          req?.body?.thesesDetails.map(async (thesis) => {
            await db.Thesis.update(
              {
                councilId: result?.dataValues?.id,
              },
              { where: { id: thesis.id } }
            );
          });
       // console.log("councilDetails", councilDetails);
          result = null;
          result = await db.CouncilDetail.bulkCreate(councilDetails);
          if (result) {
            return res
              .status(200)
              .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateCouncil: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        let result = await db.Council.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
            statusId: req?.body?.statusId,
            thesisSessionId: req?.body?.thesisSessionId,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          let councilDetails = [];
          req?.body?.councilDetails.map((position) => {
            councilDetails.push({
              councilId: req?.params?.id,
              ...position,
            });
          });
          let countThesisDuplicate = 0;
          req?.body?.thesesDetails.map(async (thesis) => {
         // console.log(thesis);
            let update = await db.Thesis.update(
              {
                councilId: req?.params?.id,
              },
              {
                where: {
                  [Op.and]: {
                    id: thesis.thesisId,
                    councilId: { [Op.is]: null },
                  },
                },
              }
            );
            update ? (countThesisDuplicate += 1) : "";
          });
          result = null;
          let ids = councilDetails?.map((position) => position.id);
          let resultDelete = await db.CouncilDetail.findAll({
            where: {
              id: {
                [Op.notIn]: ids,
              },
              councilId: req?.params?.id,
            },
          });
          ids = resultDelete?.map((position) => position.id);
          result = await db.CouncilDetail.destroy({
            where: { id: ids },
          });

       // console.log("resultDelete", result, ids);

          result = await db.CouncilDetail.bulkCreate(councilDetails, {
            upsertKeys: ["id"],
            updateOnDuplicate: ["positionId", "councilId", "lecturerId"],
          });
       // console.log("result", result);

          if (result) {
            if (countThesisDuplicate) {
              return res.status(200).json({
                errCode: 0,
                errMessage: `Cập nhật dữ liệu thành công. Có ${countThesisDuplicate} đồ án đã thuộc hội đồng khác.`,
              });
            }

            return res
              .status(200)
              .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteCouncil: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Council.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importCouncils: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Council.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteCouncilDetail: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.CouncilDetail.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Council Detail
  getCouncilDetailByIdCouncil: async (req, res) => {
    try {
      const result = await db.CouncilDetail.findAll({
        where: {
          councilId: req?.params?.id,
        },
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["positionId", "ASC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Department
  getDepartments: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Lecturer,
            as: "deanData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Department.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: departments, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, departments, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getDepartmentById: async (req, res) => {
    try {
      const result = await db.Department.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.Lecturer,
            as: "deanData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addDepartment: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.Department.create({
          name: req?.body?.name,
          description: req?.body?.description,
          founding: req?.body?.founding,
          deanId: req?.body?.deanId,
        });
        if (result) {
          let resultDean = null;
          if (req?.body?.deanId) {
            resultDean = await db.Lecturer.update(
              {
                roleId: "R2",
                departmentId: result?.dataValues.id,
              },
              {
                where: {
                  ["id"]:
                    req?.body?.deanId,
                  [Op.ne]: {
                    ["roleId"]: "R1",
                  },
                },
              }
            );
          }
          if (resultDean) {
            return res.status(200).json({
              errCode: 0,
              errMessage:
                "Cập nhật dữ liệu thành công, vai trò người dùng đã thay đổi.",
            });
          } else {
            return res.status(200).json({
              errCode: 0,
              errMessage: "Cập nhật dữ liệu thành công.",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateDepartment: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Department.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
            founding: req?.body?.founding,
            deanId: req?.body?.deanId,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          const resultDean = await db.Lecturer.update(
            {
              roleId: req?.body?.deanId ? "R2" : "R3",
              departmentId: req?.params?.id
            },
            {
              where: {
                ["id"]: req?.body?.deanId,
                [Op.ne]: {
                  ["roleId"]: "R1",
                },
              },
            }
          );
          if (resultDean) {
            return res.status(200).json({
              errCode: 0,
              errMessage:
                "Cập nhật dữ liệu thành công, vai trò người dùng đã thay đổi.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
            });
          }
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteDepartment: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Department.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importDepartments: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Department.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Block
  getBlocks: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["name", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Block.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: blocks, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, blocks, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getBlockById: async (req, res) => {
    try {
      const result = await db.Block.findOne({
        where: {
          id: req?.params?.id,
        },
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["name", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addBlock: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.Block.create({
          name: req?.body?.name,
          description: req?.body?.description,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateBlock: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Block.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteBlock: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Block.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importBlocks: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Block.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Major
  getMajors: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Department,
            as: "departmentData",
          },
        ],
        order: [["departmentId", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Major.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: majors, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, majors, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getMajorById: async (req, res) => {
    try {
      const result = await db.Major.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.Department,
            as: "departmentData",
          },
        ],
        order: [["departmentId", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addMajor: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.Major.create({
          name: req?.body?.name,
          description: req?.body?.description,
          departmentId: req?.body?.departmentId,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateMajor: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Major.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
            departmentId: req?.body?.departmentId,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteMajor: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Major.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importMajors: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Major.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Class
  getClasses: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Block,
            as: "blockData",
          },
          {
            model: db.Major,
            as: "majorData",
          },
        ],
        order: [["blockId", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Class.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: classes, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, classes, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getClassById: async (req, res) => {
    try {
      const result = await db.Class.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.Block,
            as: "blockData",
          },
          {
            model: db.Major,
            as: "majorData",
          },
        ],
        order: [["blockId", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addClass: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.Class.create({
          name: req?.body?.name,
          description: req?.body?.description,
          majorId: req?.body?.majorId,
          blockId: req?.body?.blockId,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateClass: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Class.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
            majorId: req?.body?.majorId,
            blockId: req?.body?.blockId,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteClass: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Class.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importClasses: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Class.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api EvaluationMethod
  getEvaluationMethods: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.EvaluationMethod.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: evaluationMethods, count: totalRecords } = result;
      return res
        .status(200)
        .json({ errCode: 0, evaluationMethods, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getEvaluationMethodById: async (req, res) => {
    try {
      const result = await db.EvaluationMethod.findOne({
        where: {
          id: req?.params?.id,
        },
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addEvaluationMethod: async (req, res) => {
    try {
      if (req?.body) {
        let result = await db.EvaluationMethod.create({
          name: req?.body?.name,
          description: req?.body?.description,
        });
        if (result) {
          let criterias = [];
          req?.body?.criterias.map((criteria) => {
            criterias.push({
              evaluationMethodId: result?.dataValues?.id,
              ...criteria,
            });
          });
       // console.log("criterias", criterias);
          result = null;
          result = await db.EvaluationCriteria.bulkCreate(criterias);
          if (result) {
            return res
              .status(200)
              .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateEvaluationMethod: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        let result = await db.EvaluationMethod.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          let criterias = [];
          req?.body?.criterias.map((criteria) => {
            criterias.push({
              evaluationMethodId: req?.params?.id,
              ...criteria,
            });
          });
          result = null;
          let ids = criterias?.map((criteria) => criteria.id);
          let resultDelete = await db.EvaluationCriteria.findAll({
            where: {
              id: {
                [Op.notIn]: ids,
              },
              evaluationMethodId: req?.params?.id,
            },
          });
          ids = resultDelete?.map((criteria) => criteria.id);
          result = await db.EvaluationCriteria.destroy({
            where: { id: ids },
          });

       // console.log("resultDelete", result, ids);

          result = await db.EvaluationCriteria.bulkCreate(criterias, {
            upsertKeys: ["id"],
            updateOnDuplicate: [
              "name",
              "evaluationMethodId",
              "weight",
              "level",
              "order",
            ],
          });
       // console.log("result", result);

          if (result) {
            return res
              .status(200)
              .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteEvaluationMethod: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.EvaluationMethod.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importEvaluationMethods: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.EvaluationMethod.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api EvaluationCriteria
  getEvaluationCriterias: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["order", "ASC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.EvaluationCriteria.findAndCountAll(queryOptions);
   // console.log(result);
      const { rows: evaluationCriterias, count: totalRecords } = result;
      return res
        .status(200)
        .json({ errCode: 0, evaluationCriterias, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getEvaluationCriteriaByIdMethod: async (req, res) => {
    try {
      const result = await db.EvaluationCriteria.findAll({
        where: {
          evaluationMethodId: req?.params?.id,
        },
        // include: [
        //   {
        //     model: db.Lecturer,
        //     as: "deanData",
        //     // attributes: ["name"],
        //   },
        // ],
        order: [["order", "ASC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addEvaluationCriteria: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.EvaluationCriteria.create({
          name: req?.body?.name,
          description: req?.body?.description,
        });
        if (result) {
       // console.log("result", result);
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateEvaluationCriteria: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.EvaluationCriteria.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteEvaluationCriteria: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.EvaluationCriteria.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importEvaluationCriterias: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.EvaluationMethod.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Lecturer
  getLecturers: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        attributes: { exclude: ["password", "refreshToken", "image"] },
        include: [
          {
            model: db.Department,
            as: "departmentData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "roleData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Lecturer.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: lecturers, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, lecturers, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getLecturerById: async (req, res) => {
    try {
      const result = await db.Lecturer.findOne({
        where: {
          id: req?.params?.id,
        },
        attributes: { exclude: ["password", "refreshToken", "image"] },
        include: [
          {
            model: db.Department,
            as: "departmentData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "roleData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addLecturer: async (req, res) => {
    try {
      const hashPasswordFromBcrypt = await bcrypt.hashSync(
        req?.body?.code,
        salt
      );
      if (req?.body) {
     // console.log("req.body", req.body);
        if (req?.body?.departmentId && req?.body?.roleId == "R2") {
          await db.Lecturer.update(
            {
              roleId: "R3",
            },
            {
              where: {
                departmentId: req?.body.departmentId,
              },
            }
          );
        }
        const result = await db.Lecturer.create({
          email: req?.body?.email,
          fullName: req?.body?.fullName,
          password: hashPasswordFromBcrypt,
          numberPhone: req?.body?.numberPhone,
          address: req?.body?.address,
          birthday: req?.body?.birthday,
          genderId: req?.body?.genderId,
          code: req?.body?.code,
          roleId: req?.body?.roleId,
          departmentId: req?.body?.departmentId,
          statusId: req?.body?.statusId,
          permissions: req?.body?.permissions,
        });

        if (result) {
       // console.log("result", result);
          if (req?.body?.departmentId && req?.body?.roleId == "R2") {
            const resultDean = await db.Department.update(
              {
                deanId: result?.dataValues?.id,
              },
              { where: { id: result?.dataValues?.departmentId } }
            );
            if (resultDean) {
           // console.log("resultDean", resultDean);
              return res.status(200).json({
                errCode: 0,
                errMessage:
                  "Thêm dữ liệu thành công, trưởng khoa đã được thay đổi",
              });
            } else {
              return res.status(200).json({
                errCode: 2,
                errMessage:
                  "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
              });
            }
          }
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateLecturer: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log("req.body", req.body);
        if (req?.body?.departmentId && req?.body?.roleId == "R2") {
          await db.Lecturer.update(
            {
              roleId: "R3",
            },
            {
              where: {
                id: { [Op.ne]: req?.params?.id },
                departmentId: req?.body.departmentId,
              },
            }
          );
        }
        const result = await db.Lecturer.update(
          {
            email: req?.body?.email,
            fullName: req?.body?.fullName,
            numberPhone: req?.body?.numberPhone,
            address: req?.body?.address,
            birthday: req?.body?.birthday,
            genderId: req?.body?.genderId,
            code: req?.body?.code,
            roleId: req?.body?.roleId,
            departmentId: req?.body?.departmentId,
            statusId: req?.body?.statusId,
            permissions: req?.body?.permissions,
          },
          {
            where: {
              id: req?.params.id,
            },
          }
        );

        if (result) {
       // console.log("result", result);
          if (req?.body?.departmentId && req?.body?.roleId == "R2") {
            const resultDean = await db.Department.update(
              {
                deanId: req?.params.id,
              },
              { where: { id: req?.body?.departmentId } }
            );
            if (resultDean) {
           // console.log("resultDean", resultDean);
              return res.status(200).json({
                errCode: 0,
                errMessage:
                  "Thêm dữ liệu thành công, trưởng khoa đã được thay đổi",
              });
            } else {
              return res.status(200).json({
                errCode: 2,
                errMessage:
                  "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
              });
            }
          }
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteLecturer: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Lecturer.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importLecturers: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Lecturer.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Student
  getStudents: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        attributes: { exclude: ["password", "refreshToken", "image"] },
        include: [
          {
            model: db.Class,
            as: "classData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "roleData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Student.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: students, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, students, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getStudentById: async (req, res) => {
    try {
      const result = await db.Student.findOne({
        where: {
          id: req?.params?.id,
        },
        attributes: { exclude: ["password", "refreshToken", "image"] },
        include: [
          {
            model: db.Class,
            as: "classData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "roleData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addStudent: async (req, res) => {
    try {
      if (req?.body) {
        const hashPasswordFromBcrypt = await bcrypt.hashSync(
          req?.body?.code,
          salt
        );
     // console.log("req.body", req.body);
        const result = await db.Student.create({
          email: req?.body?.email,
          fullName: req?.body?.fullName,
          password: hashPasswordFromBcrypt,
          numberPhone: req?.body?.numberPhone,
          address: req?.body?.address,
          birthday: req?.body?.birthday,
          genderId: req?.body?.genderId,
          code: req?.body?.code,
          roleId: "R4",
          classId: req?.body?.classId,
          statusId: req?.body?.statusId,
          permissions: req?.body?.permissions ? req?.body?.permissions : null,
        });
        if (result) {
       // console.log("result", result);
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateStudent: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log("req.body", req.body);
        const result = await db.Student.update(
          {
            email: req?.body?.email,
            fullName: req?.body?.fullName,
            numberPhone: req?.body?.numberPhone,
            address: req?.body?.address,
            birthday: req?.body?.birthday,
            genderId: req?.body?.genderId,
            code: req?.body?.code,
            roleId: "R4",
            classId: req?.body?.classId,
            statusId: req?.body?.statusId,
            permissions: req?.body?.permissions,
          },
          {
            where: {
              id: req?.params.id,
            },
          }
        );

        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  resetPasswordStudent: async (req, res) => {
    try {
      if (req?.params?.id) {
        const hashPasswordFromBcrypt = await bcrypt.hashSync(
          req?.body?.code,
          salt
        );
     // console.log("req.body", req.body);
        const result = await db.Student.update(
          {
            password: hashPasswordFromBcrypt,
          },
          {
            where: {
              id: req?.params.id,
            },
          }
        );

        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Khôi phục mật khẩu thành công" });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình khôi phục, vui lòng thử lại sau",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  resetPasswordLecturer: async (req, res) => {
    try {
      if (req?.params?.id) {
        const hashPasswordFromBcrypt = await bcrypt.hashSync(
          req?.body?.code,
          salt
        );
     // console.log("req.body", req.body);
        const result = await db.Lecturer.update(
          {
            password: hashPasswordFromBcrypt,
          },
          {
            where: {
              id: req?.params.id,
            },
          }
        );

        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Khôi phục mật khẩu thành công" });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình khôi phục, vui lòng thử lại sau",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteStudent: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Student.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importStudents: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Student.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Topic
  getTopics: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.Department,
            as: "departmentData",
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Topic.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: topics, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, topics, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getTopicById: async (req, res) => {
    try {
      const result = await db.Topic.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.Allcode,
            as: "statusData",
            // attributes: ["name"],
          },
          {
            model: db.Department,
            as: "departmentData",
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addTopic: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.Topic.create({
          name: req?.body?.name,
          description: req?.body?.description,
          statusId: req?.body?.statusId,
          departmentId: req?.body?.departmentId,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateTopic: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Topic.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
            statusId: req?.body?.statusId,
            departmentId: req?.body?.departmentId,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteTopic: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Topic.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importTopics: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Topic.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api ThesisSession
  getThesisSessions: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

      const queryOptions = {
        include: [
          {
            model: db.EvaluationMethod,
            as: "evaluationMethodData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

   // console.log("where", whereClause, Object.keys(whereClause).length > 0);
      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.ThesisSession.findAndCountAll(queryOptions);
   // console.log(result);
      const { rows: thesisSessions, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, thesisSessions, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getThesisSessionById: async (req, res) => {
    try {
      const result = await db.ThesisSession.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.EvaluationMethod,
            as: "evaluationMethodData",
            // attributes: ["name"],
          },
        ],
        order: [["evaluationMethodId", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  addThesisSession: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.ThesisSession.create({
          name: req?.body?.name,
          description: req?.body?.description,
          evaluationMethodId: req?.body?.evaluationMethodId,
          startDate: req?.body?.startDate,
          endDate: req?.body?.endDate,
          validPoint: req?.body?.validPoint,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateThesisSession: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.ThesisSession.update(
          {
            name: req?.body?.name,
            description: req?.body?.description,
            evaluationMethodId: req?.body?.evaluationMethodId,
            startDate: req?.body?.startDate,
            endDate: req?.body?.endDate,
            validPoint: req?.body?.validPoint,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteThesisSession: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.ThesisSession.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importThesisSessions: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.ThesisSession.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Thesis
  getTheses: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

   // console.log("whereClause", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Allcode,
            as: "councilStatusData",
          },
          {
            model: db.Allcode,
            as: "resultData",
          },
          {
            model: db.Allcode,
            as: "thesisAdvisorStatusData",
          },
          {
            model: db.Topic,
            as: "topicData",
          },
          {
            model: db.Student,
            as: "studentData",
          },
          {
            model: db.Council,
            as: "councilData",
          },
          {
            model: db.Lecturer,
            as: "thesisAdvisorData",
          },
          {
            model: db.ThesisSession,
            as: "thesisSessionData",
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
        };
      }

      const result = await db.Thesis.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: theses, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, theses, totalRecords });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getThesisById: async (req, res) => {
    try {
      const result = await db.Thesis.findOne({
        where: {
          id: req?.params?.id,
        },
        include: [
          {
            model: db.Allcode,
            as: "councilStatusData",
          },
          {
            model: db.Allcode,
            as: "resultData",
          },
          {
            model: db.Allcode,
            as: "thesisAdvisorStatusData",
          },
          {
            model: db.Topic,
            as: "topicData",
          },
          {
            model: db.Student,
            as: "studentData",
          },
          {
            model: db.Council,
            as: "councilData",
          },
          {
            model: db.Lecturer,
            as: "thesisAdvisorData",
          },
          {
            model: db.ThesisSession,
            as: "thesisSessionData",
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res
          .status(200)
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công.", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  // id,
  // startDate,
  // complateDate,
  // thesisStartDate,
  // thesisEndDate,
  // reportFile,
  // totalScore,
  // resultId,
  // topicId,
  // studentId,
  // thesisAdvisorId,
  // thesisAdvisorStatusId,
  // thesisSessionId,
  // councilId,
  // councilStatusId,
  // createdAt,
  // updatedAt,
  addThesis: async (req, res) => {
    try {
      if (req?.body) {
        const result = await db.Thesis.create({
          startDate: req?.body?.startDate,
          complateDate: req?.body?.complateDate,
          thesisStartDate: req?.body?.thesisStartDate,
          thesisEndDate: req?.body?.thesisEndDate,
          reportFile: req?.body?.reportFile,
          totalScore: req?.body?.totalScore,
          resultId: req?.body?.totalScore
            ? req?.body?.totalScore > 4
              ? "RS1"
              : "RS0"
            : req?.body?.resultId,
          topicId: req?.body?.topicId,
          studentId: req?.body?.studentId,
          thesisAdvisorId: req?.body?.thesisAdvisorId,
          thesisAdvisorStatusId: req?.body?.thesisAdvisorStatusId,
          thesisSessionId: req?.body?.thesisSessionId,
          councilId: req?.body?.councilId,
          councilStatusId: req?.body?.councilStatusId,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  updateThesis: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Thesis.update(
          {
            startDate: req?.body?.startDate,
            complateDate: req?.body?.complateDate,
            thesisStartDate: req?.body?.thesisStartDate,
            thesisEndDate: req?.body?.thesisEndDate,
            reportFile: req?.body?.reportFile,
            totalScore: req?.body?.totalScore,
            resultId: req?.body?.totalScore
              ? req?.body?.totalScore >= 4
                ? "RS1"
                : "RS0"
              : null,
            topicId: req?.body?.topicId,
            studentId: req?.body?.studentId,
            thesisAdvisorId: req?.body?.thesisAdvisorId,
            thesisAdvisorStatusId: req?.body?.thesisAdvisorStatusId,
            thesisSessionId: req?.body?.thesisSessionId,
            councilId: req?.body?.councilId,
            councilStatusId: req?.body?.councilStatusId,
          },
          { where: { id: req?.params?.id } }
        );
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  deleteThesis: async (req, res) => {
    try {
      if (req?.params?.id) {
     // console.log(req.body);
        const result = await db.Thesis.destroy({
          where: { id: req?.params?.id },
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Xóa dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  importTheses: async (req, res) => {
    try {
      if (req?.body?.data) {
     // console.log(req?.body?.data);
        const result = await db.Thesis.bulkCreate(req?.body?.data);
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Import dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy!" });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
};
module.exports = adminController;
