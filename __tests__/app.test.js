const endpointsJson = require("../endpoints.json");
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
  test("200: Responds with an object listing all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        console.log(body, "<<<from test")
        body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number')
          expect(typeof article.title).toBe('string')
          expect(typeof article.body).toBe('string')
          expect(typeof article.created_at).toBe('string')
      });
    });
  })
})

