import { Sequelize } from "sequelize-typescript";
import { development, test } from "../../dbconfig";

const db = process.env.MODE === "test" ? test : development;

const sequelize = new Sequelize(db);

export const check = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

process.on("SIGINT", async () => {
  await sequelize.close();
  console.log("db connection closed");
  process.exit(0);
});

export default sequelize;
