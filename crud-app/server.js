const express = require('express');
const app = express();
const PORT = 5000; // Changed from 3000 to 5000

app.use(express.static('public'));
app.use(express.json());

let items = [];
let id = 0;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: ++id, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name } = req.body;
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.name = name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(i => i.id !== itemId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
