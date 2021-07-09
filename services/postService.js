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

// User for profile page
async function getPostsByAuthorId(id){
    const posts = await Post.find({'author': id}).sort({'createdAt': 'desc'}).populate('author');

    return posts;
};

async function getPostsByFollowingId(ids){
    const posts = await Post.find().where('author').in(ids).sort({'createdAt': 'desc'}).populate('author');

    return posts;
}

module.exports = {
    createPost,
    getPostsByAuthorId,
    getPostsByFollowingId
}