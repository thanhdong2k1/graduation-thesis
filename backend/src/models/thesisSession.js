"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThesisSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ThesisSession.hasMany(models.Council,{
        foreignKey:"thesisSessionId"
      })
    }
  }
  ThesisSession.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ThesisSession",
      tableName: "thesis_session",
    }
  );
  return ThesisSession;
};
