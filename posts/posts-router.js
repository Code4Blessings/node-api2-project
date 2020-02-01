const express = require('express');

const dBase = require('../data/db');

const router = require('express').Router();

// a Router can have middleware
//a Router can have endpoints
//this router only cares about whatever comes after /api/hubs

//GET

//Get Request for posts

router.get('/', (req, res) => {
    dBase.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The posts information could not be retrieved."
            })
        })
})

//Get requests for posts with ID

router.get('/:id', (req, res) => {
    const id = req.params.id;
    dBase.findById(id)
        .then(postId => {
            if (!postId) {
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                })
            } else {
                res.status(200).json(postId)
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

// When the client makes a `GET` request to `/api/posts/:id/comments`:
router.get('/:id/comments', (req, res) => {
    dBase.findCommentById(req.params.id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

//Create a Post

// | POST | /api/posts | Creates a post using the information sent inside the `request body`.

router.post('/', (req, res) => {
    const postData = req.body;
    
    if (!postData.title || !postData.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
        
    } else { 
        dBase.insert(postData)
            .then(validPost => {
                dBase.findById(validPost.id)
                    .then(validPostId => {
                        res.status(201).json(validPostId)
                    })
            })
    }
})

//| POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`. 

router.post('/:id/comments', (req, res) => {
    const text = req.body;
    const id = req.params.id;
    if(!text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }
    dBase.findById(id)
    .then(postIsValid => {
        if(postIsValid) {
            dBase.insertComment({
                ...text,
                post_id: id
            })
                .then(comment => {
                    res.status(201).json(comment);
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "There was an error while saving the comment to the database"
                })
            })
        }else {
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            })
        }
    })
})

module.exports = router