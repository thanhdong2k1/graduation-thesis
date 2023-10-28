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
      // Thesis.hasMany(models.Transcript,{
      //   foreignKey:"thesisId"
      // })
      // Thesis.hasMany(models.Comment,{
      //   foreignKey:"thesisId"
      // })
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
      Thesis.belongsToMany(models.CouncilDetail, {
        through: models.Point,
        foreignKey: "thesisId",
        as: "thesisData",
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
    }
  }
  Thesis.init(
    {
      startDate: DataTypes.STRING,
      complateDate: DataTypes.STRING,
      thesisStartDate: DataTypes.STRING,
      thesisEndDate: DataTypes.STRING,
      reportFile: DataTypes.STRING,
      totalScore: DataTypes.STRING,
      resultId: DataTypes.STRING,
      topicId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
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
