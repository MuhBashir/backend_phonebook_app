const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("uuid");
const name = "Muhammad Bashir Ibrahim";

let persons = [];
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

app.get("/", (req, res) => {
  console.log(`hi ${name}`);
});

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<p>phonebook has info for ${persons.length}</p>
  
  <p>${Date()}</p>`);
});

// getting a single rsource

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((person) => person.id == id);
  res.status(200).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((person) => person.id !== id);
  res.status(200).json(person);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number can not be missing" });
  } else if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = { id: uuid.v4(), name: body.name, number: body.number };
  persons = persons.concat(person);
  res.status(200).json(person);
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  res.status(200).json(body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
