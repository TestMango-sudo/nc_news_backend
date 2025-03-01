const db = require("../../db/connection");
const { commentData } = require("../data/test-data");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.articleLookUp = (articleData) => {
  const article_fetch= {};
  articleData.forEach(({ article_id, title }) => {
    article_fetch[title] = article_id;
  })
    return article_fetch
}




