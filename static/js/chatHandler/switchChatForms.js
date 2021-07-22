document.querySelector('.card').addEventListener('click', (ev)=>{
    if(ev.target.id == 'create'){
        removeActiveClass();
        ev.target.classList.add('active');
        document.getElementById('create-room').style.display = 'block';
        document.getElementById('join-room').style.display = 'none';
    } else if(ev.target.id == 'join'){
        removeActiveClass();
        ev.target.classList.add('active');
        document.getElementById('create-room').style.display = 'none';
        document.getElementById('join-room').style.display = 'block';
    }
});

function removeActiveClass(){
    const anchors = [...document.querySelectorAll('.card-header-tabs a')];
    anchors.forEach(a => a.classList.remove('active'));
}

const socket = io();

socket.on('message', message => console.log(message));