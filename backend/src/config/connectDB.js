const { Sequelize } = require("sequelize");
const db = require("../models");

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("graduation-thesis-full", "root", null, {
  host: "localhost",
  dialect: "mysql",
  define: {
    // timestamps: true,
    // freezeTableName: true,
    raw: true,
  },
  logging: false,
});

const connectDB = async () => {
  try {
    // db.sequelize.sync({ force: true }).then(() => {
    // console.log("All models were synchronized successfully.");
    // });
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
