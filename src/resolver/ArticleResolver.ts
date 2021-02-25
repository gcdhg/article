import { Resolver, Query, Mutation, Arg } from "type-graphql";

import Article from "../type/Article";
import ArticleModel from "../Models/Articles";

@Resolver(Article)
class ArticleResolver {
  @Query((returns) => [Article])
  async users() {
    return await ArticleModel.findAll();
  }

  @Query((returns) => Article)
  async arcticles(@Arg("id") id: number) {
    const user = await ArticleModel.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  @Mutation((returns) => Article)
  async arcticle(
    @Arg("title") title: string,
    @Arg("body") body: string
  ): Promise<ArticleModel> {
    try {
      const u: ArticleModel = await ArticleModel.create({
        title,
        body,
      });
      return u;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default ArticleResolver;
