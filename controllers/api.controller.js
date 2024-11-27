const endpointsJson = require('../endpoints.json');
const { selectTopics } = require('../models/api.model');


const getApi = (req, res) => {
    res.status(200).send({ endpoints: endpointsJson });
};

const getTopics = (req, res, next) => {
    selectTopics()
      .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getApi, getTopics };