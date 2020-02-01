const express = require('express');

const postsRouter = require('../posts/posts-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({
        Greeting: "Hello again from the dBase!!!"
    })
})

server.use('/api/posts', postsRouter);

module.exports = server;