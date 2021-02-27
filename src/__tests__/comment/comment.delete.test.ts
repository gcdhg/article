import fetch from "node-fetch";
import database from "../../db/config/database";

describe("comment crud", () => {
  let dbArt;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      Origin: "http://localhost:8080",
    },
  };

  const variables = {
    title: "hello there",
    body: "general kenobi",
  };

  const comment = {
    title: "created comment",
  };

  it("delete comment", async () => {
    dbArt = await database.models.Article.create(variables);
    dbArt = dbArt.toJSON();

    /**
     * add comment to article
     */

    let query = `
    mutation {
      addComment (articleId: ${dbArt.id},title: "${comment.title}") {
        id
        title
      }
    }
    `;

    let body = JSON.stringify({ query });

    let res: any = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    expect(res.status).toBe(200);

    res = await res.json();
    res = res.data.addComment;
    /**
     * delete comment from article
     */

    query = `
    mutation {
      removeComment(id: ${res.id}) {
        id
        title
        articleId
      }
    }
    `;

    body = JSON.stringify({ query });

    let delComment: any = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    delComment = await delComment.json();
    delComment = delComment.data.removeComment;
    delComment.id = Number(delComment.id);

    let articles: any[] = await database.models.Article.findAll({
      include: database.models.Comment,
    });

    articles = articles.map((a) => a.toJSON());
    let article: any = articles.filter((a) => a.id === dbArt.id);
    article = article[0];

    article.comments.forEach((com) => {
      expect(com).not.toMatchObject(delComment);
    });
  });
});
