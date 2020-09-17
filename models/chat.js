module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chat', {
      context:{
        type:DataTypes.TEXT(),
        allowNull:false
      }
    }, {
      timestamps: true,
    });
  };
