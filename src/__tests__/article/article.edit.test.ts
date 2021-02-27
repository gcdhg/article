import fetch from "node-fetch";
import database from "../../db/config/database";

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

  const varBefor = {
    title: "hello there",
    body: "general kenobi",
  };

  const variables = {
    title: "hello there edited",
    body: "general kenobi edited",
  };

  it("edit article", async () => {
    dbArt = await database.models.Article.create(varBefor);
    dbArt = dbArt.toJSON();

    const query = `
    mutation {
      editArticle (id: ${dbArt.id},title: "${variables.title}", body: "${variables.body}") {
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
    let json = await res.json();
    json = json.data.editArticle;
    expect(json).toMatchObject(variables);
  });
});
