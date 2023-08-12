"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CouncilDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CouncilDetail.belongsTo(models.Allcode, {
        foreignKey: "positionId",
        targetKey: "code",
      });
      CouncilDetail.belongsTo(models.Council, {
        foreignKey: "councilId",
        targetKey: "id",
      });
      CouncilDetail.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        targetKey: "id",
      });
    }
  }
  CouncilDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "CouncilDetail",
      tableName: "council_detail",
    }
  );
  return CouncilDetail;
};
