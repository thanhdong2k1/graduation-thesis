const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op, where } = require("sequelize");
const evaluationCriteria = require("../models/evaluationCriteria");
const salt = bcrypt.genSaltSync(10);

const studentController = {
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
          const changePassword = await db.Student.update(
            { password: hashPasswordFromBcrypt },
            {
              where: {
                email: req?.body?.email,
              },
            }
          );
          if (changePassword) {
            console.log("changePassword", changePassword);
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
          .json({ errCode: 1, errMessage: "Mật khẩu cũ không đúng!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },
  changeInformationStudent: async (req, res) => {
    try {
      const user = await db.Student.findOne({
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
          console.log("changeInformation", changeInformation);
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
          .json({ errCode: 1, errMessage: "Mật khẩu cũ không đúng!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errCode: -1, errMessage: error });
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
      console.log("information", information);
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
      console.log("error", error);
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },

  // Api Lecturer
  getLecturers: async (req, res) => {
    try {
      console.log("req.body", req.body);

      const department = await db.Major.findOne({
        where: {
          id: req?.body?.majorId,
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

      if (department) {
        console.log("departmentId", department.departmentId);
        const searchTerms = `%${
          req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
        }%`?.replace(/\s/g, "%");
        console.log(searchTerms);
        const whereClause = {};
        console.log(req?.body?.inputSearch?.toLowerCase());
        console.log("req?.body?.length", Object.keys(req?.body).length);
        if (Object.keys(req?.body).length > 0) {
          console.log("Đã vào");
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
              console.log(req?.body?.filterSearch);
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
        console.log("whereClause", whereClause);

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
            departmentId: department.departmentId,
          };
        }

        const result = await db.Lecturer.findAndCountAll(queryOptions);
        // console.log(result);
        const { rows: lecturers, count: totalRecords } = result;
        return res.status(200).json({ errCode: 0, lecturers, totalRecords });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: "Sinh viên không thuộc lớp học nào!",
        });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },

  // Api Thesis
  getTheses: async (req, res) => {
    try {
      console.log(req.body);
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
      }%`?.replace(/\s/g, "%");
      console.log(searchTerms);
      const whereClause = {};
      console.log(req?.body?.inputSearch?.toLowerCase());
      console.log("req?.body?.length", Object.keys(req?.body).length);
      if (Object.keys(req?.body).length > 0) {
        console.log("Đã vào");
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
          // councilStatusData,
          // thesisAdvisorStatusData,
          // resultData,
          // topicData,
          // studentData,
          // thesisAdvisorData,
          // thesisSessionData,
          // councilData,
          if (searchTerms?.toLowerCase() != "%null%") {
            console.log(req?.body?.filterSearch);
            if (req?.body?.filterSearch == "topicData") {
              whereClause["$topicData.name$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "studentData") {
              whereClause["$studentData.fullName$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "thesisAdvisorData") {
              whereClause["$thesisAdvisorData.fullName$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "thesisSessionData") {
              whereClause["$thesisSessionData.name$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "councilData") {
              whereClause["$councilData.name$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "councilStatusData") {
              whereClause["$councilStatusData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "thesisAdvisorStatusData") {
              whereClause["$thesisAdvisorStatusData.valueVi$"] = {
                [Op.like]: searchTerms,
              };
            } else if (req?.body?.filterSearch == "resultData") {
              whereClause["$resultData.valueVi$"] = {
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

      console.log("req", req);
      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = {
          [Op.or]: whereClause,
          studentId: req?.user?.id,
        };
      }

      const result = await db.Thesis.findAndCountAll(queryOptions);
      // console.log(result);
      const { rows: theses, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, theses, totalRecords });
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
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
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công!", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
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
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công!", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },

  registerAdvisorById: async (req, res) => {
    try {
      let result = await db.Thesis.findOne({
        where: {
          studentId: req?.user?.id,
        },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      let dateNow = new Date().toLocaleDateString("vi-VN");
      let parts = dateNow.split("/");
      dateNow = `${parts[2]}-${parts[1]}-${parts[0]}`;
      console.log(
        "dateNow",
        dateNow,
        dateNow > "18/01/2023",
        dateNow < "18/01/2023"
      );
      let thesisSession = await db.ThesisSession.findAll({
        where: {
          [Op.and]: [
            { startDate: { [Op.lte]: dateNow } },
            { endDate: { [Op.gte]: dateNow } },
          ],
        },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      console.log("thesisSession", thesisSession);

      console.log("result", result);
      if (result) {
        if (result.thesisAdvisorStatusId != "H3") {
          result = await db.Thesis.update(
            {
              thesisAdvisorId: req?.params?.id,
              thesisAdvisorStatusId: "H2",
            },
            { where: { studentId: req?.user?.id } }
          );
          if (result) {
            return res.status(200).json({
              errCode: 0,
              errMessage:
                "Đăng ký giảng viên thành công, vui lòng chờ giảng viên xác nhận!",
            });
          } else {
            return res.status(200).json({
              errCode: 2,
              errMessage:
                "Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau!",
            });
          }
        } else {
          return res.status(200).json({
            errCode: 1,
            errMessage: "Giảng viên đã xác nhận hướng dẫn, không thể đăng ký!",
          });
        }
      } else {
        const result = await db.Thesis.create({
          startDate: req?.body?.startDate,
          complateDate: req?.body?.complateDate,
          thesisStartDate: req?.body?.thesisStartDate,
          thesisEndDate: req?.body?.thesisEndDate,
          studentId: req?.user?.id,
          thesisAdvisorId: req?.params?.id,
          thesisAdvisorStatusId: "H2",
        });
        if (result) {
          return res
            .status(200)
            .json({ errCode: 0, errMessage: "Thêm dữ liệu thành công!" });
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Đã xảy ra lỗi trong quá trình thêm, vui lòng thử lại sau!",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },

  updateThesis: async (req, res) => {
    try {
      if (req?.params?.id) {
        console.log(req.body);
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
            .json({ errCode: 0, errMessage: "Cập nhật dữ liệu thành công" });
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
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy" });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },

  // Api Topic
  getTopics: async (req, res) => {
    try {
      const department = await db.Major.findOne({
        where: {
          id: req?.body?.majorId,
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

      if (department) {
        console.log(req.body);
        const searchTerms = `%${
          req?.body?.inputSearch ? req?.body?.inputSearch?.trim() : ""
        }%`?.replace(/\s/g, "%");
        console.log(searchTerms);
        const whereClause = {};
        console.log(req?.body?.inputSearch?.toLowerCase());
        console.log("req?.body?.length", Object.keys(req?.body).length);
        if (Object.keys(req?.body).length > 0) {
          console.log("Đã vào");
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
              console.log(req?.body?.filterSearch);
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
        console.log("whereClause", whereClause);

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
            departmentId: department.departmentId,
          };
        }

        const result = await db.Topic.findAndCountAll(queryOptions);
        // console.log(result);
        const { rows: topics, count: totalRecords } = result;
        return res.status(200).json({ errCode: 0, topics, totalRecords });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: "Sinh viên không thuộc lớp học nào!",
        });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
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
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công!", result });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Đã xảy ra lỗi trong quá trình tìm, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: error });
    }
  },
};
module.exports = studentController;
