require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mysql',
    url: process.env.DATABASE_URL,
    logging: false
  }
};
