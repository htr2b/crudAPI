const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let todos = [];
let nextId = 1;

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = todos.find(t => t.id === id);
    if (!item) return res.status(404).json({ error: 'Bulunamadı' });
    res.json(item);
});

app.post('/todos', (req, res) => {
    const { title, completed = false } = req.body;
    if (!title) return res.status(400).json({ error: 'title gerekli' });
    const newTodo = { id: nextId++, title, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = todos.find(t => t.id === id);
    if (!item) return res.status(404).json({ error: 'Bulunamadı' });
    const { title, completed } = req.body;
    if (title !== undefined) item.title = title;
    if (completed !== undefined) item.completed = completed;
    res.json(item);
});

app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const before = todos.length;
    todos = todos.filter(t => t.id !== id);
    if (todos.length === before) return res.status(404).json({ error: 'Bulunamadı' });
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Todo API http://localhost:${PORT} üzerinde çalışıyor`);
});

