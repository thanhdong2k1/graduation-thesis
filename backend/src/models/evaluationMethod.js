"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EvaluationMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EvaluationMethod.hasMany(models.ThesisSession, {
        foreignKey: "evaluationMethodId",
      });
      EvaluationMethod.hasMany(models.EvaluationCriteria, {
        foreignKey: "evaluationMethodId",
      });
    }
  }
  EvaluationMethod.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EvaluationMethod",
      tableName: "evaluation_method",

    }
  );
  return EvaluationMethod;
};
