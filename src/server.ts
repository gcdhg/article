import express, { NextFunction, Request, Response, urlencoded } from "express";
import morgan from "morgan";

import "reflect-metadata";
import database, { check } from "./db/config/database";
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import ArticleResolver from "./graph/resolver/Article.resolver";
import CommentResolver from "./graph/resolver/Comment.resolver";

import Article from "./db/Models/Articles";
import Comment from "./db/Models/Comments";

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
        commentsLoader: new DataLoader(async (articleIds: any) => {
          let comments: any = await Comment.findAll({
            where: {
              articleId: articleIds,
            },
          });
          comments = comments.map((com) => com.toJSON());

          const result = {};
          comments.forEach((comment) => {
            result[comment.articleId] ||= [];
            result[comment.articleId].push(comment);
          });

          return articleIds.map((id) => result[id]);
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
