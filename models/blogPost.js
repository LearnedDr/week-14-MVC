const { Model, DataTypes, INTEGER, STRING } = require("sequelize");
const sequelize = require("../config/connection");

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT,
      defaultValue: "...",
      allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
    },
  },
  {
    sequelize,
    createdAt: true,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);

module.exports = BlogPost;