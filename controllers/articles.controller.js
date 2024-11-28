const comments = require('../db/data/test-data/comments');
const { selectArticleById, selectArticles, selectComments, insertComment, updateArticleVotes, removeCommentById } = require('../models/articles.model');


exports.getArticleById = (req, res, next) => {
  const {article_id} = req.params;

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

exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (isNaN(article_id)) {
    return res
      .status(400)
      .send({ msg: "Bad Request: article_id must be a number" });
  }

  if (typeof inc_votes !== "number") {
    return res
      .status(400)
      .send({ msg: "Bad Request: inc_votes must be a number" });
  }

  updateArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};