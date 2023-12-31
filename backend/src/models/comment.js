"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Thesis, {
        foreignKey: "thesisId",
        targetKey: "id",
        as: "thesisData",
      });
      Comment.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        targetKey: "id",
        as: "lecturerData",
      });
      Comment.belongsTo(models.Student, {
        foreignKey: "studentId",
        targetKey: "id",
        as: "studentData",
      });
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING,
      thesisId: DataTypes.INTEGER,
      lecturerId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    }
  );
  return Comment;
};
