const Comment = require('../models/Comment');

async function getCommentsByPostId(postId){
    const comments = await Comment.find({'postId': postId}).populate('author');
    
    return comments.map(x=>({
        author: {username: x.author.username, authorId: x.author._id},
        content: x.content,
        createdAt: x.createdAt.toLocaleString(),
        _id: x._id
    }))
}

async function getCommentsByAuthorId(id){
    const comments = await Comment.find({'author': id}).populate('author');

    return comments;
};

async function createComment(postId, body){
    const comment = new Comment({
        author: body.author,
        createdAt: new Date(),
        content: body.content,
        postId
    });

    await comment.save();

    return comment;
}

async function deleteComment(commentId){
    return Comment.findByIdAndDelete(commentId);
}

module.exports = {
    getCommentsByPostId,
    createComment,
    deleteComment,
    getCommentsByAuthorId
}