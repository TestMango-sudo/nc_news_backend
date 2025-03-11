const db = require("../db/connection")


exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then((data) => { 
        return data.rows
    })
}

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then((data) => {
        return data.rows
        })
}