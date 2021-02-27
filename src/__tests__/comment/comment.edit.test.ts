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

  const commentBefore = {
    title: "comment",
  };

  const commentAfter = {
    title: "comment edit",
  };

  it("edit comment", async () => {
    dbArt = await database.models.Article.create(variables);
    dbArt = dbArt.toJSON();

    let query = `
    mutation {
      addComment (articleId: ${dbArt.id},title: "${commentBefore.title}") {
        id
        title
        articleId
      }
    }
    `;

    let body = JSON.stringify({ query });
    /**
     * create comment
     */
    let commentGraph: any = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });

    commentGraph = await commentGraph.json();

    /**
     * edit comment
     */

    query = `
    mutation {
      editComment (id: ${Number(commentGraph.data.addComment.id)},title: "${
      commentAfter.title
    }") {
        id
        title
        articleId
      }
    }
    `;

    body = JSON.stringify({ query });

    let commentEdited: any = await fetch("http://localhost:8080/graphql", {
      ...options,
      body,
    });
    
    expect(commentEdited.status).toBe(200);

    commentEdited = await commentEdited.json();
    commentEdited = commentEdited.data.editComment;

    expect(commentEdited).toMatchObject(commentAfter);

    commentEdited.id = Number(commentEdited.id);

    let articles: any[] = await database.models.Article.findAll({
      include: database.models.Comment,
    });

    articles = articles.map((a) => a.toJSON());
    let article: any = articles.filter((a) => a.id === dbArt.id);
    article = article[0];

    article.comments.forEach((com) => {
      expect(com).toMatchObject(commentEdited);
    });
  });
});
