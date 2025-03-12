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

describe("POST: /api/articles/:article_id/comments", () => {
    test("200: Server responds with the passed in comment and author when successfully posted to the DB",() => {
        const newComment = {username: "rogersop", body: "What an interesting comment I have added."}
        return request(app)
            .post('/api/articles/2/comments').send(newComment)
            .expect(200)
            .then(({ body }) => {
                console.log(body)
                expect(body.comment).toEqual(newComment)
            })
    })
    test("400: Server responds with a message if article_id doesn't exist.",() => {
        const newComment = {username: "rogersop", body: "What an interesting comment I have added."}
        return request(app)
            .post('/api/articles/99/comments').send(newComment)
            .expect(400)
            .then(({ body }) => {
                console.log(body, "<<from test")
                expect(body.msg).toEqual('Key (article_id)=(99) is not present in table "articles".')
            })
    })
    test("400: Server responds with a message if user does not exist",() => {
        const newComment = {username: "clemfandango", body: "Yes, I can hear you clemfandango."}
        return request(app)
            .post('/api/articles/2/comments').send(newComment)
            .expect(400)
            .then(({ body }) => {
                console.log(body, "<<from test")
                expect(body.msg).toEqual('Key (author)=(clemfandango) is not present in table \"users\".')
            })
    })
})