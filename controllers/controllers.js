const { fetchAllTopics, fetchArticleById, fetchAllArticles, fetchCommentsByArticleId, addCommentByArticleId, modifyVotesbyArticle, removeCommentById, fetchAllUsers } = require("../models/models")

exports.getAllUsers = (req, res) => { 
    console.log("getting users from CONTROLLER")
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
    const { sort_by, order} = req.query
    fetchAllArticles(sort_by, order).then((data) => { 
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

exports.deleteCommentById = (req, res) => { 
    const { comment_id } = req.params
    removeCommentById(comment_id).then((data) => {
        console.log(data, "<<FROM CONTROLLER")
        if (data.msg === `Comment ${comment_id} deleted.`) { 
            res.status(204).send({msg: ""})
        }
        else {
            res.status(404).send({ data })
        }
    })
}
