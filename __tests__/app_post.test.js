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
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toEqual('requested item does not exist')
            })
    })
    test("400: Server responds with a message if user does not exist",() => {
        const newComment = {username: "clemfandango", body: "Yes, I can hear you clemfandango."}
        return request(app)
            .post('/api/articles/2/comments').send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toEqual('requested item does not exist')
            })
    })
    test("404: Server responds to an invalid article_id being passed in.",() => {
        const newComment = {username: "clemfandango", body: "Yes, I can hear you clemfandango."}
        return request(app)
            .post('/api/articles/mango/comments').send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toEqual('bad request')
            })
    })
    test("405: Server responds to a malformed request.",() => {
        const newComment = {usermango: "clemfandango", mango: "Yes, I can hear you clemfandango."}
        return request(app)
            .post('/api/articles/1/comments').send(newComment)
            .expect(405)
            .then(({ body }) => {
                expect(body.msg).toEqual('Incorrect parameters supplied')
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
    test("400: Server responds with a inc_votes  is missing from body of request",() => {
        const newVotes= { mango: 50 }
        return request(app)
            .patch('/api/articles/3').send(newVotes)
            .expect(405)
            .then(({ body }) => {
                expect(body.msg).toEqual("Body of request malformed ")
            })
    })


})
describe("DELETE: /api/comments/:comment_id", () => { 
    test("404: server responds with a message to indicate when a non-existent article_id has been passed.", () => { 
        return request(app)
            .delete('/api/comments/106')
            .expect((404))
            .then(({ body }) => {
                expect(body.msg).toEqual('no comment found with that ID.')
            })
    })
    test("204: server repsonds with 204 when item deleted.", () => { 
        return request(app)
            .delete('/api/comments/3')
            .expect((204))
            .then(({ body }) => {
                expect(body).toEqual({})
            })
    })
})