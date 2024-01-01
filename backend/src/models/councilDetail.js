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

      // Sauu
      CouncilDetail.belongsTo(models.Allcode, {
        foreignKey: "positionId",
        targetKey: "code",
        as: "positionData",
      });


      CouncilDetail.belongsTo(models.Council, {
        foreignKey: "councilId",
        targetKey: "id",
        as: "councilData",
      });
      CouncilDetail.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        targetKey: "id",
        as: "lecturerData",
      });

      // Quan hệ nhiều nhiều
      CouncilDetail.belongsToMany(models.Thesis, {
        through: models.Mark,
        foreignKey: "councilDetailId",
        as: "councilDetailData",
      });
      CouncilDetail.hasMany(models.Mark, {
        foreignKey: "councilDetailId",
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
      // councilId:DataTypes.INTEGER,
      // lecturerId:DataTypes.INTEGER,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CouncilDetail",
      tableName: "council_detail",
    }
  );
  return CouncilDetail;
};
