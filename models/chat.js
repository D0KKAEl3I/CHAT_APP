module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chat', {
      context:{
        allowNull:false,
      }
    }, {
      timestamps: true,
    });
  };
