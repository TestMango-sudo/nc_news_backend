const db = require("../db/connection")


exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then((data) => { 
        return data.rows
    })
}

exports.fetchAllArticles = () => {
    console.log('Getting all articles')
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC`)
        .then((data) => { 
            return data.rows
    }) 
}

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then((data) => {
        return data.rows
        })
}

