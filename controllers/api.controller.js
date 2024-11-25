//const { end } = require('../db/connection');
const topics = require('../db/data/test-data/topics');
const endpointsJson = require('../endpoints.json');
const { selectTopics } = require('../models/app.model');


function getApi(req, res) {
    res.status(200).send({ endpoints: endpointsJson });
};

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch((err) => {
        next(err);
    });
};

module.exports = getApi;