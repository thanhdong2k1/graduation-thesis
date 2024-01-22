const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op, where } = require("sequelize");
const evaluationCriteria = require("../models/evaluationCriteria");
const userController = require("./userController");
const salt = bcrypt.genSaltSync(10);

const lecturerController = {
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
          .json({ errCode: 1, errMessage: "Người dùng không hợp lệ!" });
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
          .json({ errCode: 1, errMessage: "Người dùng không hợp lệ!" });
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
          errMessage: `Mã không hợp lệ hoặc không được tìm thấy. Vui lòng thử lại!`,
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
      let whereClause = userController.whereClause(req?.body);

      whereClause = {
        [Op.or]: whereClause,
      };
      whereClause["lecturerId"] = req?.user?.id;

      // console.log("whereClause", whereClause);

      const queryOptions = {
        include: [
          {
            model: db.Council,
            as: "councilData",
            // attributes: ["name"],
            include: [
              {
                model: db.Allcode,
                as: "statusData",
                // attributes: ["name"],
              },
            ],
          },
          {
            model: db.Lecturer,
            as: "lecturerData",
          },
          {
            model: db.Allcode,
            as: "positionData",
          },
          // {
          //   model: db.CouncilDetail,
          //   as: 'councilData',
          //   require: true,
          //   where: { lecturerId: req?.user?.id }
          // },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.and]: whereClause,
        };
      }

      const result = await db.CouncilDetail.findAndCountAll(queryOptions);
      // console.log("queryOptions", queryOptions);
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
            return res
              .status(200)
              .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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

  // Api Council
  getDeanCouncils: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

      let department = await db.Lecturer.findOne({
        where: { id: req?.user?.id },
      });
      console.log("whereClause này", department);

      const queryOptions = {
        include: [
          {
            model: db.Council,
            as: "councilData",
            // attributes: ["name"],
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
          },
          {
            model: db.Lecturer,
            as: "lecturerData",
            // attributes: ["name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
        // group: ["councilData.id"]
      };

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.and]: {
            [Op.or]: whereClause,
            positionId: "P1",
            "$lecturerData.departmentId$": department.departmentId,
          },
        };
      }

      const result = await db.CouncilDetail.findAndCountAll(queryOptions);
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
  getDeanCouncilById: async (req, res) => {
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
  addDeanCouncil: async (req, res) => {
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
              { where: { id: thesis.thesisId } }
            );
          });
          console.log("councilDetails", councilDetails);
          result = null;
          result = councilDetails.map(async (position) => {
            console.log("position", position);
            console.log("req?.body?.thesesDetails", req?.body?.thesesDetails);
            let res = await db.CouncilDetail.create(position);
            req?.body?.thesesDetails.map(async (thesis) => {
              await db.Mark.create({
                councilDetailId: res?.dataValues?.id,
                thesisId: thesis?.thesisId,
              });
            });
          });
          console.log(result);
          // result = await db.CouncilDetail.bulkCreate(councilDetails);
          // req?.body?.thesesDetails.map(async (thesis) => {
          //   await db.Mark.update(
          //     {
          //       councilId: result?.dataValues?.id,
          //     },
          //     { where: { id: thesis.id } }
          //   );
          // });
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
  updateDeanCouncil: async (req, res) => {
    try {
      if (req?.params?.id) {
        console.log(req.body);
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
          // Thêm councilId vào chi tiết
          let councilDetails = [];
          req?.body?.councilDetails.map((position) => {
            councilDetails.push({
              councilId: req?.params?.id,
              ...position,
            });
          });
          let countThesisDuplicate = 0;
          await db.Thesis.update(
            {
              councilId: null,
            },
            {
              where: {
                councilId: req?.params?.id,
              },
            }
          );
          // Cập nhật hội đồng chấm
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
          // xóa tất cả chi tiết không nằm trong danh sách gửi lên
          ids = resultDelete?.map((position) => position.id);
          result = await db.CouncilDetail.destroy({
            where: { id: ids },
          });

          // console.log("resultDelete", result, ids);

          result = await db.CouncilDetail.bulkCreate(councilDetails, {
            upsertKeys: ["id"],
            updateOnDuplicate: ["positionId", "councilId", "lecturerId"],
          });

          councilDetails = await db.CouncilDetail.findAll({
            where: {
              councilId: req?.params?.id,
            },
          });
          console.log("councilDetails", councilDetails);
          result = await Promise.all(
            councilDetails?.map(async (position) => {
              console.log("position", position);
              console.log("req?.body?.thesesDetails", req?.body?.thesesDetails);
              await Promise.all(
                req?.body?.thesesDetails.map(async (thesis) => {
                  await db.Mark.bulkCreate(
                    [
                      {
                        councilDetailId: position?.id,
                        thesisId: thesis?.thesisId,
                      },
                    ],
                    {
                      upsertKeys: ["id"],
                      updateOnDuplicate: ["councilDetailId", "thesisId"],
                    }
                  );
                })
              );
              return res;
            })
          );
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
  deleteDeanCouncil: async (req, res) => {
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
  importDeanCouncils: async (req, res) => {
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
  deleteDeanCouncilDetail: async (req, res) => {
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

  // Api Thesis
  getThesisCouncils: async (req, res) => {
    try {
      let whereClause = userController.whereClause(req?.body);

      whereClause = {
        [Op.or]: whereClause,
      };

      console.log("whereClause", whereClause);
      whereClause["councilId"] = req?.body?.id;

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
          [Op.and]: whereClause,
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
  getThesisCouncilsById: async (req, res) => {
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
  addThesisCouncils: async (req, res) => {
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
  updateThesisCouncils: async (req, res) => {
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
  deleteThesisCouncils: async (req, res) => {
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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

  MarkEvaluationCriteria: async (req, res) => {
    try {
      if (req?.body) {
        let council = await db.Council.findOne({
          where: {
            id: req?.body?.mark?.councilId,
          },
        });
        if (council.statusId == "S1") {
          let mark = await db.Mark.findOne({
            where: {
              councilDetailId: req?.body?.mark?.councilDetailId,
              thesisId: req?.body?.mark?.thesisId,
            },
          });
          await db.Mark.update(
            { totalMark: req?.body?.mark?.totalMark },
            {
              where: {
                councilDetailId: req?.body?.mark?.councilDetailId,
                thesisId: req?.body?.mark?.thesisId,
              },
            }
          );
          // Kiểm tra giảng viên hội đồng đã chấm hết chưa
          let marks = await db.Mark.findAndCountAll({
            where: {
              thesisId: req?.body?.mark?.thesisId,
              totalMark: { [Op.not]: null },
            },
            include: [
              {
                model: db.CouncilDetail,
                as: "councilDetailData",
                // where: {
                //   "$councilDetailData.id$": req?.body?.mark?.councilDetailId,
                // },
                // required: true, // (tùy chọn) chỉ bao gồm các CouncilDetail có id trùng khớp
                // separate: true, // (tùy chọn) tạo các truy vấn riêng biệt cho CouncilDetail
                // include: [], // (tùy chọn) nếu bạn muốn bao gồm thêm mối quan hệ khác
              },
            ],
            raw: true,
            // nest: true,
          });
          let councilDetails = await db.CouncilDetail.count({
            where: {
              councilId: req?.body?.mark?.councilId,
            },
          });
          let thesisSession = await db.ThesisSession.findOne({
            where: {
              id: req?.body?.mark?.thesisSessionId,
            },
          });
          let thesis = await db.Thesis.findAndCountAll({
            where: {
              id: req?.body?.mark?.thesisId,
              advisorMark: { [Op.not]: null },
            },
          });
          console.log(
            "councilDetail",
            // marks,
            // councilDetails,
            // thesisSession,
            thesis
          );
          if (
            marks.count == councilDetails &&
            thesis.count &&
            thesisSession.validMark
          ) {
            console.log("Đã chấm full điểm");
            // Điểm trung bình chưa lọc
            function averageScoreUnfiltered(scores) {
              const totalScore = scores.reduce(
                (sum, score) => +sum + +score,
                0
              );
              const averageScore = (+totalScore / scores?.length).toFixed(1);
              return averageScore;
            }
            // Điểm trung bình đã lọc
            function averageScoreFiltered(
              scores,
              validMark,
              councilAverageScoreUnfiltered
            ) {
              const validScores = scores.filter(
                (score) =>
                  Math.abs(+score - +councilAverageScoreUnfiltered) < +validMark
              );
              console.log("validScores", validScores, scores);
              const totalScore = validScores?.reduce(
                (sum, score) => +sum + +score,
                0
              );
              const averageScore = (+totalScore / validScores?.length)?.toFixed(
                1
              );
              return { averageScore, validScores };
            }

            // Điểm đồ án tốt nghiệp = trung bình điểm mỗi vị trí(Đã lọc)
            // Điểm mỗi vị trí trong hội đồng(P1,P2,P4) = trung bình hội đồng(CL) +- điểm hợp lệ
            // Điểm phản biện(P3) = trung bình hội đồng (Đã lọc) +- điểm hợp lệ
            // Điểm TB Hội đồng + Bảo vệ = trung bình tất cả trừ điểm người hướng dẫn
            // Điểm hướng dẫn = Điểm TB Hội đồng + Bảo vệ +- điểm hợp lệ

            const validMark = thesisSession.validMark; // Điểm hợp lệ

            const councilScores = marks?.rows
              ?.filter((mark) => mark["councilDetailData.positionId"] !== "P3")
              .map((mark) => mark.totalMark);
            const councilAverageScoreUnfiltered =
              averageScoreUnfiltered(councilScores); //Điểm trung bình chưa lọc

            const councilAverageScoreFiltered = averageScoreFiltered(
              councilScores,
              validMark,
              councilAverageScoreUnfiltered
            ); //Điểm hội đồng đã lọc

            const defenseScores = marks?.rows
              ?.filter((mark) => mark["councilDetailData.positionId"] === "P3")
              .map((mark) => mark.totalMark);

            const argumentAverageScoreFiltered = averageScoreFiltered(
              defenseScores,
              validMark,
              councilAverageScoreFiltered.averageScore
            ); //Điểm phản biện đã lọc

            const councilAndArgumentScoreFiltered =
              argumentAverageScoreFiltered.validScores.concat(
                councilAverageScoreFiltered.validScores
              );
            const councilAndArgumentAverageScoreFiltered = (
              councilAndArgumentScoreFiltered.reduce(
                (sum, score) => +sum + +score,
                0
              ) / councilAndArgumentScoreFiltered.length
            ).toFixed(1); //Điểm trung bình HĐ+PB đã lọc

            const advisorAverageScoreFiltered = averageScoreFiltered(
              [thesis?.rows[0]?.advisorMark],
              validMark,
              councilAndArgumentAverageScoreFiltered
            ); //Điểm hướng dẫn đã lọc

            const totalScoreFiltered = councilAndArgumentScoreFiltered.concat(
              advisorAverageScoreFiltered.validScores
            );
            console.log(
              "totalScoreFiltered",
              totalScoreFiltered,
              advisorAverageScoreFiltered,
              [thesis?.rows[0]?.advisorMark]
            );
            const totalScore = averageScoreUnfiltered(totalScoreFiltered); //Điểm tổng

            console.log("totalScore", totalScore);
            if (totalScore <= 10 && totalScore >= 0) {
              await db.Thesis.update(
                {
                  totalScore: totalScore,
                  resultId: totalScore
                    ? totalScore >= 4
                      ? "RS1"
                      : "RS0"
                    : null,
                  councilStatusId: totalScore ? "H3" : "H2",
                },
                { where: { id: req?.body?.mark?.thesisId } }
              );
            }
            console.log("Đã đến đây");
          } else if (!thesisSession.validMark) {
            console.log("Chưa có điểm hợp lệ");
          }

          if (mark) {
            console.log("mark", mark);
            req?.body?.mark?.markCriterias.map(async (markCriteria) => {
              // console.log("markCriteria", markCriteria);
              markCriteria["markId"] = mark?.id;
              console.log(
                " markCriteria[]=mark?.id",
                (markCriteria["markId"] = mark?.id)
              );
              await db.MarkCriteria.upsert(markCriteria, {
                where: {
                  markId: +mark?.id,
                  evaluationCriteriaId: markCriteria?.evaluationCriteriaId,
                },
              });
            });
            // console.log("mark", mark);

            return res.status(200).json({
              errCode: 0,
              errMessage: "Chấm điểm hội đồng thành công.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình chấm, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(404).json({
            errCode: 1,
            errMessage: "Hội đồng chưa mở, không được chấm điểm!",
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

  getMarkCriteria: async (req, res) => {
    try {
      let mark = await db.Mark.findOne({
        where: {
          councilDetailId: req?.body?.data?.councilDetailId,
          thesisId: req?.body?.data?.thesisId,
        },
      });
      console.log(mark);
      const result = await db.MarkCriteria.findAll({
        where: {
          markId: mark?.id,
        },
        // order: [["evaluationCriteriaId", "DESC"]],
        raw: true,
        nest: true,
      });
      if (result) {
        return res.status(200).json({
          errCode: 0,
          errMessage: "Tìm dữ liệu thành công.",
          result: { result, totalMark: mark?.totalMark },
        });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  getTheses: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

      console.log("whereClause", whereClause);

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
            include: [
              {
                model: db.Allcode,
                as: "statusData",
              },
            ],
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

      // console.log("req", req);
      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
          thesisAdvisorId: req?.user?.id,
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
  updateThesis: async (req, res) => {
    try {
      if (req?.params?.id) {
        // console.log(req.body);
        let thesis = await db.Thesis.findOne({
          where: { id: req?.params?.id, reportFile: { [Op.ne]: null } },
        });
        if (thesis) {
          console.log(!thesis.reportFile);
          let result = await db.Thesis.update(
            {
              advisorMark: req?.body?.data?.advisorMark,
              resultId: req?.body?.data?.advisorMark < 5 ? "RS0" : null,
            },
            { where: { id: req?.params?.id } }
          );
          if (result) {
            return res.status(200).json({
              errCode: 0,
              errMessage: "Chấm điểm hướng dẫn thành công.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình chấm điểm, vui lòng thử lại sau.",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Sinh viên chưa nộp báo cáo, không thể chấm điểm, vui lòng thử lại sau.",
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
  getThesesTopic: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

      console.log("whereClause", whereClause);

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
            include: [
              {
                model: db.Allcode,
                as: "statusData",
              },
            ],
            where: { statusId: "H2" },
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

      // console.log("req", req);
      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
          thesisAdvisorId: req?.user?.id,
          thesisAdvisorStatusId: "H3",
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
  getThesesStudent: async (req, res) => {
    try {
      const whereClause = userController.whereClause(req?.body);

      console.log("whereClause", whereClause);

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
            include: [
              {
                model: db.Allcode,
                as: "genderData",
              },
              {
                model: db.Class,
                as: "classData",
              },
            ],
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

      // console.log("req", req);
      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
          thesisAdvisorId: req?.user?.id,
          thesisAdvisorStatusId: "H2",
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
  confirmAdvisorById: async (req, res) => {
    try {
      let result = await db.Thesis.findOne({
        where: {
          id: req?.params?.id,
          thesisAdvisorId: req?.user?.id,
        },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      // console.log("thesisSession", thesisSession);

      // console.log("result", result);
      if (result) {
        if (result.thesisAdvisorStatusId == "H2") {
          result = await db.Thesis.update(
            {
              thesisAdvisorStatusId: "H3",
            },
            { where: { id: req?.params?.id } }
          );
          if (result) {
            return res.status(200).json({
              errCode: 0,
              errMessage: "Xác nhận hướng dẫn thành công.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình xác nhận, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 1,
            errMessage:
              "Trạng thái xác nhận đã bị thay đổi trước đó, vui lòng thử lại!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 2,
          errMessage:
            "Sinh viên không đăng ký hướng dẫn, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  cancelAdvisorById: async (req, res) => {
    try {
      let result = await db.Thesis.findOne({
        where: {
          id: req?.params?.id,
          thesisAdvisorId: req?.user?.id,
        },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      // console.log("thesisSession", thesisSession);

      // console.log("result", result);
      if (result) {
        if (result.thesisAdvisorStatusId == "H2") {
          result = await db.Thesis.update(
            {
              thesisAdvisorStatusId: "H4",
            },
            { where: { id: req?.params?.id } }
          );
          if (result) {
            return res.status(200).json({
              errCode: 0,
              errMessage: "Hủy đăng ký hướng dẫn thành công.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình xác nhận, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 1,
            errMessage:
              "Trạng thái xác nhận đã bị thay đổi trước đó, vui lòng thử lại!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 2,
          errMessage:
            "Sinh viên không đăng ký hướng dẫn, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  confirmTopicById: async (req, res) => {
    try {
      let result = await db.Thesis.findOne({
        where: {
          topicId: req?.params?.id,
          thesisAdvisorId: req?.user?.id,
        },
        include: [
          {
            model: db.Topic,
            as: "topicData",
          },
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      // console.log("thesisSession", thesisSession);

      // console.log("result", result);
      if (result) {
        if (result.topicData.statusId == "H2") {
          result = await db.Topic.update(
            {
              statusId: "H3",
            },
            { where: { id: req?.params?.id } }
          );
          if (result) {
            return res.status(200).json({
              errCode: 0,
              errMessage: "Xác nhận đề tài thành công.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình xác nhận, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 1,
            errMessage:
              "Trạng thái xác nhận đã bị thay đổi trước đó, vui lòng thử lại!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 2,
          errMessage: "Sinh viên không đăng ký đề tài, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
  cancelTopicById: async (req, res) => {
    try {
      let result = await db.Thesis.findOne({
        where: {
          topicId: req?.params?.id,
          thesisAdvisorId: req?.user?.id,
        },
        include: [
          {
            model: db.Topic,
            as: "topicData",
          },
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      // console.log("thesisSession", thesisSession);

      // console.log("result", result);
      if (result) {
        if (result.topicData.statusId == "H2") {
          result = await db.Topic.update(
            {
              statusId: "H4",
            },
            { where: { id: req?.params?.id } }
          );
          if (result) {
            return res.status(200).json({
              errCode: 0,
              errMessage: "Hủy đăng ký đề tài thành công.",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình xác nhận, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 1,
            errMessage:
              "Trạng thái xác nhận đã bị thay đổi trước đó, vui lòng thử lại!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 2,
          errMessage: "Sinh viên không đăng ký đề tài, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  // Api Topic
  getDeanTopics: async (req, res) => {
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
          departmentId: req?.body?.departmentId,
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
  getDeanTopicById: async (req, res) => {
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
  addDeanTopic: async (req, res) => {
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
  updateDeanTopic: async (req, res) => {
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
  deleteDeanTopic: async (req, res) => {
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
  importDeanTopics: async (req, res) => {
    try {
      if (req?.body?.data) {
        // console.log(req?.body?.data);
        let dataFilter = req?.body?.data?.map((res) => {
          return {
            ...res,
            departmentId: req?.body?.departmentId,
            statusId: "H1",
          };
        });
        console.log("dataFilter", dataFilter);
        const result = await db.Topic.bulkCreate(dataFilter);
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

  // Api Topic

  getDeanTheses: async (req, res) => {
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
            include: [
              {
                model: db.Allcode,
                as: "statusData",
              },
            ],
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
            where: { departmentId: req?.body?.departmentId },
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
  getDeanThesisById: async (req, res) => {
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
  addDeanThesis: async (req, res) => {
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
  updateDeanThesis: async (req, res) => {
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
  deleteDeanThesis: async (req, res) => {
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
  importDeanTheses: async (req, res) => {
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
  importThesisCouncils: async (req, res) => {
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
          lecturerId: req?.params?.id,
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "deanData") {
              whereClause["$deanData.fullName$"] = {
                [Op.like]: searchTerms,
              };
            }
            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
                  [req?.body?.deanId && "id"]:
                    req?.body?.deanId && req?.body?.deanId,
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              departmentId: req?.body?.deanId
                ? req?.params?.id
                : req?.params?.id,
            },
            {
              where: {
                [req?.body?.deanId ? "id" : "departmentId"]: req?.body?.deanId
                  ? req?.body?.deanId
                  : req?.params?.id,
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
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
            });
          }
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            // if (req?.body?.filterSearch == "deanData") {
            //   whereClause["$deanData.fullName$"] = {
            //     [Op.like]: searchTerms,
            //   };
            // }
            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "departmentData") {
              whereClause["$departmentData.name$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "statusData") {
              whereClause["$statusData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }

            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "blockData") {
              whereClause["$blockData.name$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "majorData") {
              whereClause["$majorData.name$"] = {
                [Op.like]: searchTerms,
              };
            }

            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            // if (req?.body?.filterSearch == "deanData") {
            //   whereClause["$deanData.fullName$"] = {
            //     [Op.like]: searchTerms,
            //   };
            // }
            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
                "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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

  getEvaluationCriteriaByThesisSessionId: async (req, res) => {
    try {
      // console.log(req?.params?.id);
      let result = await db.ThesisSession.findAll({
        where: {
          id: req?.params?.id,
        },
        // include: [
        //   {
        //     model: db.EvaluationMethod,
        //     as: "evaluationMethodData",
        //     // attributes: ["name"],
        //     // include: [
        //     //   {
        //     //     model: db.EvaluationCriteria,
        //     //     as: "evaluationCriteriaData",
        //     //     // attributes: ["name"],
        //     //   },
        //     // ],
        //   },

        // ],
        // order: [["order", "ASC"]],
        raw: true,
        nest: true,
      });
      console.log(result);
      if (result) {
        result = await db.EvaluationCriteria.findAll({
          where: {
            evaluationMethodId: result[0]?.evaluationMethodId,
          },
          order: [["order", "ASC"]],
          raw: true,
          nest: true,
        });
        if (result) {
          return res.status(200).json({
            errCode: 0,
            errMessage: "Tìm dữ liệu thành công.",
            result,
          });
        } else {
          return res.status(200).json({
            errCode: 1,
            errMessage:
              "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "deanData") {
              whereClause["$deanData.fullName$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "departmentData") {
              whereClause["$departmentData.name$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "roleData") {
              whereClause["$roleData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "statusData") {
              whereClause["$statusData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "genderData") {
              whereClause["$genderData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }
            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
                  "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
                  "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "deanData") {
              whereClause["$deanData.fullName$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "classData") {
              whereClause["$classData.name$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "roleData") {
              whereClause["$roleData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "statusData") {
              whereClause["$statusData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }
            if (req?.body?.filterSearch == "genderData") {
              whereClause["$genderData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }
            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
  getTopics: async (req, res) => {
    try {
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      // console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        // console.log("Đã vào");
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "departmentData") {
              whereClause["$departmentData.name$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "statusData") {
              whereClause["$statusData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            }

            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
      // console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      // console.log(searchTerms);
      const whereClause = {};
      // console.log(req?.body?.inputSearch?.toLowerCase());
      if (Object.keys(req?.body).length > 0) {
        if (!req?.body?.filterSearch?.includes("Data")) {
          if (searchTerms?.toLowerCase() != "%null%") {
            whereClause[req?.body?.filterSearch] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms?.toLowerCase() != "%null%") {
            // console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "deanData") {
              whereClause["$deanData.name$"] = {
                [Op.like]: searchTerms,
              };
            }

            // theo id
            whereClause[req?.body?.filterSearch.replace("Data", "Id")] = {
              [Op.like]: searchTerms,
            };
          } else {
            whereClause[req?.body?.filterSearch?.replace("Data", "Id")] = {
              [Op.is]: null,
            };
          }
        }
      }
      // console.log("whereClause", whereClause);

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
          errMessage:
            "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
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
          validMark: req?.body?.validMark,
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công." });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
            validMark: req?.body?.validMark,
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
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình xóa, vui lòng thử lại sau!",
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
              "Đã xảy ra lỗi trong quá trình import, vui lòng thử lại sau!",
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
  statisticDean: async (req, res) => {
    try {
      const department = await db.Lecturer.findOne({
        where: { id: req?.user?.id },
      });
      const statisticTotalThesisDeparment = await db.Thesis.count({
        where: {
          "$studentData.classData.majorData.departmentId$":
            department.departmentId,
        },
        include: [
          {
            model: db.Student,
            as: "studentData",
            include: [
              {
                model: db.Class,
                as: "classData",
                include: [{ model: db.Major, as: "majorData" }],
              },
            ],
          },
        ],
      });
      const statisticThesisDepartmentAvailabeResult = await db.Thesis.count({
        where: {
          resultId: { [Op.ne]: null },
          thesisAdvisorId: req?.user?.id,
          "$studentData.classData.majorData.departmentId$":
            department.departmentId,
        },
        include: [
          {
            model: db.Student,
            as: "studentData",
            include: [
              {
                model: db.Class,
                as: "classData",
                include: [{ model: db.Major, as: "majorData" }],
              },
            ],
          },
        ],
      });
      const statisticThesisDepartmentSuccessResult = await db.Thesis.count({
        where: {
          resultId: "RS1",
          thesisAdvisorId: req?.user?.id,
          "$studentData.classData.majorData.departmentId$":
            department.departmentId,
        },
        include: [
          {
            model: db.Student,
            as: "studentData",
            include: [
              {
                model: db.Class,
                as: "classData",
                include: [{ model: db.Major, as: "majorData" }],
              },
            ],
          },
        ],
      });
      const statisticTotalStudentDepartment = await db.Student.count({
        where: {
          "$classData.majorData.departmentId$": department.departmentId,
        },
        include: [
          {
            model: db.Class,
            as: "classData",
            include: [{ model: db.Major, as: "majorData" }],
          },
        ],
      });

      const statisticTotalLecturerDepartment = await db.Lecturer.count({
        where: { departmentId: department.departmentId },
      });
      const statisticTotalThesisAdvisor = await db.Thesis.count({
        where: { thesisAdvisorId: req?.user?.id },
      });
      const statisticThesisAdvisorAvailabeResult = await db.Thesis.count({
        where: { resultId: { [Op.ne]: null }, thesisAdvisorId: req?.user?.id },
      });
      const statisticThesisAdvisorSuccessResult = await db.Thesis.count({
        where: { resultId: { [Op.eq]: "RS1" }, thesisAdvisorId: req?.user?.id },
      });
      const statisticCouncilJoin = await db.CouncilDetail.count({
        where: { lecturerId: req?.user?.id },
      });
      const statisticCouncilMark = await db.Mark.count({
        where: { "$councilDetailData.lecturerId$": req?.user?.id },
        include: [
          {
            model: db.CouncilDetail,
            as: "councilDetailData",
          },
        ],
      });
      const statisticCouncilMarked = await db.Mark.count({
        where: {
          "$councilDetailData.lecturerId$": req?.user?.id,
          totalMark: { [Op.ne]: null },
        },
        include: [
          {
            model: db.CouncilDetail,
            as: "councilDetailData",
          },
        ],
      });
      // console.log(result);
      return res.status(200).json({
        errCode: 0,
        data: {
          statisticTotalThesisDeparment,
          statisticThesisDepartmentAvailabeResult,
          statisticThesisDepartmentSuccessResult,
          statisticTotalStudentDepartment,
          statisticTotalLecturerDepartment,
          statisticTotalThesisAdvisor,
          statisticThesisAdvisorAvailabeResult,
          statisticThesisAdvisorSuccessResult,
          statisticCouncilJoin,
          statisticCouncilMark,
          statisticCouncilMarked,
        },
      });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Đã xảy ra lỗi, vui lòng thử lại sau!",
      });
    }
  },
  statisticLecturer: async (req, res) => {
    try {
      const department = await db.Lecturer.findOne({
        where: { id: req?.user?.id },
      });
      const statisticTotalThesisAdvisor = await db.Thesis.count({
        where: { thesisAdvisorId: req?.user?.id },
      });
      const statisticThesisAdvisorAvailabeResult = await db.Thesis.count({
        where: { resultId: { [Op.ne]: null }, thesisAdvisorId: req?.user?.id },
      });
      const statisticThesisAdvisorSuccessResult = await db.Thesis.count({
        where: { resultId: { [Op.eq]: "RS1" }, thesisAdvisorId: req?.user?.id },
      });
      const statisticCouncilJoin = await db.CouncilDetail.count({
        where: { lecturerId: req?.user?.id },
      });
      const statisticCouncilMark = await db.Mark.count({
        where: { "$councilDetailData.lecturerId$": req?.user?.id },
        include: [
          {
            model: db.CouncilDetail,
            as: "councilDetailData",
          },
        ],
      });
      const statisticCouncilMarked = await db.Mark.count({
        where: {
          "$councilDetailData.lecturerId$": req?.user?.id,
          totalMark: { [Op.ne]: null },
        },
        include: [
          {
            model: db.CouncilDetail,
            as: "councilDetailData",
          },
        ],
      });
      // console.log(result);
      return res.status(200).json({
        errCode: 0,
        data: {
          statisticTotalThesisAdvisor,
          statisticThesisAdvisorAvailabeResult,
          statisticThesisAdvisorSuccessResult,
          statisticCouncilJoin,
          statisticCouncilMark,
          statisticCouncilMarked,
        },
      });
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Đã xảy ra lỗi, vui lòng thử lại sau!",
      });
    }
  },
};
module.exports = lecturerController;
