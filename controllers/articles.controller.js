const comments = require('../db/data/test-data/comments');
const { selectArticleById, selectArticles, selectComments, insertComment } = require('../models/articles.model');


exports.getArticleById = (req, res, next) => {
  const article_id = Number(req.params.article_id)
  
  if (isNaN(article_id)) {
    return res.status(400).send({msg: 'Invalid data type'})
  }

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order } = req.query;

  selectArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const {article_id} = req.params;

  if (isNaN(article_id)) {
    return res.status(400).send({msg: 'Invalid article_id'})
  }

  selectArticleById(article_id)
  .then(() => {
    return selectComments(article_id)
  })
  .then((comments) => {
    res.status(200).send({ comments })
  })
  .catch(next)
};

exports.postCommentByArticleID = (req, res, next) => {

  const { article_id } = req.params;
  const { username, body } = req.body;


  insertComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next)
};