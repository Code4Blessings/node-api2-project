const express = require('express');

const dBase = require('../data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({
        Greeting: "Hello again from the dBase!!!"
    })
})

//Create a Post

// | POST | /api/posts | Creates a post using the information sent inside the `request body`.

// When the client makes a `POST` request to `/api/posts`:

// - If the request body is missing the `title` or `contents` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

// - If the information about the _post_ is valid:

//   - save the new _post_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _post_.

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


//Get Request for posts

// When the client makes a `GET` request to `/api/posts`:

// - `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.

// - If there's an error in retrieving the _posts_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.


//Get requests for posts with ID

// When the client makes a `GET` request to `/api/posts/:id`:

// - `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in retrieving the _post_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The post information could not be retrieved." }`.

// When the client makes a `GET` request to `/api/posts/:id/comments`:

// - `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id.

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in retrieving the _comments_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.

//DELETE



module.exports = server;