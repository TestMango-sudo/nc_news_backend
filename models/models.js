const db = require("../db/connection")
const { commentData } = require("../db/data/test-data")

exports.fetchAllUsers = () => {
      console.log("getting users")
    return db.query(`SELECT * FROM users`).then((data) => { 
        console.log (data.rows)
        return data.rows
    })
}

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

exports.fetchCommentsByArticleId = (article_id) => {
    console.log('getting comments')
    return db.query(`SELECT comment_id, votes, created_at, author, body, article_id FROM comments  WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
        .then((data) => {
            return data.rows
         })
}

exports.addCommentByArticleId = (article_id, commentData) => {
    return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`, [commentData.username, commentData.body, article_id]).then((result) => {
        return result.rows
    }).catch(err => {
        return {msg: err.detail}
    })
}

exports.modifyVotesbyArticle = (article_id, votes) => { 
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *', [votes, article_id]).then((data) => {
        if (data.rows.length > 0) {
            return data.rows
        }
        else return({msg: 'Article ID not found'})
    }).catch(err => {
        return { msg: err.detail }
    })
}

exports.removeCommentById = (comment_id) => { 
    return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]).then((data) => {
        if (data.rowCount === 0) {
            return ({msg: 'no comment found with that ID.'})
        }
         return ({ msg: `Comment ${comment_id} deleted.` })
        
    }).catch(err => {
        return { msg: err.detail }
    })
}