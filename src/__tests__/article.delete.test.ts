import fetch from "node-fetch";
import database from "../db/config/database";

describe("article crud", () => {
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

  it("delete article", async () => {
    dbArt = await database.models.Article.create(variables);
    dbArt = dbArt.toJSON();

    const query = `
    mutation {
      deleteArticle (id: ${dbArt.id}) {
        id
        title
        body
      }
    }
    `;

    let body = JSON.stringify({ query });

    const res = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    expect(res.status).toBe(200);
    let json: any = await res.json();
    json = json.data.deleteArticle;

    const articles = await database.models.Article.findAll();
    expect(articles).toEqual(
      expect.not.arrayContaining([
        {
          id: Number(json.id),
          title: variables.title,
          body: variables.body,
        },
      ])
    );
    expect(json).toMatchObject(variables);
  });
});
