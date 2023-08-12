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
      Major.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
        // as: "genderData",
      });
      Major.hasMany(models.Department, {
        foreignKey: "majorId",
        // as: "genderData",
      });
      Major.hasMany(models.Topic, {
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
    }
  );
  return Major;
};
