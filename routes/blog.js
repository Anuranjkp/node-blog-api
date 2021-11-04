const express = require("express");

const router = express.Router();

const blogController = require("../controller/blogController")




router.get('/posts', blogController.showPosts);
router.post('/posts/create', blogController.createPosts);
router.put('/posts/:postId', blogController.editPost);
router.delete('/posts/:postId', blogController.deletePost);

module.exports = router