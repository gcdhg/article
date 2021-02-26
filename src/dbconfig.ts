import Article from "./db/Models/Articles";
import Comment from "./db/Models/Comments";
import { SequelizeOptions } from "sequelize-typescript";

const development: SequelizeOptions = {
  database: "gcdhg",
  dialect: "mysql",
  username: "gcdhg",
  password: "12345",
  host: "localhost",
  models: [Article, Comment],
};

const test: SequelizeOptions = {
  database: "gcdhg-test",
  dialect: "mysql",
  username: "gcdhg",
  password: "12345",
  host: "localhost",
  models: [Article, Comment],
};

export { development, test };
