const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [];

app.get('/items', (req, res) => {
    res.json(items)
})

app.get('/items/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = items.find(i => i.id === id)
    if (!item) return res.status(404).json({ error: 'there is no item in items' })
    res.json(item)
})

app.post('/items', (req, res) => {
    const { name } = req.body
    const newItem = {
        id: items.length + 1, name
    }
    items.push(newItem)
    res.status(201).json(newItem)
})

app.put('/items/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = items.find(i => i.id === id)
    item.name = req.body.name
    res.json(item);
})

app.delete('/items/:id', (req, res) => {
    const id = Number(req.params.id)
    items[id - 1] = null
    res.json(items)
    res.status(201)
})



app.listen(PORT, () => {
    console.log(`CRUD API works on port localhost:${PORT}`);
});
