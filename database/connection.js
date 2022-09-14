const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: process.env.API_CONNECTION_PASSWORD || "rska2022",
    database: process.env.API_CONNECTION_DATABASE || "apiusers"
  }
})

module.exports = knex