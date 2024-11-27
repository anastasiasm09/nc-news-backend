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
        throw { status: 404, msg: 'Article not found' };
    }
    return rows[0];
  });
};

exports.selectArticles = (sort_by = "created_at", order = "ASC") => {
    const validSortBy = [
      "author",
      "title",
      "article_id",
      "topic",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ];

    const validOrders = ["ASC", "DESC"]

    if (!validSortBy.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'Invalid sort_by query' })
    }

    if (!validOrders.includes(order)) {
        return Promise.reject({ status: 400, msg: 'Invalid order query' })
    }
  
    let sqlQuery = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.article_img_url, articles.votes,
    COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}`;

    return db.query(sqlQuery).then(({ rows }) => {
        if (rows.length === 0) {
            throw { status: 404, msg: "No articles found" };
        }
        return rows;
    });
}