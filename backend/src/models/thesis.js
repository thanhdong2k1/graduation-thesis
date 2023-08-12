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
      Thesis.hasMany(models.Transcript,{
        foreignKey:"thesisId"
      })
      Thesis.hasMany(models.Comment,{
        foreignKey:"thesisId"
      })
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
      result: DataTypes.STRING,
      topicId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      thesisAdvisor: DataTypes.STRING,
      thesisAdvisorStatus: DataTypes.STRING,
      thesisSessionId: DataTypes.INTEGER,
      councilId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Thesis",
    }
  );
  return Thesis;
};
