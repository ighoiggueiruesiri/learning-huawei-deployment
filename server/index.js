const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory todo storage
let todos = [];
let nextId = 1;

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const newTodo = { id: nextId++, text, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// PUT update todo (toggle complete)
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  todo.completed = completed;
  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});