const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.HOST, // or wherever the db is hosted
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT, // The default port
});
