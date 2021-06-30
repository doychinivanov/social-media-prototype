const modalError = document.getElementById('modal-error');

if(modalError){
    modalError.addEventListener('click', (ev)=>{
        if(ev.target.classList.contains('close')){
            modalError.style.display = 'none';
        }
    });
};