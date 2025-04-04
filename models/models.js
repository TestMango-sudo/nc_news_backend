const db = require("../db/connection")
const { sort } = require("../db/data/test-data/articles")
const {} = require("../controllers/utils")

exports.fetchAllUsers = () => {
      console.log("getting users")
    return db.query(`SELECT * FROM users`).then((data) => { 
        return data.rows
    })
}

exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then((data) => { 
        return data.rows
    })
}

exports.fetchAllArticles = (sort_by, order, topic) => {
    let queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY $1 DESC`
    let queryOrder = 'DESC'
    let sortField = 'created_at'
    let queryString1 = `SELECT * FROM articles `
    let bindParameters = []
    if (sort_by) {
        sortField = `${sort_by}`
    }
    if (order) {
        queryOrder = `${order}`
    }
    if (topic) {
        queryString1 = queryString1 + `WHERE topic = $1 `
        bindParameters= [topic]
    }
    if (sort_by === undefined && order === undefined && topic === undefined) { 
        return db.query(queryString,[sort_by]).then((data) => { 
            return data.rows
    }) 
    }
    else {
        queryString1 = queryString1 + `ORDER BY ${sortField} ${queryOrder}`
        return db.query(queryString1,bindParameters).then((data) => { 
            return data.rows
    }) 
    }   
}

exports.fetchArticleById = (article_id) => {
    // return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then((data) => {
    //     return data.rows
    //     })
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.body, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id`, [article_id]).then((data) => { 
        return data.rows
    })
}

//
exports.fetchArticlesByTopic= (topic) => {
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.body, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.topic = $1 GROUP BY articles.article_id`, [topic]).then((data) => { 
        return data.rows
    })
}
//

exports.fetchCommentsByArticleId = (article_id) => {
    console.log('getting comments')
    return db.query(`SELECT comment_id, votes, created_at, author, body, article_id FROM comments  WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
        .then((data) => {
            return data.rows
         })
}

exports.addCommentByArticleId = (article_id, username, body) => {
    return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`, [username, body, article_id]).then((result) => {
        return result.rows
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