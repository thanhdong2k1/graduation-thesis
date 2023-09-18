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
      // Lecturer.belongsTo(models.Allcode, {
      //   foreignKey: "genderId",
      //   targetKey: "code",
      // });
      // Lecturer.belongsTo(models.Allcode, {
      //   foreignKey: "statusId",
      //   targetKey: "code",
      // });
      // Lecturer.belongsTo(models.Allcode, {
      //   foreignKey: "roleId",
      //   targetKey: "code",
      // });
      // Lecturer.belongsTo(models.Class, {
      //   foreignKey: "departmentId",
      //   targetKey: "id",
      // });
      // Lecturer.hasMany(models.Transcript, {
      //   foreignKey: "lecturerId",
      // });
      // Lecturer.hasMany(models.Comment, {
      //   foreignKey: "lecturerId",
      // });
      // Lecturer.belongsToMany(models.Council, {
      //   through: models.CouncilDetail,
      //   foreignKey: "lecturerId",
      // });

      // Sau
      Lecturer.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
      });
      Lecturer.hasMany(models.Department, {
        foreignKey: "deanId",
      });

      Lecturer.belongsToMany(models.Council, {
        through: models.CouncilDetail,
        foreignKey: "lecturerId",
      });
      
      Lecturer.hasMany(models.Thesis, {
        foreignKey: "thesisAdvisor",
      });

      Lecturer.hasMany(models.Comment, {
        foreignKey: "lecturerId",
      });

      Lecturer.belongsTo(models.Allcode, {
        foreignKey: "genderId",
        targetKey: "code",
      });
      Lecturer.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "code",
      });
      Lecturer.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "code",
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
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lecturer",
    }
  );
  return Lecturer;
};
