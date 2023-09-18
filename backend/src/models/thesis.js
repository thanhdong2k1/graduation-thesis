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
      });
      Thesis.belongsTo(models.Lecturer, {
        foreignKey: "thesisAdvisor",
        targetKey: "id",
      });
      Thesis.belongsToMany(models.CouncilDetail, {
        through: models.Point,
        foreignKey: "thesisId",
      });
      Thesis.belongsTo(models.Topic, {
        foreignKey: "topicId",
        targetKey: "id",
      });
      Thesis.belongsTo(models.ThesisSession, {
        foreignKey: "thesisSessionId",
        targetKey: "id",
      });
      Thesis.belongsTo(models.Council, {
        foreignKey: "councilId",
        targetKey: "id",
      });

      Thesis.belongsTo(models.Allcode, {
        foreignKey: "result",
        targetKey: "code",
      });
      Thesis.belongsTo(models.Allcode, {
        foreignKey: "councilStatus",
        targetKey: "code",
      });
      Thesis.belongsTo(models.Allcode, {
        foreignKey: "thesisAdvisorStatus",
        targetKey: "code",
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
      result: DataTypes.STRING,
      topicId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      studentId: DataTypes.INTEGER,
      thesisAdvisor: DataTypes.INTEGER,
      thesisAdvisorStatus: DataTypes.STRING,
      thesisSessionId: DataTypes.INTEGER,
      councilId: DataTypes.INTEGER,
      councilStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Thesis",
    }
  );
  return Thesis;
};
