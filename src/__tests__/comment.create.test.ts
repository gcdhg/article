import fetch from "node-fetch";
import database from "../db/config/database";

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
    title: "hello there edited",
    body: "general kenobi edited",
  };

  const comment = {
    title: "created comment",
  };

  it("create comment", async () => {
    dbArt = await database.models.Article.create(variables);
    dbArt = dbArt.toJSON();

    const query = `
    mutation {
      addComment (articleId: ${dbArt.id},title: "${comment.title}") {
        id
        title
      }
    }
    `;

    let body = JSON.stringify({ query });

    const res = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    expect(res.status).toBe(200);
    let json = await res.json();
    json = json.data.addComment;
    expect(json).toMatchObject(comment);

    json.id = Number(json.id);

    let articles: any[] = await database.models.Article.findAll({
      include: database.models.Comment,
    });

    articles = articles.map((a) => a.toJSON());
    let article: any = articles.filter((a) => a.id === dbArt.id);
    article = article[0];

    article.comments.forEach((com) => {
      expect(com).toMatchObject(json);
    });
  });
});
