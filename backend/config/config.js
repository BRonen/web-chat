require('dotenv').config()

module.exports = {
  development: {
    dialect:  'sqlite',
    storage:  './temp/database.sqlite',
    logging:  console.log,
  },
  production: {
    database: process.env.DB_DTBS,
    username: process.env.DB_USER,
    password: process.env.DB_PSWD,
    host:     process.env.DB_HOST,
    dialect:  process.env.DB_DLCT,
    logging:  false,
    ssl: true, 
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  },
}