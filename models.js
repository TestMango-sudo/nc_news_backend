const db = require("./db/connection")


exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then((data) => { 
        return data.rows
    })
}