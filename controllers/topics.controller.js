const endpointsJson = require('../endpoints.json');
const { selectTopics } = require('../models/topics.model');


const getTopics = (req, res, next) => {
    selectTopics()
      .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getTopics;