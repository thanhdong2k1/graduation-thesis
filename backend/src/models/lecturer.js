"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Sau
      Lecturer.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
        as: "departmentData",
      });
      Lecturer.hasMany(models.Department, {
        foreignKey: "deanId",
        onDelete: "SET NULL",
      });
      
      Lecturer.hasMany(models.Thesis, {
        foreignKey: "thesisAdvisorId",
        onDelete: "SET NULL",
      });

      Lecturer.belongsTo(models.Allcode, {
        foreignKey: "genderId",
        targetKey: "code",
        as: "genderData",
      });
      Lecturer.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "code",
        as: "statusData",
      });
      Lecturer.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "code",
        as: "roleData",
      });

      // Quan hệ nhiều nhiều
      Lecturer.belongsToMany(models.Council, {
        through: models.CouncilDetail,
        foreignKey: "lecturerId",
        as: "lecturerData",
      });
      Lecturer.hasMany(models.CouncilDetail, {
        foreignKey: "lecturerId",
      });
    }
  }
  Lecturer.init(
    {
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      code: { type: DataTypes.STRING, unique: true },
      fullName: DataTypes.STRING,
      numberPhone: { type: DataTypes.STRING, unique: true },
      birthday: DataTypes.STRING,
      address: DataTypes.STRING,
      genderId: DataTypes.STRING,
      roleId: DataTypes.STRING,
      statusId: DataTypes.STRING,
      departmentId: DataTypes.INTEGER,
      image: DataTypes.BLOB,
      permissions: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lecturer",
      tableName: "lecturers",
    }
  );
  return Lecturer;
};
