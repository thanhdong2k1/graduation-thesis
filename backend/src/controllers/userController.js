const db = require("../models");
const { Op } = require("sequelize");

const userController = {
  getTopics: async (req, res) => {
    try {
      const searchTerms = `%${
        req?.body?.inputSearch ? req?.body?.inputSearch : "".trim()
      }%`.replace(/\s/g, "%");
      console.log(searchTerms);
      const topics = await db.Topic.findAll({
        where: {
          departmentId: req?.body?.departmentId,
          statusId: "H1",
          [Op.or]: {
            name: {
              [Op.like]: searchTerms,
            },
            // description: {
            //   [Op.like]: `%${req.body.inputSearch}%`,
            // },
            // first_name: Sequelize.where(Sequelize.col('User.first_name'), {
            //   [Op.like]: '%elvis%'
            // }),
          },
        },
        offset: req?.body?.offset,
        limit: req?.body?.limit,
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
      const totalRecords = await db.Topic.count({
        where: {
          departmentId: req?.body?.departmentId,
          [Op.or]: {
            name: {
              [Op.like]: searchTerms,
            },
          },
        },
        raw: false,
      });
      return res.status(200).json({ errCode: 0, topics, totalRecords });
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
