const checkArticleExists = async (article_id) => {
  const dbOutput = await db.query(
    "SELECT * FROM article WHERE article_id = $1;",
    [article]
  );
  if (dbOutput.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }
};

const checkUserExists = async (user) => {
  const dbOutput = await db.query(
    "SELECT * FROM users WHERE username = $1;",
    [user]
  );
  if (dbOutput.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }
};

exports.module = { checkArticleExists, checkUserExists }