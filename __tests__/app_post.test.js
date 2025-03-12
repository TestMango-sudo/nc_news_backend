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
            .expect(201)
            .then(({ body }) => {
                returnedComment = body.comment_added[0]
                expect(returnedComment.article_id).toBe(2)
                expect(returnedComment.author).toBe('rogersop')
                expect(returnedComment.comment_id).toBe(19)
                expect(typeof returnedComment.created_at).toBe('string')
            })
    })
    test("400: Server responds with a message if article_id doesn't exist.",() => {
        const newComment = {username: "rogersop", body: "What an interesting comment I have added."}
        return request(app)
            .post('/api/articles/99/comments').send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toEqual('Key (article_id)=(99) is not present in table "articles".')
            })
    })
    test("400: Server responds with a message if user does not exist",() => {
        const newComment = {username: "clemfandango", body: "Yes, I can hear you clemfandango."}
        return request(app)
            .post('/api/articles/2/comments').send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toEqual('Key (author)=(clemfandango) is not present in table \"users\".')
            })
    })
})

describe("PATCH: /api/articles/:article_id/", () => {
    test("201: Server responds with the article details showing the new number of votes passed in",() => {
        const newVotes= { inc_votes: 50 }
        return request(app)
            .patch('/api/articles/2').send(newVotes)
            .expect(201)
            .then(({ body }) => {
                const returnedArticle = body.article_Updated
                console.log(returnedArticle)
                expect(returnedArticle.article_id).toBe(2)
                expect(returnedArticle.author).toBe('icellusedkars')
                expect(typeof returnedArticle.created_at).toBe('string')
                expect(returnedArticle.votes).toBe(50)
            })
    })
     test("201: Server responds with the article details showing the new number of votes correctly if pass a negative figure",() => {
        const newVotes= { inc_votes: -50 }
        return request(app)
            .patch('/api/articles/1').send(newVotes)
            .expect(201)
            .then(({ body }) => {
                const returnedArticle = body.article_Updated
                expect(returnedArticle.article_id).toBe(1)
                expect(returnedArticle.author).toBe('butter_bridge')
                expect(typeof returnedArticle.created_at).toBe('string')
                expect(returnedArticle.votes).toBe(50)
            })
    })
    test("404: Server responds with a message if article_id doesn't exist.",() => {
        const newVotes= { inc_votes: 50 }
        return request(app)
            .patch('/api/articles/99').send(newVotes)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toEqual('Article ID not found')
            })
    })

})
 