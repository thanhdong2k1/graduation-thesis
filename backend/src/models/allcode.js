"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.Student, {
        foreignKey: "genderId",
        // as: "positionData",
      });
      Allcode.hasMany(models.Student, {
        foreignKey: "statusId",
        // as: "genderData",
      });
      Allcode.hasMany(models.Student, {
        foreignKey: "roleId",
        // as: "genderData",
      });

      Allcode.hasMany(models.Lecturer, {
        foreignKey: "genderId",
        // as: "positionData",
      });
      Allcode.hasMany(models.Lecturer, {
        foreignKey: "statusId",
        // as: "genderData",
      });
      Allcode.hasMany(models.Lecturer, {
        foreignKey: "roleId",
        // as: "genderData",
      });
      
      Allcode.hasMany(models.Topic, {
        foreignKey: "statusId",
      });

      Allcode.hasMany(models.Thesis, {
        foreignKey: "result",
      });
      Allcode.hasMany(models.Thesis, {
        foreignKey: "councilStatus",
      });
      Allcode.hasMany(models.Thesis, {
        foreignKey: "thesisAdvisorStatus",
      });
      
      Allcode.hasMany(models.Council, {
        foreignKey: "statusId",
      });
      // Allcode.hasMany(models.Council, {
      //   // through: models.CouncilDetail,
      //   foreignKey: "positionId",
      // });
    }
  }
  Allcode.init(
    {
      code: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
