const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
let items = []

//GET
app.get('/items', (req, res) => {
    res.json(items);
})

//GETID
app.get('/items/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = items.find(i => i.id === id)
    res.json(item)
})

//POST
app.post('/items', (req, res) => {
    const { name } = req.body
    const newItem = {
        id: items.length + 1,
        name
    }
    items.push(newItem)
    res.status(201).json(items)
})

//PUT
app.put('/item', (req, res) => {
    const id = Number(req.params.id)
    const item = items.find(i => i.id === id)
    item.name = req.body.name
    res.json(item)
})

//DELETE
app.delete('/items', (req, res) => {
    const id = Number(req.params.id)
    const index = items.findIndex(i => i.id === id)
    items.splice(index - 1, 1)
    res.json(items)
})

app.listen(PORT, () => {
    console.log('works');
})