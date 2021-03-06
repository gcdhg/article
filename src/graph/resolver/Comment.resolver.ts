import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";

import Comment from "../type/model/Comments";
import CommentModel from "../../db/Models/Comments";
import ArticleModel from "../../db/Models/Articles";
import commentArgs from "../type/args/addComment.args";
import editCommentArgs from "../type/args/editComment.args";

@Resolver(Comment)
class CommentResolver {
  @Query((returns) => [Comment])
  async comments() {
    const comments = await CommentModel.findAll();
    return comments;
  }

  @Query((returns) => Comment)
  async comment(@Arg("id") id: number) {
    const comment = await CommentModel.findOne({
      where: {
        id: id,
      },
    });

    return comment;
  }

  @Mutation((returns) => Comment)
  async addComment(@Args() { title, articleId }: commentArgs) {
    try {
      const article = await ArticleModel.findOne({
        where: {
          id: articleId,
        },
      });

      const comment = await article.$create("Comment", {
        title: title,
        articleId,
      });

      return comment;
    } catch (err) {
      console.log(err);
      throw err();
    }
  }

  @Mutation((returns) => Comment)
  async removeComment(@Arg("id") id: number) {
    try {
      let article = await CommentModel.findOne({
        where: { id },
      });

      return await article.destroy();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Mutation((returns) => Comment)
  async editComment(@Args() { id, title }: editCommentArgs): Promise<Comment> {
    const comment = await CommentModel.findByPk(id);
    await comment.update({
      title,
    });
    return comment;
  }
}

export default CommentResolver;
