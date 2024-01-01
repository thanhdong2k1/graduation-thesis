"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EvaluationCriteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      EvaluationCriteria.belongsTo(models.EvaluationMethod, {
        foreignKey: "evaluationMethodId",
        targetKey: "id",
        as: "evaluationMethodData",
        onDelete: "CASCADE",
      });


      // Quan hệ nhiều nhiều
      EvaluationCriteria.belongsToMany(models.Mark, {
        through: models.MarkCriteria,
        foreignKey: "evaluationCriteriaId",
        as: "evaluationCriteriaData",
      });
      // EvaluationCriteria.hasMany(models.MarkCriteria, {
      //   foreignKey: "evaluationCriteriaId",
      // });
    }
  }
  EvaluationCriteria.init(
    {
      evaluationMethodId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      level: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EvaluationCriteria",
      tableName: "evaluation_criteria",
    }
  );
  return EvaluationCriteria;
};
