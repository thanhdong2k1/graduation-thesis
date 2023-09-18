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
      });

      EvaluationCriteria.belongsToMany(models.Point, {
        through: models.PointCriteria,
        foreignKey: "evaluationCriteriaId",
      });
    }
  }
  EvaluationCriteria.init(
    {
      evaluationMethodId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
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
