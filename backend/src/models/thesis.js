"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thesis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Sau
      Thesis.belongsTo(models.Student, {
        foreignKey: "studentId",
        targetKey: "id",
        as: "studentData",
      });
      Thesis.belongsTo(models.Lecturer, {
        foreignKey: "thesisAdvisorId",
        targetKey: "id",
        as: "thesisAdvisorData",
      });

      Thesis.belongsTo(models.Topic, {
        foreignKey: "topicId",
        targetKey: "id",
        as: "topicData",
      });
      Thesis.belongsTo(models.ThesisSession, {
        foreignKey: "thesisSessionId",
        targetKey: "id",
        as: "thesisSessionData",
      });
      Thesis.belongsTo(models.Council, {
        foreignKey: "councilId",
        targetKey: "id",
        as: "councilData",
      });

      Thesis.belongsTo(models.Allcode, {
        foreignKey: "resultId",
        targetKey: "code",
        as: "resultData",
      });
      Thesis.belongsTo(models.Allcode, {
        foreignKey: "councilStatusId",
        targetKey: "code",
        as: "councilStatusData",
      });
      Thesis.belongsTo(models.Allcode, {
        foreignKey: "thesisAdvisorStatusId",
        targetKey: "code",
        as: "thesisAdvisorStatusData",
      });

      // Quan hệ nhiều nhiều
      Thesis.belongsToMany(models.CouncilDetail, {
        through: models.Mark,
        foreignKey: "thesisId",
        as: "thesisData",
      });
      Thesis.hasMany(models.Mark, {
        foreignKey: "thesisId",
      });
    }
  }
  Thesis.init(
    {
      reportFile: DataTypes.STRING,
      totalScore: DataTypes.FLOAT,
      advisorMark: DataTypes.FLOAT,
      resultId: DataTypes.STRING,
      topicId: {type: DataTypes.INTEGER,unique: true,},
      studentId: DataTypes.INTEGER,
      thesisAdvisorId: DataTypes.INTEGER,
      thesisAdvisorStatusId: DataTypes.STRING,
      thesisSessionId: DataTypes.INTEGER,
      councilId: DataTypes.INTEGER,
      councilStatusId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Thesis",
      tableName: "theses",
    }
  );
  return Thesis;
};
