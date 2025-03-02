const db = require("../../db/connection");
const { commentData } = require("../data/test-data");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.articleLookUp = (article_dbCall) => {
  const newObj = {}
  data = article_dbCall.map(({ article_id, title }) => {
    newObj[title] = article_id
  })
  return newObj
}




