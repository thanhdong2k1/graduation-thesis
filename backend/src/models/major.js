"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Sauu
      Major.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
        as: "departmentData",
      });
      Major.hasMany(models.Class, {
        foreignKey: "majorId",
      });
    }
  }
  Major.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      departmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Major",
      tableName: "majors",
    }
  );
  return Major;
};
