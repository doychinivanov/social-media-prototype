const Post = require('../models/Post');

async function createPost(author, content){
    const post = new Post({
        author,
        createdAt: new Date(),
        content,
        likes: [],
        comments: []
    });

    await post.save();
    return post;
};

async function getPostsByAuthorId(id){
    const posts = await Post.find({'author': id});

    return posts;
};

module.exports = {createPost, getPostsByAuthorId}