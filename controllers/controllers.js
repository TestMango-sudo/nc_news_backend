const { errorMonitor } = require("supertest/lib/test")
const { fetchAllTopics, fetchArticleById, fetchAllArticles, fetchCommentsByArticleId, addCommentByArticleId, modifyVotesbyArticle, removeCommentById, fetchAllUsers } = require("../models/models")


exports.getAllUsers = (req, res) => { 
    console.log("getting users")
    fetchAllUsers().then((data) => { 
        if (data.length === 0) {
            res.status(400).send({msg: 'No users found' })
        }
        res.status(200).send({ users: data})
    })
}

exports.getAllTopics = (req, res) => {
    fetchAllTopics().then((data) => { 
        if (data.length === 0) {
            res.status(400).send({msg: 'No topics found' })
        }
        res.status(200).send({topics: data})
    })
}

exports.getAllArticles = (req, res) => { 
    const { sort_by, order, topic } = req.query
    fetchAllArticles(sort_by, order, topic).then((data) => { 
        if (data.length === 0) {
            res.status(400).send({ msg: 'No articles found' })
        } else {
            res.status(200).send({ articles: data })
        }
    })
}

exports.getArticleById = (req, res) => {
    const { id } = req.params   
    fetchArticleById(id).then((data) => {
        if (data.length > 0)
            res.status(200).send({ article: data[0] }) 
        else{res.status(400).send({msg: 'article not found'})}
    })
}

exports.getCommentsByArticleId = (req, res) => {
    const { article_id } = req.params
    fetchCommentsByArticleId(article_id).then((data) => {
        if (data.length === 0){
        res.status(400).send({ msg: 'No comments yet posted against this article.' })
    }
        else if (data.length > 0) {
            res.status(200).send({ comments: data })
        }
    })
}

exports.postNewCommentbyArticleID = (req, res, next) => {
    const { article_id } = req.params
    const { username, body } = req.body
    if (!username || !body) {
        console.log( "<<IM HERE")
        next({ status: 405, msg: "Incorrect parameters supplied" })
    }
    addCommentByArticleId(article_id, username, body).then((data) => { 
            res.status(201).send({comment_added: data})
    }).catch((err) => { 
        next(err.code)
    })
}

exports.patchArticleVotes = (req, res, next) => { 
    const { article_id } = req.params
    const votes = req.body.inc_votes
    if (votes === undefined || typeof votes !== 'number') {
        next({ status: 405, msg: 'Body of request malformed ' })
    }
    modifyVotesbyArticle(article_id, votes).then((data) => { 
        if (data.msg) {
            res.status(404).send(data)
        }
        else {
            res.status(201).send({article_Updated: data[0]})
        }
        
    }).catch((err) => {
        next(err)
     })
}

exports.deleteCommentById = (req, res, next) => { 
    const { comment_id } = req.params
    removeCommentById(comment_id).then((data) => {
        if (data.msg !== `Comment ${comment_id} deleted.`) { 
            res.status(404).send({msg: data.msg})
        }
        else {
            res.status(204).send({msg: ""})
        }
    }).catch((err) => {
        next(err.details)
     })
}
