import {getCommentsByPostId} from './api/api.js';
import {commentsSlide} from './viewsFrontEnd/commentsView.js';
import {render} from 'https://unpkg.com/lit-html?module';


document.getElementById('posts-holder').addEventListener('click', async (ev)=>{
    if(ev.target.classList.contains('bi-chat-dots-fill')){
        let article = ev.target;

        while(article.tagName !== 'ARTICLE'){
            article = article.parentNode;
        }

        const commentsHolder = article.querySelector('.comments-in-here');
        const comments = await getCommentsByPostId(article.id);
        render(commentsSlide(comments), commentsHolder);

        const commentsField = article.querySelector('.comment-field');
        const commentForm = article.querySelector('.comment-input');
        const showInputFielsBtn = commentsField.querySelector('.add-comment');
    
        commentsField.style.display = commentsField.style.display == 'block' ? 'none' : 'block';
        
        showInputFielsBtn.addEventListener('click', (ev)=>{
            ev.target.textContent = ev.target.textContent == 'Add Comment' ? 'Show Less' : 'Add Comment';
            commentForm.style.display = commentForm.style.display == 'block' ? 'none' : 'block';
        });
    }
})