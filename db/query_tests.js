const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/development-data/index')


seed(data).then(() => {
    //Get All Users
    db.query(`SELECT * from users`).then((data) => {
        console.log(data.rows)
    })
    /*
    //Get all of the articles where the topic is coding
        db.query(`SELECT * FROM articles where topic = 'coding'`)
        .then((data) => {
        console.log(data.rows)
    })

    // // Get all of the comments where the votes are less than zero
    db.query(`SELECT * FROM comments WHERE votes < 0`).then((data) => {
    console.log(data.rows)
    })

    // Get all of the topics
    db.query(`SELECT * FROM topics`).then((data) => {
        console.log({topics : data.rows})
        })
    
    // Get all of the articles by user grumpy19
    db.query("SELECT * FROM articles where author = 'grumpy19'").then((data) => {
        console.log({GrumpysArticles : data.rows})
        })

    // Get all of the comments that have more than 10 votes.
    db.query(`SELECT * FROM comments WHERE votes > 10`).then((data) => {
        console.log({topics : data.rows})
        }) */
})
