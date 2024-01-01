"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThesisSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      // Sauu
      ThesisSession.belongsTo(models.EvaluationMethod, {
        foreignKey: "evaluationMethodId",
        targetKey: "id",
        as: "evaluationMethodData",
      });
      ThesisSession.hasMany(models.Council, {
        foreignKey: "thesisSessionId",
      });
      ThesisSession.hasMany(models.Thesis, {
        foreignKey: "thesisSessionId",
      });
    }
  }
  ThesisSession.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      validMark: DataTypes.FLOAT,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      evaluationMethodId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ThesisSession",
      tableName: "thesis_session",
    }
  );
  return ThesisSession;
};
