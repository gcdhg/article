import fetch from "node-fetch";
import database from "../../db/config/database";

describe("article crud", () => {
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

  const query = `
    mutation {
      addArticle(title: "${variables.title}", body: "${variables.body}") {
        id
        title
        body
      }
    }
    `;

  let body = JSON.stringify({ query });

  it("create article", async () => {
    const res = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    expect(res.status).toBe(200);
    let json = await res.json();
    json = json.data.addArticle;

    let article: any = await database.models.Article.findOne({
      where: { id: json.id },
    });

    article = article.toJSON();
    article.id = article.id.toString();
    expect(article).toMatchObject(json);
    expect(json).toMatchObject(variables);
  });
});
