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
