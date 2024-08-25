const { Sequelize } = require('sequelize');
const config = require('./src/config/config');

const sequelize = new Sequelize(config.development.url, {
  dialect: 'mysql'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./src/models/user')(sequelize, Sequelize);
db.Task = require('./src/models/task')(sequelize, Sequelize);

db.User.hasMany(db.Task);
db.Task.belongsTo(db.User);

module.exports = db;
