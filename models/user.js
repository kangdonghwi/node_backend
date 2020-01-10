module.exports = (sequelize, DataTypes) => {
  let user = sequelize.define(
    "user",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      national: {
        allowNull: false,
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ponenumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      secu_pass: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "user"
    }
  );

  return user;
};
