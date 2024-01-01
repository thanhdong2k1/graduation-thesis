"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarkCriteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Quan hệ nhiều nhiều
      
      // Sau
      MarkCriteria.belongsTo(models.EvaluationCriteria, {
        foreignKey: "evaluationCriteriaId",
        targetKey: "id",
        as: "evaluationCriteriaData",
      });
      
      MarkCriteria.belongsTo(models.Mark, {
        foreignKey: "markId",
        targetKey: "id",
        as: "markData",
      });
    }
  }
  MarkCriteria.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // markId: DataTypes.INTEGER,
      // evaluationCriteriaId: DataTypes.INTEGER,
      mark: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "MarkCriteria",
      tableName: "mark_criteria",
    }
  );
  return MarkCriteria;
};
