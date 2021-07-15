import { html } from 'https://unpkg.com/lit-html?module';

export const connectionsHolder = (data) => {
    if(data.title == 'Followers'){
        return data.followers.length > 0 ? html`
        <h1 class="border-bottom my-1 pb-2">${data.title}</h1>
        <div>
            ${data.followers.map(followTemplate)}
        </div>` : html`<p class="pb-2 ps-2"><span class="font-italic">No followers yet.</span></p>`;
    } else {
        return data.following.length > 0 ? html`
        <h1 class="border-bottom my-1 pb-2">${data.title}</h1>
        <div>
            ${data.following.map(followTemplate)}
        </div>` : html`<p class="pb-2 ps-2"><span class="font-italic">User is not following anyone yet.</span></p>`;
    }
};

const followTemplate = (follower) => html`
<div class="mt-2 p-3 border border-2 rounded">
    <div class="d-flex align-items-center">
        <a href="/user/profile/${follower._id}">
            <img id="profile-picture" class="img-fluid img-thumbnail" src="/static/img/anonymous-user.png" alt="">
        </a>
        <a class="ms-1" href="/user/profile/${follower._id}">
            <h6>${follower.username}</h6>
        </a>
    </div>
</div>
`