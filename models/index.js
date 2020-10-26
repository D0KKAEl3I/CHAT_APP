'use strict';

const Sequelize = require('sequelize'); 

const wkx = require('wkx')
Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
  return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}
Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
  return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}
Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
  return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}
Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
  return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);

db.Room = require('./room')(sequelize, Sequelize);

db.UserRoom = require('./userroom')(sequelize, Sequelize);
// db.Chat = require('./chat')(sequelize, Sequelize)

db.User.belongsToMany(db.Room, {through: db.UserRoom ,foreignKey:'roomId'});
db.Room.belongsToMany(db.User, {through: db.UserRoom ,foreignKey:'userId'});

db.UserRoom.associate = function(db) {
  db.UserRoom.belongsTo(db.User, {
  foreignKey: 'userId'
});
  db.UserRoom.belongsTo(db.Room, {
  foreignKey: 'roomId'
  })
};
  
// db.User.hasMany(db.Chat, {foreignKey: 'userId', sourceKey: 'id'});
// db.Room.hasMany(db.Chat, {foreignKey: 'roomId', sourceKey: 'id'});

module.exports = db;