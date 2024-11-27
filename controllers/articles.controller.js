const { selectArticleById } = require('../models/articles.model');


exports.getArticleById = (req, res, next) => {
  const article_id = Number(req.params.article_id)
  
  if (isNaN(article_id)) {
    return next({ status: 400, msg: 'Invalid data type'})
  }

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
