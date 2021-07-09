export async function getCommentsByPostId(postId){
    const data = await fetch('http://localhost:3000/comments/' + postId);
    const comments = await data.json();

    return comments;
}