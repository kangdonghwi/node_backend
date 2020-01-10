'use strict';
module.exports = function(sequelize, DataTypes){
  var board_crud = sequelize.define("board_crud", {
    number:{
      filed: "number",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      filed: "title",
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    name: {
      field: "name",
      type: DataTypes.STRING(30),
      allowNull: false
    },
    content: {
      field: "content",
      type: DataTypes.TEXT,
      allowNull: false
    },
    write_date: {
      field: "write_date",
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "board_crud"
  });
  board_crud.associate = function (models) {
    board_crud.hasMany(models.reply);
  };
  return board_crud;
};