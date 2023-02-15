const socket = io('http://localhost:8000'
, { transports : ['websocket'] }
);

const form = document.getElementById('send-container');
const msginp = document.getElementById('msginp');
const msgcontainer= document.querySelector('.container')
var audio = new Audio('beep.mp3');
let time = new Date();
const append = (name,msg,position)=>{
        const msgElement = document.createElement('div');
        const p = document.createElement('p');
        const t = document.createElement('p');
        msgElement.classList.add('msg')
        msgElement.classList.add(position)
        msgElement.append(p,t);
        t.classList.add('time');
        p.classList.add('my');
        p.innerText = msg;
        t.innerText =time.getHours()+':'+time.getMinutes();
        console.log(name)
        msgcontainer.append(msgElement)
        if(position=='left'){ audio.play();}
}
const side_msg = (msg,no)=>{
        const d = document.createElement('div');
        const h = document.createElement('h2');
        d.append(h);
        h.innerText = msg;
        h.classList.add('side');
        const s = (no==1)?'green':'red';
        h.classList.add(s);
        msgcontainer.append(d)
}

console.log('aaaaaaaaaaaa');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msginp.value;
    if(message.length!=0 && name.length!=0) 
    {append("You",`You: ${message}`,'right')
    socket.emit('send',message)}
    msginp.value = ''

})
let name = prompt("Enter your name to join");
console.log(name)
while(name.length===0){
    name = prompt("Re-Enter a valid name to join")
}
socket.emit('new-user-joined',name);

socket.on('user-joined',name =>{
    console.log(name)
    side_msg(`${name} joined the chat`,1);
})

socket.on('receive',data =>{
    if(data.name.length!=0){
        append(data.name,`${data.name}: ${data.message}`, 'left')
        
    }
})

socket.on('left',name =>{
     side_msg(`${name} left the chat`,0);
})