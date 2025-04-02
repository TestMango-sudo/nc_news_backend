const express = require("express")
const endpoints = require("./endpoints.json")
const {handlePsqlErrors, handleCustomErrors, handleServerErrors} = require("./controllers/errorController")
const {getAllTopics, getArticleById, getAllArticles, getCommentsByArticleId, postNewCommentbyArticleID, patchArticleVotes, deleteCommentById, getAllUsers} = require("./controllers/controllers")
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints })
});

app.get("/api/users", getAllUsers)

app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postNewCommentbyArticleID)

app.patch("/api/articles/:article_id/", patchArticleVotes)

app.delete("/api/comments/:comment_id", deleteCommentById)

app.all("/*", (req, res, next) => {
    res.status(404).send({ msg: 'path not found' });
});

app.use(handlePsqlErrors)
    
app.use(handleCustomErrors)
    
app.use(handleServerErrors)

module.exports = app
