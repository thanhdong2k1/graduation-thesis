"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Point.belongsToMany(models.EvaluationCriteria, {
        through: models.PointCriteria,
        foreignKey: "pointId",
        as: "pointData",
      });
    }
  }
  Point.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // thesisId: DataTypes.INTEGER,
      // councilDetailId: DataTypes.INTEGER,
      totalPoint: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Point",
      tableName: "points",
    }
  );
  return Point;
};
