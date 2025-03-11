const articles = require("../db/data/test-data/articles")
const { fetchAllTopics, fetchArticleById, fetchAllArticles, fetchCommentsByArticleId } = require("../models/models")

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

