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
      });
      Comment.belongsTo(models.Lecturer, {
        foreignKey: "thesisId",
        targetKey: "id",
      });
      Comment.belongsTo(models.Student, {
        foreignKey: "studentId",
        targetKey: "id",
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
    }
  );
  return Comment;
};
