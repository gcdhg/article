import fetch from "node-fetch";
import database from "../../db/config/database";

describe("article fields", () => {
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

  it("comments field", async () => {
    let art: any = await database.models.Article.findOne();
    art = art.toJSON();

    await database.models.Comment.create({
      title: "not real general kenobi",
      articleId: art.id,
    });

    let query = `
      query {
        article(id: ${art.id}) {
          comments {
              id
          }
        }
      }`;

    let body = JSON.stringify({ query });

    const res = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    let DBcomments: any = await database.models.Comment.findAll({
      where: {
        articleId: art.id,
      },
      attributes: ["id"],
    });
    DBcomments = DBcomments.map((com) => com.toJSON());
    DBcomments = DBcomments.map((com) => com.id);

    expect(res.status).toBe(200);
    let graphComments: any = await res.json();
    graphComments = graphComments.data.article.comments;
    graphComments = graphComments.map((com) => com.id);

    expect(DBcomments.join(", ")).toBe(graphComments.join(", "));
  });
});
