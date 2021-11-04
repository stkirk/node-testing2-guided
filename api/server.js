const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/id", (req, res) => {
  res.end();
});

function validateHobbit(req, res, next) {
  if (!req.body.name) {
    res.status(422).json({ message: "must have name property" });
  } else next();
}

server.post("/hobbits", validateHobbit, (req, res) => {
  Hobbits.insert(req.body)
    .then((hobbit) => {
      res.status(201).json(hobbit);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.delete("/hobbits/:id", (req, res) => {
  res.end();
});

server.put("/hobbits/:id", (req, res) => {
  res.end();
});

module.exports = server;
