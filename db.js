require('dotenv').config();
const db_name = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
const db_username = process.env.DB_USERNAME;


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(db_name, db_username, null, {
    host: db_host,
    dialect: 'mysql'
});

module.exports = { sequelize };
