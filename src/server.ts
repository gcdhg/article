import express from "express";
import "reflect-metadata";
import database, { check } from "./config/database";
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import ArticleResolver from "./resolver/ArticleResolver";
import CommentResolver from "./resolver/CommentResolver";

(async () => {
  const app = express();
  const path = "/graphql";
  database.sync({ force: true });
  await check();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ArticleResolver, CommentResolver],
    }),
  });

  server.applyMiddleware({ app, path });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server started at http://localhost:4000${server.graphqlPath}`)
  );
})();
