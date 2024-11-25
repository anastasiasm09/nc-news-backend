const express = require('express');
const app = express();
const getApi = require('./controllers/api.controller');

app.get('/api', getApi);
app.get('/api/topics', (req, res) => {
    console.log("GET /api/topics called");
    const topics = [
        {
          description: 'The man, the Mitch, the legend',
          slug: 'mitch'
        },
        {
          description: 'Not dogs',
          slug: 'cats'
        },
        {
          description: 'what books are made of',
          slug: 'paper'
        }
      ];
      res.status(200).json({topics});
});


module.exports = app;