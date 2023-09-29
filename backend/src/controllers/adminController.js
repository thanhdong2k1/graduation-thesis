const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op } = require("sequelize");
const salt = bcrypt.genSaltSync(10);

const adminController = {
  // Register
  changePassword: async (req, res) => {
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
            console.log("changePassword", changePassword);
            return res.status(200).json({
              errCode: 0,
              errMessage: "Password has been changed",
            });
          } else {
            return res.status(400).json({
              errCode: 3,
              errMessage: "Plz try again late!",
            });
          }
        } else {
          return res.status(400).json({
            errCode: 2,
            errMessage: "The old password is incorrect",
          });
        }
      } else {
        return res
          .status(400)
          .json({ errCode: 1, errMessage: "User is not valid" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  changeInformation: async (req, res) => {
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
          console.log("changeInformation", changeInformation);
          return res.status(200).json({
            errCode: 0,
            errMessage: "Ok",
          });
        } else {
          return res.status(200).json({
            errCode: 3,
            errMessage: "Plz try again late!",
          });
        }
      } else {
        return res
          .status(200)
          .json({ errCode: 1, errMessage: "User is not valid" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  changeInformation: async (req, res) => {
    try {
      console.log(req.body);
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
        console.log(changeInformation);
        if (changeInformation) {
          console.log("changeInformation", changeInformation);
          return res.status(200).json({
            errCode: 0,
            errMessage: "Ok",
          });
        } else {
          return res.status(200).json({
            errCode: 3,
            errMessage: "Plz try again late!",
          });
        }
      } else {
        return res
          .status(200)
          .json({ errCode: 1, errMessage: "User is not valid" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getInformation: async (req, res) => {
    try {
      let userData = {};
      //   findOne
      let information = await db.Lecturer.findOne({
        where: { email: req.body.email },
      });
      information = information
        ? information
        : await db.Student.findOne({
            where: { email: req.body.email },
          });
      if (information) {
        delete information.password;
        return res.status(200).json({
          errCode: 0,
          errMessage: "Ok",
          information,
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: `Your's Email isn't exist in the system. Plz try log in again.`,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
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
          errMessage: "Ok",
          code,
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          errMessage: `Code is invalid or not found. Plz try again.`,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getCouncils: async (req, res) => {
    try {
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch.trim() : ""
      }%`.replace(/\s/g, "%");
      console.log(searchTerms);
      const whereClause = {};
      console.log((req?.body?.inputSearch).toLowerCase());
      if (!req?.body?.filterSearch.includes("Data")) {
        if (searchTerms.toLowerCase() != "%null%") {
          whereClause[req?.body?.filterSearch] = {
            [Op.like]: searchTerms,
          };
        } else {
          whereClause[req?.body?.filterSearch] = {
            [Op.is]: null,
          };
        }
      } else {
        console.log(req?.body?.filterSearch);
        if (req?.body?.filterSearch == "thesisSessionData") {
          whereClause["$thesisSessionData.name$"] = {
            // Thêm điều kiện tại đây
            [Op.like]: searchTerms, // Thay đổi điều kiện tại đây nếu cần thiết
          };
        } else if (req?.body?.filterSearch == "statusData") {
          whereClause["$statusData.valueVi$"] = {
            // Thêm điều kiện tại đây
            [Op.like]: searchTerms, // Thay đổi điều kiện tại đây nếu cần thiết
          };
        }
      }
      console.log("whereClause", whereClause);

      const result = await db.Council.findAndCountAll({
        where: whereClause,
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
      const { rows: councils, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, councils, totalRecords });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = adminController;
