"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Class.belongsTo(models.Block, {
        foreignKey: "blockId",
        targetKey: "id",
        as: "blockData",
      });

      Class.belongsTo(models.Major, {
        foreignKey: "majorId",
        targetKey: "id",
        as: "majorData",
      });

      Class.hasMany(models.Student, {
        foreignKey: "classId",
      });

    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      majorId: DataTypes.INTEGER,
      blockId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
