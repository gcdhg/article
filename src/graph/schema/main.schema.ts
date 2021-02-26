import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import ArticleResolver from "../resolver/Article.resolver";
import CommentResolver from "../resolver/Comment.resolver";

export default (): Promise<GraphQLSchema> => {
  const schema: Promise<GraphQLSchema> = buildSchema({
    resolvers: [ArticleResolver, CommentResolver],
  });
  return schema;
};
