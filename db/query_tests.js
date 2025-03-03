const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/development-data/index')

async function getUSers() {
    await seed(data)
    return db.query(`SELECT * from users`)
}

async function getLowVotes() {
    await seed(data)
    return db.query(`SELECT * FROM comments WHERE votes < 0`)
}

 // Get all of the users
// getUSers().then((data) => { 
//     console.log(data.rows)
// })

getLowVotes().then((data) => { 
    console.log(data.rows)
})

    // Get all of the articles where the topic is coding
    // Get all of the comments where the votes are less than zero
    // Get all of the topics
    // Get all of the articles by user grumpy19
    // Get all of the comments that have more than 10 votes.