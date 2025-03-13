const endpointsJson = require("../endpoints.json")
const request = require("supertest")
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data");


beforeEach(()=>{
    return seed(data);
})

afterAll(()=>{
   return db.end();
})


describe("GET: /notanendpoint", () => {
    test("200: server responds with path not found when an incorrect endpoint is used.'",() => {
        return request(app)
            .get('/api/notanendpoint')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('path not found')
            })
    })
})
describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe('GET /api/topics', () => {
  test("200: Responds with an object listing all topics with a slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe('string')
          expect(typeof topic.description).toBe('string')
        });
      });
    })
  })

describe("GET /api/articles/:id", () => {
  test("200: Responds with an article by id for the number passed in.", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const article = body.article
        expect(article.article_id).toBe(2);
        expect(article.author).toBe('icellusedkars')
        expect(article.topic).toBe('mitch')
        expect(typeof article.article_img_url).toBe('string')
      });
  });
  test("400: Responds with an error if the article is not found.", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(400)
      .then(({ body} ) => {
        expect(body.msg).toEqual('article not found');
      });
  });
 
});
describe('GET /api/articles', () => {
  test("200: Responds with an object listing all articles and has comment count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number')
          expect(typeof article.title).toBe('string')
          expect(typeof article.topic).toBe('string')
          expect(typeof article.created_at).toBe('string')
          expect(typeof article.comment_count).toBe('number')
      });
    });
  })
  test("200: Responds with an object listing all articles sorted by requested field", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number')
          expect(typeof article.title).toBe('string')
          expect(typeof article.topic).toBe('string')
          expect(typeof article.created_at).toBe('string')
      });
    });
  })
  test("200: Responds with an object listing all articles sorted by requested field and ordered via request", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=ASC")
      .expect(200)
      .then(({ body }) => {
        console.log(body.articles, "<<FROM TEST")
        body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number')
          expect(typeof article.title).toBe('string')
          expect(typeof article.topic).toBe('string')
          expect(typeof article.created_at).toBe('string')
      });
    });
  })
})


describe('GET /api/articles/:article_id/comments', () => {
  test("400: responds with an error message when the given article has no comment", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('No comments yet posted against this article.')
      })
  });
})
describe ('GET /api/articles/:article_id/comments', () => {
  test("200: responds with an array of comments for the given article_id of which each comment should have comment_id, vote, created_at, author, body and article_id", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(typeof comment.author).toBe('string')
          expect(typeof comment.votes).toBe('number')
          expect(comment.article_id).toBe(9)
        })
      });
  })
})
describe ('GET /users', () => {
  test("200: responds with an array of users. Each user should contain the following fields: username, name and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.users.forEach((user) => {
          expect(typeof user.username).toBe('string')
          expect(typeof user.name).toBe('string')
          expect(typeof user.avatar_url).toBe('string')
        })
      });
  })
})

