const express = require('express');

const dBase = require('./data/db');

const server = express();

server.use(express.json());

server.use('/', (req, res) => {
    res.send({
        Greeting: "Hello again from the dBase!!!"
    })
})

server.listen(4000, () => console.log('API is running on Port 4000'));