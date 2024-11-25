const db = require('../db/connection');
const topics = require('../db/data/test-data/topics');


exports.selectTopics = () => {
    return db.query('SELECT slug, description FROM topics')
    .then((result) => {
        return result.rows;
    });
};