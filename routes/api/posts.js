const expres = require('express');
const router = expres.Router();
const auth = require('../../middleware/auth');
const postsController = require('../../controllers/posts');
const postsValidation = require('../../validation/posts');

/* 
@route      POST api/posts
@desc       Create a post
@access     private
*/
router.post(
    '/',
    auth,
    postsValidation.validate('createPost'),
    postsController.createPost
);

/* 
@route      GET api/posts
@desc       Get all post
@access     private
*/
router.get('/', auth, postsController.getAllPosts);

/* 
@route      GET api/posts/:postId
@desc       Get post by postId
@access     private
*/
router.get('/:postId', auth, postsController.getPostByPostId);

/* 
@route      DELETE api/posts/:postId
@desc       DELETE post by postId
@access     private
*/
router.delete('/:postId', auth, postsController.deletePostByPostId);

/* 
@route      PUT api/posts/like/:postId
@desc       Like a post
@access     private
*/
router.put('/like/:postId', auth, postsController.likePost);
module.exports = router;

/* 
@route      PUT api/posts/unlike/:postId
@desc       Unlike a post
@access     private
*/
router.put('/unlike/:postId', auth, postsController.unlikePost);

/* 
@route      POST api/posts/comment/:postId
@desc       Comment on a post
@access     private
*/
router.post(
    '/comment/:postId',
    auth,
    postsValidation.validate('createPost'),
    postsController.createComment
);

/* 
@route      DELETE api/posts/comment/:postId/:commentId
@desc       delete a comment on a post
@access     private
*/
router.delete(
    '/comment/:postId/:commentId',
    auth,
    postsController.deleteComment
);
module.exports = router;
