"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      

      // Sau
      Mark.belongsTo(models.CouncilDetail, {
        foreignKey: "councilDetailId",
        targetKey: "id",
        as: "councilDetailData",
      });
      Mark.belongsTo(models.Thesis, {
        foreignKey: "thesisId",
        targetKey: "id",
        as: "thesisData",
      });


      // Quan hệ nhiều nhiều
      Mark.belongsToMany(models.EvaluationCriteria, {
        through: models.MarkCriteria,
        foreignKey: "markId",
        as: "markData",
      });
      Mark.hasMany(models.MarkCriteria, {
        foreignKey: "markId",
      });
    }
  }
  Mark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // thesisId: DataTypes.INTEGER,
      // councilDetailId: DataTypes.INTEGER,
      totalMark: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Mark",
      tableName: "marks",
    }
  );
  return Mark;
};
