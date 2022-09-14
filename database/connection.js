const knex = require("knex", {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: process.env.API_CONNECTION_PASSWORD,
    database: process.env.API_CONNECTION_DATABASE
  }
})

module.export = knex