import { Sequelize } from "sequelize-typescript";
import Article from "../Models/Articles";
import Comment from "../Models/Comments";

const sequelize = new Sequelize({
  database: "gcdhg",
  dialect: "mysql",
  username: "gcdhg",
  password: "12345",
  host: "localhost",
  models: [Article, Comment],
});

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
