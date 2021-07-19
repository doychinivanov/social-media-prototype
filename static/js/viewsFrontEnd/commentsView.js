import { html } from 'https://unpkg.com/lit-html?module';

export const commentsSlide = (currentUserId, comments) =>{
    return comments.length > 0 ? html`
    <div>
        ${comments.map((comment) => commentsTemplate(comment, currentUserId))}
    </div>` : html`<p class="pb-2 ps-2"><span class="font-italic">No comments yet.</span></p>`;
}

const commentsTemplate = (comment, currentUserId) => html`
<div class="comment p-3 border border-2 rounded">
    <div class="d-flex align-items-center border-bottom">
        <a href="/user/profile/${comment.author.authorId}">
            <img id="profile-picture" class="img-fluid img-thumbnail" src="/user/images/${comment.author.authorId}" alt="">
        </a>
        <a href="/user/profile/${comment.author.authorId}">
            <h6>${comment.author.username}</h6>
        </a> <span>${comment.createdAt}</span> <br>

        ${comment.author.authorId == currentUserId ? html`<a id="${comment._id}" class="del-comment" href="javascript:void(0)">Delete</a>` : ''}
    </div>

    <p>${comment.content}</p>
</div>
`;