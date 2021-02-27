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

  const variables = {
    title: "hello there",
    body: "general kenobi",
  };

  it("get random field", async () => {
    let art: any = await database.models.Article.findOne();
    art = art.toJSON();

    let query = `
      query {
        article(id: ${art.id}) {
          randomfield
        }
      }`;

    let body = JSON.stringify({ query });

    const res = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    let articles: any = await database.models.Article.findAll();
    articles = articles.map((a) => a.toJSON());

    expect(res.status).toBe(200);
    let json: any = await res.json();
    json = json.data.article.randomfield;
    expect(json[0]).not.toEqual(json[1]);

    json.forEach((index) => {
      const found = articles.filter((a) => a.id === index);
      expect(found).toHaveLength(1);
    });
  });
});
