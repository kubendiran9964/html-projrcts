const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];
let idCounter = 1;

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: idCounter++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).end();
});

app.delete('/api/todos/completed', (req, res) => {
  todos = todos.filter(t => !t.completed);
  res.status(204).end();
});

app.delete('/api/todos/all', (req, res) => {
  todos = [];
  idCounter = 1;
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
