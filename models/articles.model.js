const db = require('../db/connection');



exports.selectArticleById = (article_id) => {
    let sqlQuery = 'SELECT * FROM articles';
    const queryValues = [];

    if (article_id) {
        sqlQuery += ' WHERE article_id = $1';
        queryValues.push(article_id);
    }

    return db.query(sqlQuery, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
        console.log(rows.length)
        throw { status: 404, msg: 'Article not found' };
    }
    return rows[0];
  });
};