const express = require("express")
const endpoints = require("./endpoints.json")
const {handlePsqlErrors, handleserverError} = require("./controllers/errorController")
const {getAllTopics, getArticleById, getAllArticles, getCommentsByArticleId, postNewCommentbyArticleID, patchArticleVotes} = require("./controllers/controllers")

const app = express()
app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints })
});

app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postNewCommentbyArticleID)

app.patch("/api/articles/:article_id/", patchArticleVotes)

app.all("/*", (req, res, next) => {
    res.status(404).send({ msg: 'path not found' });
});

app.use(handlePsqlErrors)

app.use(handleserverError)

module.exports = app
