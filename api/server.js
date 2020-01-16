const express = require('express');

const dBase = require('../data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({
        Greeting: "Hello again from the dBase!!!"
    })
})


//GET

//Get Request for posts

// When the client makes a `GET` request to `/api/posts`:
server.get('/api/posts', (req, res) => {
// - `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
    dBase.find()
    .then(posts => {
        res.status(200).json(posts)
    })
// - If there's an error in retrieving the _posts_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.
    .catch(err =>{
        res.status(500).json({
            errorMessage: "The posts information could not be retrieved."
        })
    })
})

//Get requests for posts with ID

// | GET    | /api/posts/:id          | Returns the post object with the specified id.      
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    // - `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
    // - If the _post_ with the specified `id` is not found:
    //   - return HTTP status code `404` (Not Found).
    //   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
    dBase.findById(id)
    .then(postId => {
        if(!postId) {
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            })
        }else {
            res.status(200).json(postId)
        }
    })
    // - If there's an error in retrieving the _post_ from the database:
    //   - cancel the request.
    //   - respond with HTTP status code `500`.
    //   - return the following JSON object: `{ error: "The post information could not be retrieved." }`.
    .catch(err => {
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})


// When the client makes a `GET` request to `/api/posts/:id/comments`:
server.get('/api/posts/:id/comments', (req, res) => {
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
// | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.    

// - `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id.

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in retrieving the _comments_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.

//Create a Post

// | POST | /api/posts | Creates a post using the information sent inside the `request body`.

server.post('/api/posts', (req, res) => {
    const postData = req.body;
    // - If the request body is missing the `title` or `contents` property:
    //   - cancel the request.
    //   - respond with HTTP status code `400` (Bad Request).
    //   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.
    if(!postData.title || !postData.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
        // - If the information about the _post_ is valid:
        //   - save the new _post_ the the database.
        //   - return HTTP status code `201` (Created).
        //   - return the newly created _post_.
    }else {
        // - `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
        dBase.insert(postData)
        .then(validPost => {
            dBase.findById(validPost.id)
            .then(validPostId => {
                res.status(201).json(validPostId)
            })
        })
    }
})

// When the client makes a `POST` request to `/api/posts`:


// - If there's an error while saving the _post_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

//Create A Comment

//| POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.  

// - `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
// When the client makes a `POST` request to `/api/posts/:id/comments`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If the request body is missing the `text` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

// - If the information about the _comment_ is valid:

//   - save the new _comment_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _comment_.

// - If there's an error while saving the _comment_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.





//DELETE

// | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |

// - `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
// When the client makes a `DELETE` request to `/api/posts/:id`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in removing the _post_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The post could not be removed" }`.



//PUT

// | PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.                 

// When the client makes a `PUT` request to `/api/posts/:id`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If the request body is missing the `title` or `contents` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

// - If there's an error when updating the _post_:

//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The post information could not be modified." }`.

// - If the post is found and the new information is valid:

//   - update the post document in the database using the new information sent in the `request body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _post_.



module.exports = server;