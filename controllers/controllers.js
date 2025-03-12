const articles = require("../db/data/test-data/articles")
const { fetchAllTopics, fetchArticleById, fetchAllArticles, fetchCommentsByArticleId, addCommentByArticleId, modifyVotesbyArticle } = require("../models/models")

exports.getAllTopics = (req, res) => {
    fetchAllTopics().then((data) => { 
        if (data.length === 0) {
            res.status(400).send({msg: 'No topics found' })
        }
        res.status(200).send({topics: data})
    })
}

exports.getAllArticles = (req, res) => { 
    //console.log('Getting All Articles')
    fetchAllArticles().then((data) => { 
        if (data.length === 0) {
            res.status(400).send({msg: 'No articles found' })
        }
        res.status(200).send({articles: data})
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

exports.postNewCommentbyArticleID = (req, res) => {
    const { article_id } = req.params
    const  comment_info = req.body
    addCommentByArticleId(article_id, comment_info).then((data) => { 
        if (data.msg) {
            res.status(404).send({msg: data.msg})
        }
        else {
            res.status(201).send({comment_added: data})
        }
    })
}

exports.patchArticleVotes = (req, res) => { 
    const { article_id } = req.params
    const votes = req.body.inc_votes
    modifyVotesbyArticle(article_id, votes).then((data) => { 
        if (data.msg) {
            res.status(404).send(data)
        }
        else {
            res.status(201).send({article_Updated: data[0]})
        }
        
    })
}
