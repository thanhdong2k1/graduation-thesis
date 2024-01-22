const fs = require("fs");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op, where } = require("sequelize");
const evaluationCriteria = require("../models/evaluationCriteria");
const userController = require("./userController");
const salt = bcrypt.genSaltSync(10);
const path = require("path");

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
          .json({ errCode: 1, errMessage: "Mật khẩu cũ không đúng!" });
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
          .json({ errCode: 1, errMessage: "Mật khẩu cũ không đúng!" });
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

  // Api Lecturer
  getLecturers: async (req, res) => {
    try {
      // console.log("req.body", req.body);

      const department = await db.Major.findOne({
        where: {
          id: req?.body?.majorId,
        },
        order: [["departmentId", "DESC"]],
        raw: true,
        nest: true,
      });

      if (department) {
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
          errMessage: "Sinh viên không thuộc lớp học hoặc chuyên ngành nào!",
        });
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
          studentId: req?.user?.id,
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
          studentId: req?.user?.id,
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

  registerAdvisorById: async (req, res) => {
    try {
      let thesisCompleted = await db.Thesis.findAll({
        where: {
          studentId: req?.user?.id,
        },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      let isCompleted = false;
      thesisCompleted.map((thesis) => {
        if (thesis.resultId == "RS1") {
          isCompleted = true;
        }
      });
      if (!isCompleted) {
        const currentDate = new Date();

        // Lấy thông tin về ngày, tháng và năm
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        // Tạo chuỗi có định dạng "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);
        let thesisSession = await db.ThesisSession.findOne({
          where: {
            startDate: { [Op.lte]: formattedDate },
            endDate: { [Op.gte]: formattedDate },
          },
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
        console.log("result", thesisSession);
        let result = await db.Thesis.findOne({
          where: {
            studentId: req?.user?.id,
            thesisSessionId: thesisSession?.id,
          },
        });
        console.log("result", result);
        if (result) {
          if (result.thesisAdvisorStatusId != "H3") {
            result = await db.Thesis.update(
              {
                thesisAdvisorId: req?.params?.id,
                thesisAdvisorStatusId: "H2",
              },
              {
                where: {
                  studentId: req?.user?.id,
                  thesisSessionId: thesisSession?.id,
                },
              }
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
              errMessage:
                "Giảng viên đã xác nhận hướng dẫn, không thể đăng ký mới!",
            });
          }
        } else {
          const result = await db.Thesis.create({
            studentId: req?.user?.id,
            thesisAdvisorId: req?.params?.id,
            thesisAdvisorStatusId: "H2",
            thesisSessionId: thesisSession?.id,
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
      } else {
        return res.status(200).json({
          errCode: -1,
          errMessage: "Sinh viên đã hoàn thành tốt nghiệp!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },

  registerTopicById: async (req, res) => {
    try {
      const currentDate = new Date();

        // Lấy thông tin về ngày, tháng và năm
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        // Tạo chuỗi có định dạng "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);
        let thesisSession = await db.ThesisSession.findOne({
          where: {
            startDate: { [Op.lte]: formattedDate },
            endDate: { [Op.gte]: formattedDate },
          },
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
        console.log("result", thesisSession);
      let thesis = await db.Thesis.findOne({
        where: {
          studentId: req?.user?.id,
          thesisSessionId: thesisSession?.id,
          thesisAdvisorId: { [Op.ne]: null },
        },
        include: [
          {
            model: db.Topic,
            as: "topicData",
            // attributes: ["name"],
          },
        ],
        raw: true,
        // nest: true,
      });

      if (thesis) {
        if (thesis.thesisAdvisorStatusId == "H3") {
          if (thesis["topicData.statusId"] == "H3") {
            return res.status(200).json({
              errCode: 1,
              errMessage:
                "Đề tài đăng ký trước đó đã xác nhận hướng dẫn, không thể đăng ký mới!",
            });
          } else if (thesis["topicData.statusId"] == "H2") {
            return res.status(200).json({
              errCode: 1,
              errMessage:
                "Đề tài đăng ký trước đó đang chờ xác nhận, không thể đăng ký mới!",
            });
          } else {
            let result = await db.Topic.findOne({
              where: {
                id: req?.params?.id,
                statusId: "H1",
              },
              raw: true,
              // nest: true,
            });
            if (result) {
              result = await db.Thesis.update(
                {
                  topicId: req?.params?.id,
                },
                { where: { studentId: req?.user?.id, thesisSessionId: thesisSession?.id } }
              );
              await db.Topic.update(
                {
                  statusId: "H2",
                },
                { where: { id: req?.params?.id } }
              );
              if (result) {
                return res.status(200).json({
                  errCode: 0,
                  errMessage:
                    "Đăng ký đề tài thành công, vui lòng chờ giảng viên hướng dẫn xác nhận!",
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
                errCode: 2,
                errMessage:
                  "Đề tài này đã bị đăng ký, vui lòng đăng ký đề tài khác!",
              });
            }
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Giảng viên chưa xác nhận hướng dẫn, không được đăng ký đề tài!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 2,
          errMessage: "Sinh viên chưa đăng ký giảng viên hướng dẫn!",
        });
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
      console.log("req.body", req.body);
      console.log("req.file", req.file);
      if (req?.body?.id) {
        const reported = await db.Thesis.findOne({
          where: {
            id: req?.body?.id,
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
          raw: true,
          nest: true,
        });
        if (
          reported?.thesisAdvisorStatusId == "H3" &&
          reported?.topicData?.statusId == "H3" &&
          reported?.thesisAdvisorId
        ) {
          console.log("req.bodyaaa", req.body);

          if (reported.reportFile) {
            console.log(reported);
            console.log(
              "fs.existsSync",
              fs.existsSync(`./src/public/upload/${reported?.reportFile}`)
            );
            fs.existsSync(`./src/public/upload/${reported?.reportFile}`)
              ? fs.unlinkSync(`./src/public/upload/${reported?.reportFile}`)
              : null;
          }
          const result = await db.Thesis.update(
            {
              reportFile: path.relative("src/public/upload", req?.file?.path),
            },
            { where: { id: req?.body?.id } }
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
          return res.status(404).json({
            errCode: 1,
            errMessage:
              "Đề tài hoặc giảng viên hướng dẫn chưa được xác nhận, không thể nộp báo cáo!",
          });
        }
      } else {
        return res
          .status(404)
          .json({ errCode: 1, errMessage: "Dữ liệu không được tìm thấy" });
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
      const department = await db.Major.findOne({
        where: {
          id: req?.body?.majorId,
        },
        order: [["departmentId", "DESC"]],
        raw: true,
        nest: true,
      });

      if (department) {
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
            departmentId: department.departmentId,
            statusId: "H1",
          };
        }

        const result = await db.Topic.findAndCountAll(queryOptions);
        // console.log(result);
        const { rows: topics, count: totalRecords } = result;
        return res.status(200).json({ errCode: 0, topics, totalRecords });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: "Sinh viên không thuộc lớp học hoặc chuyên ngành nào!",
        });
      }
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
          .json({ errCode: 0, errMessage: "Tìm dữ liệu thành công!", result });
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
    // try {
    //   let thesis = await db.Thesis.findOne({
    //     where: {
    //       studentId: req?.user?.id,
    //     },
    //     include: [
    //       {
    //         model: db.Topic,
    //         as: "topicData",
    //         // attributes: ["name"],
    //       },
    //     ],
    //     raw: true,
    //     // nest: true,
    //   });
    //   let student = await db.Student.findOne({
    //     where: {
    //       id: req?.user?.id,
    //     },
    //     include: [
    //       {
    //         model: db.Class,
    //         as: "classData",
    //         // attributes: ["name"],
    //         include: [
    //           {
    //             model: db.Major,
    //             as: "majorData",
    //             // attributes: ["name"],
    //             include: [
    //               {
    //                 model: db.Department,
    //                 as: "departmentData",
    //                 // attributes: ["name"],
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //     raw: true,
    //     // nest: true,
    //   });
    //   console.log("student", student);
    //   if (thesis) {
    //     if (thesis["topicData.statusId"] == "H3") {
    //       return res.status(200).json({
    //         errCode: 1,
    //         errMessage:
    //           "Đề tài đăng ký trước đó đã xác nhận, không thể đăng ký mới!",
    //       });
    //     } else if (thesis["topicData.statusId"] == "H2") {
    //       return res.status(200).json({
    //         errCode: 1,
    //         errMessage:
    //           "Đề tài đăng ký trước đó đang chờ xác nhận, không thể đăng ký mới!",
    //       });
    //     } else {
    //       let topic = await db.Topic.create({
    //         name: req?.body?.name,
    //         description: req?.body?.description,
    //         statusId: "H2",
    //         departmentId: student["classData.majorData.departmentId"],
    //       });
    //       console.log("topic", topic);
    //       if (topic) {
    //         let result = await db.Thesis.update(
    //           {
    //             topicId: topic?.dataValues?.id,
    //           },
    //           { where: { studentId: req?.user?.id } }
    //         );
    //         if (result) {
    //           return res.status(200).json({
    //             errCode: 0,
    //             errMessage:
    //               "Đăng ký đề tài thành công, vui lòng chờ giảng viên hướng dẫn xác nhận!",
    //           });
    //         } else {
    //           return res.status(200).json({
    //             errCode: 2,
    //             errMessage:
    //               "Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau!",
    //           });
    //         }
    //       } else {
    //         return res.status(200).json({
    //           errCode: 2,
    //           errMessage:
    //             "Đề tài này đã bị đăng ký, vui lòng đăng ký đề tài khác!",
    //         });
    //       }
    //     }
    //   } else {
    //     return res.status(200).json({
    //       errCode: 2,
    //       errMessage: "Sinh viên chưa đăng ký giảng viên hướng dẫn!",
    //     });
    //   }
    // } catch (error) {
    //   return res.status(500).json({
    //     errCode: -1,
    //     errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
    //   });
    // }

    try {
      let thesis = await db.Thesis.findOne({
        where: {
          studentId: req?.user?.id,
          thesisAdvisorId: { [Op.ne]: null },
        },
        include: [
          {
            model: db.Topic,
            as: "topicData",
            // attributes: ["name"],
          },
        ],
        raw: true,
        // nest: true,
      });
      let student = await db.Student.findOne({
        where: {
          id: req?.user?.id,
        },
        include: [
          {
            model: db.Class,
            as: "classData",
            // attributes: ["name"],
            include: [
              {
                model: db.Major,
                as: "majorData",
                // attributes: ["name"],
              },
            ],
          },
        ],
        raw: true,
        // nest: true,
      });
      if (thesis) {
        if (thesis.thesisAdvisorStatusId == "H3") {
          if (thesis["topicData.statusId"] == "H3") {
            return res.status(200).json({
              errCode: 1,
              errMessage:
                "Đề tài đăng ký trước đó đã xác nhận hướng dẫn, không thể đăng ký mới!",
            });
          } else if (thesis["topicData.statusId"] == "H2") {
            return res.status(200).json({
              errCode: 1,
              errMessage:
                "Đề tài đăng ký trước đó đang chờ xác nhận, không thể đăng ký mới!",
            });
          } else {
            let topic = await db.Topic.create({
              name: req?.body?.name,
              description: req?.body?.description,
              statusId: "H2",
              departmentId: student["classData.majorData.departmentId"],
            });
            console.log("topic", topic);
            if (topic) {
              let result = await db.Thesis.update(
                {
                  topicId: topic?.dataValues?.id,
                },
                { where: { studentId: req?.user?.id } }
              );
              if (result) {
                await db.Topic.update(
                  {
                    statusId: "H2",
                  },
                  { where: { id: topic?.dataValues?.id } }
                );
                if (result) {
                  return res.status(200).json({
                    errCode: 0,
                    errMessage:
                      "Đăng ký đề tài thành công, vui lòng chờ giảng viên hướng dẫn xác nhận!",
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
                  errCode: 2,
                  errMessage:
                    "Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại!",
                });
              }
            } else {
              return res.status(200).json({
                errCode: 1,
                errMessage:
                  "Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại!",
              });
            }
          }
        } else {
          return res.status(200).json({
            errCode: 2,
            errMessage:
              "Giảng viên chưa xác nhận hướng dẫn, không được đăng ký đề tài!",
          });
        }
      } else {
        return res.status(200).json({
          errCode: 2,
          errMessage: "Sinh viên chưa đăng ký giảng viên hướng dẫn!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!",
      });
    }
  },
};
module.exports = studentController;
