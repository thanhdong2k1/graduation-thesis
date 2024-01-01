const db = require("../models");
const { Op } = require("sequelize");

const userController = {
  whereClause: (body) => {
    if (Object.keys(body).length > 0) {
   // console.log("đã vào whereClause", body);
      const searchTerms = `%${
        body?.inputSearch ? body?.inputSearch?.trim() : ""
      }%`
        ?.replace(/\s/g, "%")
        .toLowerCase();
      const whereClause = {};
   // console.log(body?.inputSearch?.toLowerCase());
   // console.log("body?.length", Object.keys(body).length);
      const [modelName, fieldName, deepSearch] = body?.filterSearch?.split(".");
      console.log("modelName, fieldName",modelName, fieldName)
      if (Object.keys(body).length > 0 && body?.filterSearch!="") {
        if (!body?.filterSearch?.includes("Data")) {
          if (searchTerms != "%null%") {
            console.log('if (searchTerms != "%null%") {if (!body?.filterSearch?.includes("Data")) {')
            whereClause[modelName] = {
              [Op.like]: searchTerms,
            };
          } else {
            console.log('elsse if (searchTerms != "%null%") {')
            whereClause[modelName] = {
              [Op.is]: null,
            };
          }
        } else {
          if (searchTerms != "%null%") {
            console.log('if (searchTerms != "%null%") {')
            console.log(`$${modelName}.${fieldName}${deepSearch?"."+deepSearch:""}$`);
            whereClause[`$${modelName}.${fieldName}${deepSearch?"."+deepSearch:""}$`] = {
              [Op.like]: searchTerms,
            };

            // theo id
            console.log(`${!deepSearch?modelName.replace("Data", "Id"):"$"+modelName+"."+fieldName.replace("Data", "Id")+"$"}`);
            whereClause[`${!deepSearch?modelName.replace("Data", "Id"):"$"+modelName+"."+fieldName.replace("Data", "Id")+"$"}`] = {
              [Op.like]: searchTerms,
            };
          } else {
            console.log('elsse if ')
            whereClause[`${!deepSearch?modelName.replace("Data", "Id"):"$"+modelName+"."+fieldName.replace("Data", "Id")+"$"}`] = {
              [Op.is]: null,
            };
          }
        }
      }
      console.log(whereClause);
      return whereClause;
    }
    return body;
  },
  getTopics: async (req, res) => {
    try {
   // console.log(req.body);
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
   // console.log(whereClause);
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
   // console.log(result);
   // console.log(topics);
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
   // console.log(searchTerms);
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
