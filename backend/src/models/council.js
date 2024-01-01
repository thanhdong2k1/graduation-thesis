"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Council extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Sau
      Council.belongsTo(models.ThesisSession, {
        foreignKey: "thesisSessionId",
        targetKey: "id",
        as: "thesisSessionData",
      });
      Council.hasMany(models.Thesis, {
        foreignKey: "councilId",
      });
      

      Council.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "code",
        as: "statusData",
      });

      // Quan hệ nhiều nhiều
      Council.belongsToMany(models.Lecturer, {
        through: models.CouncilDetail,
        foreignKey: "councilId",
        as: "councilData",
      });
      Council.hasMany(models.CouncilDetail, {
        foreignKey: "councilId",
      });
    }
  }
  Council.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      statusId: DataTypes.STRING,
      thesisSessionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Council",
      tableName: "councils",
    }
  );
  return Council;
};
