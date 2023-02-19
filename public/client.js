const socket = io()

let name;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
username = prompt("please add your name")
}while(!username)

textarea.addEventListener('keyup',(e)=>{

    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:username,
        message:message.trim()
    }

    appendMessage(msg, "outgoing_message")
    textarea.value = ''

    socket.emit("message", msg)
}

function appendMessage(msg, type){
    let mainDiv =  document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    <p>${msg.ddate}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message', (msg)=>{
    appendMessage(msg, "incoming_message")
    console.log(msg)
})