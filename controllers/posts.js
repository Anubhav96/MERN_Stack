const { validationResult } = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

exports.createPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        return res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.getPostByPostId = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        return res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send('Internal Server Error');
    }
};

exports.deletePostByPostId = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized!' });
        }
        await post.remove();

        return res.json({ msg: 'Post deleted!' });
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send('Internal Server Error');
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        let likedPost = post.likes.filter(
            like => like.user.toString() === req.user.id
        );
        if (likedPost.length > 0) {
            return res.status(400).json({ msg: 'Post already liked!' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        return res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send('Internal Server Error');
    }
};

exports.unlikePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        let likedPost = post.likes.filter(
            like => like.user.toString() === req.user.id
        );
        if (likedPost.length === 0) {
            return res
                .status(400)
                .json({ msg: 'Post has not yet been liked!' });
        }

        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();
        return res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send('Internal Server Error');
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.postId);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }

        const comment = post.comments.find(
            comment => comment.id === req.params.commentId
        );

        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist!' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized!' });
        }

        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);
        await post.save();
        return res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send('Internal Server Error');
    }
};
