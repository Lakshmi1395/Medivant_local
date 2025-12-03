require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",

    migrationStorageTableName: "migrations",

    migrations: {
      path: path.join(__dirname, "..", "migrations"),
      pattern: /\.js$/, // keep .js or change to .ts as needed
    },

    seederStorage: "sequelize",
    seederStorageTableName: "seeders",
  },
};

