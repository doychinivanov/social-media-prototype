export async function getCommentsByPostId(postId){
    const data = await fetch('https://toggle-social-media.herokuapp.com/comments/' + postId);
    const comments = await data.json();

    return comments;
}

export async function createComment(postId, body){
    return await fetch('https://toggle-social-media.herokuapp.com/comments/create/' + postId, {
     method: 'post',
     headers: {'Content-Type' : 'application/json'},
     body: JSON.stringify(body)
    });
};

export async function delComment(commentId){
    return await fetch('https://toggle-social-media.herokuapp.com/comments/delete/' + commentId, {method: 'delete'});
}

export async function getFollowers(userId){
    const response = await fetch('https://toggle-social-media.herokuapp.com/user/followers/' + userId);
    const followers = await response.json();

    return followers;
}

export async function getFollowing(userId){
    const response = await fetch('https://toggle-social-media.herokuapp.com/user/following/' + userId);
    const following = await response.json();

    return following;
}