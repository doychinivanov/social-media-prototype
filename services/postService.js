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

async function getPostById(id){
    const post = await Post.findById(id);

    return post;
}

// User for profile page
async function getPostsByAuthorId(id){
    const posts = await Post.find({'author': id}).sort({'createdAt': 'desc'}).populate('author');

    return posts;
};

async function getPostsByFollowingId(ids){
    const posts = await Post.find().where('author').in(ids).sort({'createdAt': 'desc'}).populate('author');

    return posts;
}

async function likePost(postId, userId){
    const post = await getPostById(postId);
    
    if(post.likes.includes(userId)){
        throw new Error('You have alredy liked this post.')
    }
    post.likes.push(userId);

    await post.save();

    return post;
}

async function unlikePost(postId, userId){
    const post = await getPostById(postId);
    
    if(!post.likes.includes(userId)){
        throw new Error('You can\'t unlike post you have not liked.')
    }

    post.likes.splice(post.likes.indexOf(userId), 1);

    await post.save();

    return post;
};

async function deletePost(postId){
    return Post.findByIdAndDelete(postId);
}

module.exports = {
    createPost,
    getPostsByAuthorId,
    getPostsByFollowingId,
    likePost,
    unlikePost,
    deletePost
}