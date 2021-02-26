import express, { NextFunction, Request, Response, urlencoded } from "express";
import morgan from "morgan";

import "reflect-metadata";
import database, { check } from "./config/database";
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import ArticleResolver from "./resolver/ArticleResolver";
import CommentResolver from "./resolver/CommentResolver";

import Article from "./Models/Articles";
import Comment from "./Models/Comments";

import DataLoader from "dataloader";

(async () => {
  const app = express();
  const path = "/graphql";
  database.sync({ force: true });
  await check();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ArticleResolver, CommentResolver],
    }),
    context: () => {
      return {
        commentsLoader: new DataLoader(async (rawArticles: any) => {
          let articles = rawArticles.map((a) => a.toJSON());

          const result: any = {};
          articles.forEach((article) => {
            result[article.id] = article;
          });

          return rawArticles.map((a) => result[a]);
        }),
      };
    },
  });

  server.applyMiddleware({ app, path });
  const port = process.env.PORT || 4000;

  app.listen({ port }, () =>
    console.log(
      `Server started at http://localhost:${port}${server.graphqlPath}`
    )
  );
})();

(async () => {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(urlencoded({ extended: true }));

  app.get(
    "/articles/all",
    async (req: Request, res: Response, next: NextFunction) => {
      const articles = await Article.findAll();
      res.status(200).json(articles);
    }
  );

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(new Error());
  });

  app.use((err, req: Request, res: Response, next: NextFunction) => {
    res.status(404).json(err);
  });
  const port = 8006;

  app.listen(port, () =>
    console.log(`rest server started at http://localhost:${port}`)
  );
})();
