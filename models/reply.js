module.exports = function(sequelize, DataTypes){
  var reply = sequelize.define("reply", {
    board_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    group_number:{//같은 주제를 갖는 게시물의 고유번호. 부모글과 부모글로부터 파생된 모든 자식글은 같은 번호. group
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group_depth:{//원글에 대한 답글인지 , 답글에 대한 답글인지 구분하는 계층 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group_order:{//그룹내 순서
      type: DataTypes.INTEGER,
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
    tableName: "reply"
  });

   reply.associate = function(models){
    reply.belongsTo(models.board_crud, {
      foreignKey: 'board_id'
    })
  };

  return reply;
};