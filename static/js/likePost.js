colorizeHeart();

function colorizeHeart(){
    [...document.getElementsByClassName('post-actions')].forEach(x => x.addEventListener('click', (ev)=>{
        if(ev.target.classList.contains('bi-heart-fill')){
            ev.target.style.color = ev.target.style.color == 'red' ? 'black' : 'red';
        }
    }))
}