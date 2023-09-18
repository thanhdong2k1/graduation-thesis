"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Block.hasMany(models.Class, {
        foreignKey: "blockId",
      });
    }
  }
  Block.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Block",
    }
    
  );
  return Block;
};
