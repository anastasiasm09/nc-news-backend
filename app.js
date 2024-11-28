const express = require('express');
const app = express();
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./errors");
const getApi = require('./controllers/api.controller');
const getTopics = require('./controllers/topics.controller');

const { getArticleById, getArticles, getComments, postCommentByArticleID, patchArticleVotes, deleteCommentById } = require('./controllers/articles.controller');

app.use(express.json());

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postCommentByArticleID);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.delete("/api/comments/:comment_id", deleteCommentById);


app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

app.listen(3000, () => {
  console.log(`Server listening on port 3000`)
})

module.exports = app;