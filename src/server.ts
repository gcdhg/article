import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer, gql } from "apollo-server-express";

const app = express();
const path = "/graphql";

const server = new ApolloServer({});

server.applyMiddleware({ app, path });

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server started at http://localhost:4000${server.graphqlPath}`)
);
