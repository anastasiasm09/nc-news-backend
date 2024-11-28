const express = require('express');
const app = express();
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./errors");
const { getApi, getTopics } = require('./controllers/api.controller');
const { getArticleById, getArticles, getComments, postCommentByArticleID, patchArticleVotes } = require('./controllers/articles.controller');

app.use(express.json());

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postCommentByArticleID);

app.patch("/api/articles/:article_id", patchArticleVotes);


app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;