const db = require("../connection")
const format = require("pg-format");
const { convertTimestampToDate, articleLookUp } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
        return db.query('DROP TABLE IF EXISTS comments;')
        .then(() => {
          return db.query('DROP TABLE IF EXISTS articles;');
        })
        .then(() => {
          return db.query('DROP TABLE IF EXISTS users;');
        })
        .then(() => {
          return db.query('DROP TABLE IF EXISTS topics;');
        })
        .then(() => {
          return createTopics(topicData);
        })
        .then(() => {
          return createUsers(userData);
        })
        .then(() => {
          return createArticles(articleData, topicData);
        })
        .then(() => {
          return createComments(commentData, userData, articleData);
        })
}

function createTopics(topicData) {
  return db.query(`CREATE TABLE topics(
    slug VARCHAR(20) PRIMARY KEY NOT NULL,
    description VARCHAR,
    img_url VARCHAR(1000)
    )`).then(() => {
    const topic_list = topicData.map((topic) => {
      return [topic.slug, topic.description, topic.img_url]
    });
    const formatted_topicList = format(
      `INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *`, topic_list)
    return db.query(formatted_topicList);
  })
}


function createUsers(userData) {
  return db.query(`CREATE TABLE users (
    username VARCHAR PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    avatar_url VARCHAR(1000))`).then(() => {
      const user_list = userData.map((user) => {
        return [user.username, user.name, user.avatar_url]
      });
      const formatted_userlist = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *`, user_list)
      return db.query(formatted_userlist)      
    })
}


function createArticles(articleData, userData, topicData) {
  return db.query(`CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY,
    title VARCHAR,
    topic VARCHAR REFERENCES topics(slug),
    author VARCHAR REFERENCES users(username),
    body TEXT,
    created_at TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000))`).then((title, topic, author, body, created_at, votes, article_img_url) => { 
      const article_list = articleData.map((article) => {
        article_new = convertTimestampToDate(article)
        return [article.title, article.topic, article.author, article.body, article_new.created_at, article.votes, article.article_img_url]
      })
      const formattedArticle_List = format(`INSERT INTO articles 
        (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`, article_list)
      return db.query(formattedArticle_List)
    });
}

function createComments(commentData, userData, formattedArticle_List) {
  return db.query(`CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT,
    votes INT DEFAULT 0,
    author VARCHAR REFERENCES users(username),
    created_at TIMESTAMP
     )`).then(() => {
    const articles_list = db.query("SELECT article_ID, title FROM articles").then((art1) => {
      const article_data = articleLookUp(art1.rows)
      console.log(article_data)
        const comments = commentData.map((comment) => {
          added_create = convertTimestampToDate(comment)
          return [article_data[comment.article_title], comment.body, comment.votes, comment.author, added_create.created_at]
        })
          const formatted_Comment_List = format(`INSERT INTO comments 
            (article_id, body, votes, author, created_at) VALUES %L RETURNING *`, comments)
        return db.query(formatted_Comment_List)

    })
  })
}


module.exports = seed;
