const mysql = require('mysql')
const mysqlConfig = require('./config')

const pool = mysql.createPool(mysqlConfig);

module.exports = pool