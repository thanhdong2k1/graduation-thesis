"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Topic.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
        as:"departmentData"
      });

      Topic.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "code",
      });

      Topic.hasOne(models.Thesis, {
        foreignKey: "topicId",
      });
    }
  }
  Topic.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      statusId: DataTypes.STRING,
      departmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
