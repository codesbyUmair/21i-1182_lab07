const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3003;

app.use(bodyParser.json());

let todos = [
    {
        id: 1,
        task: "Complete homework",
        completed: false
    },
    {
        id: 2,
        task: "Go to the gym",
        completed: true
    },
    {
        id: 3,
        task: "Read a book",
        completed: false
    }
];

// Get all Todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a Todo by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Create a Todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a Todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].task = req.body.task || todos[todoIndex].task;
        todos[todoIndex].completed = req.body.completed || todos[todoIndex].completed;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete a Todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
