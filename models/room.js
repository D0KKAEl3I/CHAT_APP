//랜덤함수
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('room', {
      roomname:{
          type:DataTypes.TEXT(),
          allowNull: false
      },
      password:{
          type:DataTypes.STRING(20),
          allowNull: true
      },
      code:{
          type:DataTypes.STRING(6),
          allowNull:false,
          unique:true,
          defaultValue:makeid(6)
      }
    }, {
      timestamps: true,
    });
  };
