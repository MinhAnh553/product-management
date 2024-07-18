// CLIENT_SEND_MESSAGE
const formMessage = document.querySelector('.chat .inner-form');
if (formMessage) {
    formMessage.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = e.target.elements.content.value;
        socket.emit('CLIENT_SEND_MESSAGE', message);
        e.target.elements.content.value = '';
    });
}

// SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MESSAGE', (data) => {
    const body = document.querySelector('.inner-body');
    const myId = body.getAttribute('my-id');
    const div = document.createElement('div');

    let divFullName = '';
    if (myId == data.userId) {
        div.classList.add('inner-outgoing');
    } else {
        divFullName = `<div class="inner-name">${data.fullName}</div>`;
        div.classList.add('inner-incoming');
    }

    const html = `
        ${divFullName}
        <div class="inner-content">${data.content}</div>
    `;

    div.innerHTML = html;
    body.appendChild(div);

    div.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
