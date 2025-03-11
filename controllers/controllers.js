const { fetchAllTopics, fetchArticleById } = require("../models/models")

exports.getAllTopics = (req, res) => {
    fetchAllTopics().then((data) => { 
        if (data.length === 0) {
            res.status(400).send({msg: 'No topics founds' })
        }
        res.status(200).send({topics: data})
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