"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transcript extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transcript.belongsTo(models.Thesis, {
        foreignKey: "thesisId",
        targetKey: "id",
      });
      Transcript.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        targetKey: "id",
      });
      Transcript.belongsTo(models.Council, {
        foreignKey: "councilId",
        targetKey: "id",
      });
    }
  }
  Transcript.init(
    {
      score: DataTypes.STRING,
      thesisId: DataTypes.INTEGER,
      lecturerId: DataTypes.INTEGER,
      councilId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transcript",
    }
  );
  return Transcript;
};
