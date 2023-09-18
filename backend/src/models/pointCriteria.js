"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PointCriteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // PointCriteria.belongsTo(models.Thesis, {
      //   foreignKey: "thesisId",
      //   targetKey: "id",
      // });
      // PointCriteria.belongsTo(models.Lecturer, {
      //   foreignKey: "lecturerId",
      //   targetKey: "id",
      // });
      // PointCriteria.belongsTo(models.Council, {
      //   foreignKey: "councilId",
      //   targetKey: "id",
      // });
    }
  }
  PointCriteria.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // pointId: DataTypes.INTEGER,
      // evaluationCriteriaId: DataTypes.INTEGER,
      point: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PointCriteria",
      tableName: "point_criteria",
    }
  );
  return PointCriteria;
};
