document.getElementById('posts-holder').addEventListener('click', (ev)=>{
    if(ev.target.classList.contains('bi-chat-dots-fill')){
        let article = ev.target;

        while(article.tagName !== 'ARTICLE'){
            article = article.parentNode;
        }

        const commentsField = article.querySelector('.comment-field');
        const showInputFielsBtn = commentsField.querySelector('.add-comment');
    
        commentsField.style.display = commentsField.style.display == 'block' ? 'none' : 'block';
        
        showInputFielsBtn.addEventListener('click', (ev)=>{
            const commentForm = article.querySelector('.comment-input');

            ev.target.textContent = ev.target.textContent == 'Add Comment' ? 'Show Less' : 'Add Comment';
            commentForm.style.display = commentForm.style.display == 'block' ? 'none' : 'block';
        });
    }
})