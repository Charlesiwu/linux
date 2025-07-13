const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const users = [];

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({ username, password });
    res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
