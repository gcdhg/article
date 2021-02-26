import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Args,
} from "type-graphql";

import Article from "../type/Article";
import Comment from "../type/Comments";
import ArticleModel from "../Models/Articles";
import CommentModel from "../Models/Comments";
import addArticleArgs from "../type/args/addArticleArgs";
import editArticleArgs from "../type/args/editArticleArgs";

@Resolver((of) => Article)
class ArticleResolver {
  @Query((returns) => [Article])
  async arcticles() {
    return await ArticleModel.findAll();
  }

  @Query((returns) => Article)
  async arcticle(@Arg("id") id: number) {
    const user = await ArticleModel.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  @Mutation((returns) => Article)
  async addArcticle(
    @Args() { title, body }: addArticleArgs
  ): Promise<ArticleModel> {
    try {
      const articles: ArticleModel = await ArticleModel.create({
        title,
        body,
      });
      return articles;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Mutation((returns) => Article)
  async editArticle(
    @Args() { id, title, body }: editArticleArgs
  ): Promise<Article> {
    const article: ArticleModel = await ArticleModel.findByPk(id);
    await article.update({
      title,
      body,
    });
    return article;
  }

  @Mutation((returns) => Article)
  async deleteArticle(@Arg("id") id: number): Promise<any> {
    const article: ArticleModel = await ArticleModel.findByPk(id);
    await article.destroy();
    return article;
  }

  @FieldResolver()
  async comments(@Root() art: ArticleModel): Promise<Comment[]> {
    try {
      const json: any = art.toJSON();
      // const article: ArticleModel = await ArticleModel.findByPk(json.id);
      // const comment: CommentModel[] = await article.$get("comments");
      // const result: any = comment.map((i) => i.toJSON());

      // return result;

      const comments = await CommentModel.findAll({
        where: {
          articleId: json.id,
        },
      });
      const result: any = comments.map((i) => i.toJSON());
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default ArticleResolver;
