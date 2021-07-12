import {getCommentsByPostId, createComment} from './api/api.js';
import {commentsSlide} from './viewsFrontEnd/commentsView.js';
import {render} from 'https://unpkg.com/lit-html?module';

const postHolder = document.getElementById('posts-holder');


postHolder.addEventListener('click', async (ev)=>{
    if(ev.target.classList.contains('bi-chat-dots-fill')){
        const article = getCurrentPost(ev);
        loadComments(ev);

        const commentsField = article.querySelector('.comment-field');
        const commentForm = article.querySelector('.comment-input');
        const showInputFielsBtn = commentsField.querySelector('.add-comment');
    
        commentsField.style.display = commentsField.style.display == 'block' ? 'none' : 'block';
        
        showInputFielsBtn.addEventListener('click', (ev)=>{
            ev.target.textContent = ev.target.textContent == 'Add Comment' ? 'Show Less' : 'Add Comment';
            commentForm.style.display = commentForm.style.display == 'block' ? 'none' : 'block';
        });
    }
});

[...postHolder.querySelectorAll('form')].forEach(form => form.addEventListener('submit',  async (ev)=>{
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const content = formData.get('commentContent').trim();
    const postId = ev.currentTarget.action.split('\/').pop();

    await createComment(postId, {content});

    loadComments(ev);
    ev.target.reset();
}));

async function loadComments(ev){
    const article = getCurrentPost(ev);

    const commentsHolder = article.querySelector('.comments-in-here');
    const comments = await getCommentsByPostId(article.id);
    render(commentsSlide(comments), commentsHolder);
};


function getCurrentPost(ev){
    let article = ev.target;

    while(article.tagName !== 'ARTICLE'){
        article = article.parentNode;
    };

    return article;
}