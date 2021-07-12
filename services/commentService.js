const Comment = require('../models/Comment');

async function getCommentsByPostId(postId){
    const comments = await Comment.find({'postId': postId}).populate('author');
    
    return comments.map(x=>({
        author: {username: x.author.username, authorId: x.author._id},
        content: x.content,
        createdAt: x.createdAt.toLocaleString()
    }))
}

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

// async function createComment(postId, author, content){
//     const comment = new Comment({
//         author,
//         createdAt: new Date(),
//         content,
//         postId
//     });

//     await comment.save();

//     return comment;
// }

module.exports = {
    getCommentsByPostId,
    createComment
}