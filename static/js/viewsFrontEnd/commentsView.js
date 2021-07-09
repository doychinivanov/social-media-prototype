import { html } from 'https://unpkg.com/lit-html?module';

export const commentsSlide = (comments) =>{
    return comments.length > 0 ? html`
    <div>
        ${comments.map(commentsTemplate)}
    </div>` : html`<p class="pb-2 ps-2"><span class="font-italic">No comments yet.</span></p>`;
}

const commentsTemplate = (comment) => html`
<div class="comment p-3 border border-2 rounded">
    <div class="d-flex align-items-center border-bottom">
        <a href="/user/profile/${comment.author.authorId}">
            <img id="profile-picture" class="img-fluid img-thumbnail" src="/static/img/anonymous-user.png" alt="">
        </a>
        <a href="">
            <h6>${comment.author.username}</h6>
        </a> <span>${comment.createdAt}</span> <br>
    </div>

    <p>${comment.content}</p>
</div>
`;