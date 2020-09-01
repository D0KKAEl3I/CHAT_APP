module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      first_name: {
          type: DataTypes.STRING(20),
          allowNull:false
      },
      last_name: {
          type: DataTypes.STRING(20),
          allowNull:false
      },
      hash_password: {
          type: DataTypes.TEXT(),
          allowNull:false
      },
      salt:{
        type: DataTypes.STRING(64),
        allowNull:false
      }
    }, {
      timestamps: true,
    });
  }; 