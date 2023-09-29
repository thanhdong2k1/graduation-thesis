const db = require("../models");
const { Op } = require("sequelize");

const userController = {
  getTopics: async (req, res) => {
    try {
      console.log(req.body)
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch : "".trim()
      }%`.replace(/\s/g, "%");
      const whereClause = {
        departmentId: req?.body?.departmentId,
        statusId: "H1",
      };
      if (req?.body?.filterSearch) {
        whereClause[req?.body?.filterSearch] = {
          [Op.like]: searchTerms,
        };
      }
      console.log(whereClause)
      const result = await db.Topic.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: db.Department,
            as: "departmentData",
            // attributes: ["name"],
          },
        ],
        raw: true,
        nest: true,
      });
      console.log(result)
      console.log(topics);
      const { rows: topics, count: totalRecords } = result;
      return res.status(200).json({ errCode: 0, topics, totalRecords });
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
      const whereClause = {
        statusId: "S1",
      };
      // if (req?.body?.filterSearch) {
      //   whereClause[req.body.filterSearch] = {
      //     [Op.like]: searchTerms,
      //   };
      // }
      const result = await db.Council.findAndCountAll({
        where: whereClause,
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
  getDepartments: async (req, res) => {
    try {
      const departments = await db.Department.findAll({});
      return res.status(200).json({ errCode: 0, departments });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = userController;
