const { exec } = require("child_process");
const db = require("../models");

const synchronizeDB = async () => {
  try {
    // Drop database
    exec("npx sequelize-cli db:drop && npx sequelize-cli db:create", (error, stdout, stderr) => {
      if (error) {
        console.error("Unable to drop the database:", error);
        return;
      }

      console.log("Database dropped and create successfully.");

      // Sync models
      db.sequelize.sync({ force: true }).then(async () => {
        console.log("All models were synchronized successfully.");

        // Seed data
        exec(
          "npx sequelize-cli db:seed:all",
          (seedError, seedStdout, seedStderr) => {
            if (seedError) {
              console.error("Unable to seed the database:", seedError);
              return;
            }

            console.log("Database seeded successfully.");
          }
        );
      });
    });
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

synchronizeDB();
