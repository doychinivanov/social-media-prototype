export async function getCommentsByPostId(postId){
    const data = await fetch('http://localhost:3000/comments/' + postId);
    const comments = await data.json();

    return comments;
}

export async function createComment(postId, body){
    return await fetch('http://localhost:3000/comments/create/' + postId, {
     method: 'post',
     headers: {'Content-Type' : 'application/json'},
     body: JSON.stringify(body)
    });
};

export async function delComment(commentId){
    return await fetch('http://localhost:3000/comments/delete/' + commentId, {method: 'delete'});
}