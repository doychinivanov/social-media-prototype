import {getFollowers, getFollowing} from './api/api.js';
import {connectionsHolder} from './viewsFrontEnd/connections.js';
import {render} from 'https://unpkg.com/lit-html?module';

document.querySelector('.user-details').addEventListener('click', async (ev)=>{
    if(ev.target.tagName != 'A'){
        return;
    }

    const holder = document.querySelector('.user-data');
    const userId = ev.target.getAttribute('data-id');

    if(ev.target.id == 'followers'){
        const followers = await getFollowers(userId);
        const ctx = {title: 'Followers', followers};

        render(connectionsHolder(ctx), holder);
    } else if (ev.target.id == 'following'){
        const following = await getFollowing(userId);
        const ctx = {title: 'Following', following};

        render(connectionsHolder(ctx), holder);
    }
});