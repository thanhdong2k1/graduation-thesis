"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Department.hasMany(models.Major, {
      //   foreignKey: "departmentId",
      //   // as: "positionData",
      // });
      // Department.hasMany(models.Lecturer, {
      //   foreignKey: "departmentId",
      //   // as: "positionData",
      // });
      // // Department.belongsToMany(models.Lecturer, {
      // //   foreignKey: "departmentId",
      // //   // as: "deanId",
      // // });

      //// Sauuuuuuuuuuuuuuuuuuuu
      Department.hasMany(models.Major, {
        foreignKey: "departmentId",
        onDelete: "SET NULL",
      });
      Department.hasMany(models.Lecturer, {
        foreignKey: "departmentId",
        onDelete: "SET NULL",
      });
      Department.belongsTo(models.Lecturer, {
        foreignKey: "deanId",
        targetKey: "id",
        as: "deanData",
      });
      Department.hasMany(models.Topic, {
        foreignKey: "departmentId",
        onDelete: "SET NULL",
      });
    }
  }
  Department.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      founding: DataTypes.STRING,
      deanId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Department",
      tableName: "departments",
    }
  );
  return Department;
};
