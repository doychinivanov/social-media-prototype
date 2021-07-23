const socket = io();

const data = getNeededData();

socket.emit('joinRoom', (data))

socket.on('message', (message) => {
    createChatMessage(message);
  
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;
  });


document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;
  
    msg = msg.trim();
  
    if (!msg) {
      return;
    }
    socket.emit('chatMessage', msg);
  
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });


function getNeededData(){
    const currentUser = document.cookie.split('CURRENT_USER_NAME=')[1];
    const roomName = document.getElementById('room-name').textContent;

    return {currentUser, roomName};
}

function createChatMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }