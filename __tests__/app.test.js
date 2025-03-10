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
/* Set up your beforeEach & afterAll functions here */

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
    seed(data).then(()=>{
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
})
