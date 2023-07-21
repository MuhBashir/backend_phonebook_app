const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const name = "Muhammad Bashir Ibrahim";

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
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

const genetetedId = () => {
  return Math.floor(Math.random() * 1000000000000);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number can not be missing" });
  } else if (persons.includes(body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = { id: genetetedId(), name: body.name, number: body.number };

  persons.concat(person);

  res.status(200).json(body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
