require("dotenv").config()

module.exports = {
  DB_DIALECT: process.env.SERVER_DB_DIALECT,
  DB_HOST: process.env.SERVER_DB_HOST,
  DB_PORT: process.env.SERVER_DB_PORT,
  DB_NAME: process.env.SERVER_DB_DATABASE_NAME,
  DB_USER: process.env.SERVER_DB_USER,
  DB_PASSWORD: process.env.SERVER_DB_PASSWORD,
}
