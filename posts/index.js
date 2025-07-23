const { randomBytes } = require('crypto');
const chalk = require('chalk');
const express = require('express');
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  console.log(req.body);
  const { title } = req.body;
  // console.log(chalk.yellow(`${title}`));

  posts[id] = {
    id, title
  };

  await axios.post('http://localhost:4005/events', {
    type: "PostCreated",
    data: {
      id, title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(chalk.bgBlue.white.bold("Event Received:"), req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("v20");
  console.log(chalk.bgGreen.white.bold('Server listening on PORT 4000'));                             
});