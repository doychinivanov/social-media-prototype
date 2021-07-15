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

export async function getFollowers(userId){
    const response = await fetch('http://localhost:3000/user/followers/' + userId);
    const followers = await response.json();

    return followers;
}

export async function getFollowing(userId){
    const response = await fetch('http://localhost:3000/user/following/' + userId);
    const following = await response.json();

    return following;
}