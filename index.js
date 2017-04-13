const express = require('express');
const app = express();

const port = process.env.APP_PORT || 3000;
const root = '/brews';

const brews = [
  {
    id: "pourover",
    type: "Pour Over"
  },
  {
    id: "frenchpress",
    type: "French Press"
  },
  {
    id: "espresso",
    type: "Espresso"
  }
];

app.get(root, (req, res) => {
  res.send(brews);
});

app.get(`${root}/:id`, (req, res) => {
  let id = req.params.id;
  let brew = brews.find((brew) => {
    return brew.id === id;
  });

  if (!brew)
    return res.status(404).send();

  return res.send(brew);
});

app.listen(port);
console.log(`Listening on port: ${port}`);
