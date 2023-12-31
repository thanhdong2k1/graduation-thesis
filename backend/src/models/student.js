"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Sauu
      Student.belongsTo(models.Class, {
        foreignKey: "classId",
        targetKey: "id",
        as: "classData",
      });
      Student.hasMany(models.Thesis, {
        foreignKey: "studentId",
      });
      Student.hasMany(models.Comment, {
        foreignKey: "studentId",
      });

      Student.belongsTo(models.Allcode, {
        foreignKey: "genderId",
        targetKey: "code",
        as: "genderData",
      });
      Student.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "code",
        as: "roleData",
      });
      Student.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "code",
        as: "statusData",
      });
    }
  }
  Student.init(
    {
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      code: { type: DataTypes.STRING, unique: true },
      fullName: DataTypes.STRING,
      numberPhone: { type: DataTypes.STRING, unique: true },
      birthday: DataTypes.STRING,
      address: DataTypes.STRING,
      genderId: DataTypes.STRING,
      statusId: DataTypes.STRING,
      classId: DataTypes.INTEGER,
      roleId: DataTypes.STRING,
      image: DataTypes.BLOB,
      permissions: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Student",
      tableName: "students",
    }
  );
  return Student;
};
